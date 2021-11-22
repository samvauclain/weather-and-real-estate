//Input
var cityInputEl = document.querySelector('#cityname');
var cityFormEl = document.querySelector('#city-form');
//Real Estate
var houseCardsEl = document.getElementById("houseCards");
//Map
var map = document.getElementById("map");
var marker = [];
var mymap;
var first = 1;
//modalbox for error message
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
//cities array for local storage
var savedCitiesArray = [];
//element used to populate saved city searches
var savedCityDropdown = document.getElementById('savedCityDropdown');


var Add_Map = function (lat, lon) {
    if(first){
        mymap = L.map('map').setView([lat, lon], 13); 
        first = 0;
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFnZ2llOTY4NSIsImEiOiJja3Z0NmRsajk3c3pqMzBxcDg4bTU5amc0In0.eZRtZIrAHKxxLrTXZ3jAUg', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoibWFnZ2llOTY4NSIsImEiOiJja3Z0NmRsajk3c3pqMzBxcDg4bTU5amc0In0.eZRtZIrAHKxxLrTXZ3jAUg'
        }).addTo(mymap);
    } else {
        mymap.flyTo([lat, lon], 13); 
    }
};

var AddMarker = function (lat, lon, n, img_url, address) {
        if(lat&&lon){
        marker[n] = L.marker([lat, lon]).addTo(mymap);
        marker[n].bindPopup('<img src=' + img_url + '>' + address).openPopup();
        }
};

var Map_reset = function () { 
    if(mymap){
        var i = 0;
        while(i < marker.length) {
            marker[i].remove();
            i++;
        }
    }
};

var formSubmitHandler = function (event) { //Get Input
    event.preventDefault();

    Map_reset(); //clear old map & markers

    city = cityInputEl.value.trim();

    fetch(`https://real-estate12.p.rapidapi.com/listings/sale?state=CA&city=${city}&page=1&sort=relevant&type=single-family%2Cmulti-family`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "real-estate12.p.rapidapi.com",
            "x-rapidapi-key": "0fbbdd1a95msh72cdeb0d1f9e3cbp181050jsn72302190d720"
        }
    })
    .then(function (response) {
        // console.log(response);
        return response.json();
    })

    .then(function (data) {
        console.log(data);
        if(Object.keys(data).includes("error")){ //detect invalid city name or typo
            modal.setAttribute("style", "display: block;");
        }

        Add_Map(data.properties[0].location.address.coordinate.lat, data.properties[0].location.address.coordinate.lon);
            
        houseCardsEl.innerHTML = '';

        for (let i = 0; i < 12; i++) {

            var houseImg, housePrice, houseAddress, housePostal, houseState, houseCity, houseBeds, houseBaths, houseSqft;
      
            if (data.properties[i].primary_photo != null) {
                houseImg = data.properties[i].primary_photo.href;
            } else {houseImg = "./assets/img/imageNa.jpg"}

            if (data.properties[i].list_price) {
                housePrice = data.properties[i].list_price;
            } else {housePrice = "N/A"}

            if (data.properties[i].location.address.line) {
                houseAddress = data.properties[i].location.address.line;
            } else {houseAddress = "N/A"}

            if (data.properties[i].location.address.postal_code) {
                housePostal = data.properties[i].location.address.postal_code;
            } else {housePostal = "N/A"}

            if (data.properties[i].location.address.state_code) {
                houseState = data.properties[i].location.address.state_code;
            } else {houseState = "N/A"}

            if (data.properties[i].location.address.city) {
                houseCity = data.properties[i].location.address.city;
            } else {houseCity = "N/A"}

            if (data.properties[i].description.beds) {
                houseBeds = data.properties[i].description.beds;
            } else {houseBeds = "N/A"}

            if (data.properties[i].description.baths) {
                houseBaths = data.properties[i].description.baths;
            } else {houseBaths = "N/A"}

            if (data.properties[i].description.sqft) {
                houseSqft = data.properties[i].description.sqft;
            } else {houseSqft = "N/A"}

               houseCardsEl.innerHTML += 
                `<div id="column-${i}" class="column is-one-quarter">
                <div class="card">
                <div class="card-image">
                    <figure id="houseImage" class="image is-4by3">
                    <img src="${houseImg}" alt="House image ${i}">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                    <div class="media-content">
                        <p class="title is-4">$${housePrice}</p>
                    </div>
                    </div>
                    <div class="content">
                    <p>
                        ${houseAddress},
                        ${housePostal},
                        ${houseState},
                        ${houseCity}
                    </p>
                    <p>
                        <b>${houseBeds}</b> Beds
                        <b>${houseBaths}</b> Baths
                        <b>${houseSqft} </b> sqft
                    </p>
                    </div>
                </div>
                </div>
            </div>`;

        localStorage.setItem(cityInputEl.value, cityInputEl.value);

        var address = data.properties[i].location.address.line + ", " + data.properties[i].location.address.city +  ", " +data.properties[i].location.address.state_code + " " + data.properties[i].location.address.postal_code;

        AddMarker(data.properties[i].location.address.coordinate.lat, data.properties[i].location.address.coordinate.lon, i, houseImg, address);
        }
    })
    .catch(err => {
        console.error(err);
    });
};

span.onclick = function() {
    modal.setAttribute("style", "display: none;");
}
  
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.setAttribute("style", "display: none;");
    }
}

cityFormEl.addEventListener('submit', formSubmitHandler);

function allStorage() {
  
    var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
    console.log(keys);

  while (i--) {
      console.log(values);
      values.push(localStorage.getItem(keys[i]));
  }

  return values;
}

clearEl.addEventListener("click", () => {
    localStorage.clear();
    savedCityDropdown.innerHTML = ``;
  });

function refresh() {
  cityInputEl.value = '';

  for (var i = 0; i < allStorage().length; i++) {
    savedCityDropdown +=
      `<a class="navbar-item">${allStorage()[i]}</a>`;
  }
}

refresh();

//   savedCityDropdown +=
    //   `<a class="navbar-item">${currentCity}</a>`;
    // Reference weather dashboard again, convert if needed