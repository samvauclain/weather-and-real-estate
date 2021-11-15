// var houseImageEl = document.getElementById("houseImage");
// var houseContentEl = document.getElementById("houseContent");
// var housePriceEl = document.getElementById("housePrice");
// var houseImage = "";
var houseCardsEl = document.getElementById("houseCards")

city ="Sacramento";

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
for (let i = 0; i < 12; i++) {
houseCardsEl.innerHTML += 
	`<div id="column-${i}" class="column is-one-quarter">
    <div class="card">
      <div class="card-image">
        <figure id="houseImage" class="image is-4by3">
          <img src= "${data.properties[i].primary_photo.href}" alt="House image ${i}">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">$${data.properties[i].list_price}</p>
          </div>
          </div>
          <div class="content">
		  <p>
			${data.properties[i].location.address.line},
			${data.properties[i].location.address.postal_code},
			${data.properties[i].location.address.state_code},
			${data.properties[i].location.address.city}
		</p>
		<p>
			<b>${data.properties[i].description.beds}</b> Beds
	    	<b>${data.properties[i].description.baths}</b> Baths
			<b>${data.properties[i].description.sqft} </b> sqft
		</p>

          </div>
      </div>
    </div>
  </div>`


	
}

	Add_Map(data.properties[0].location.address.coordinate.lat, data.properties[0].location.address.coordinate.lon);

	for (let i = 0; i < 12; i++) {
		houseCardsEl.innerHTML += 
			`<div id="column-${i}" class="column is-one-quarter">
			<div class="card">
			<div class="card-image">
				<figure id="houseImage" class="image is-4by3">
				<img src= "${data.properties[i].primary_photo.href}" alt="House image ${i}">
				</figure>
			</div>
			<div class="card-content">
				<div class="media">
				<div class="media-content">
					<p class="title is-4">$${data.properties[i].list_price}</p>
				</div>
				</div>
				<div class="content">
				<p>
					${data.properties[i].location.address.line},
					${data.properties[i].location.address.postal_code},
					${data.properties[i].location.address.state_code},
					${data.properties[i].location.address.city}
				</p>
				<p>
					<b>${data.properties[i].description.beds}</b> Beds
					<b>${data.properties[i].description.baths}</b> Baths
					<b>${data.properties[i].description.sqft} </b> sqft
				</p>

				</div>
			</div>
			</div>
		</div>`


	AddMarker(data.properties[i].location.address.coordinate.lat, data.properties[i].location.address.coordinate.lon, i, data.properties[i].primary_photo.href);
	}
})

.catch(err => {
	console.error(err);
});





*/




// console.log (data.properties[0].location.address.line);
	// console.log(data.properties[0].primary_photo.href);
    // console.log(data.properties);