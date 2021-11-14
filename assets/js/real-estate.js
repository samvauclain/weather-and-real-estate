var houseImageEl = document.getElementById("houseImage");
var houseContentEl = document.getElementById("houseContent");
var housePriceEl = document.getElementById("housePrice");
var houseImage = "";

city ="Los%20Angeles";

//original fetch URL https://real-estate12.p.rapidapi.com/listings/sale?state=CA&city=Los%20Angeles&page=1&sort=relevant&type=single-family%2Cmulti-family

// alert("real estate js connected");
fetch(`https://real-estate12.p.rapidapi.com/listings/sale?state=CA&city=${city}&page=1&sort=relevant&type=single-family%2Cmulti-family`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "real-estate12.p.rapidapi.com",
		"x-rapidapi-key": "47098b9725msh4a6c2ffb6424c90p193301jsnd9a8382167e8"
	}
})
.then(function (response) {
    return response.json();
})
.then(function (data) {
	houseImage = data.properties[0].primary_photo.href;
    console.log(data);
	console.log(data.properties[0].list_price);
	console.log(data.properties[0].description.baths,
	data.properties[0].description.beds,
	data.properties[0].description.sqft);

	
    houseImageEl.innerHTML = `<img src="${houseImage}" alt="Placeholder image">`
	houseContentEl.innerHTML = 
	`<p>
	${data.properties[0].location.address.line},
	${data.properties[0].location.address.postal_code},
	${data.properties[0].location.address.state_code},
	${data.properties[0].location.address.city}
	</p>
	<p>
		<b>${data.properties[0].description.beds}</b> Beds
	    <b>${data.properties[0].description.baths}</b> Baths
		<b>${data.properties[0].description.sqft} </b> sqft
	</p>`;
	housePriceEl.innerHTML = `$ ${data.properties[0].list_price}`;

})
.catch(err => {
	console.error(err);
});










// console.log (data.properties[0].location.address.line);
	// console.log(data.properties[0].primary_photo.href);
    // console.log(data.properties);