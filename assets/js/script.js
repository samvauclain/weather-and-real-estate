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
        console.log(response);
        return response.json();
    })

    .then(function (data) {

        if(Object.keys(data).includes("error")){ //detect invalid city name or typo
            modal.setAttribute("style", "display: block;");
        }

        Add_Map(data.properties[0].location.address.coordinate.lat, data.properties[0].location.address.coordinate.lon);
            
        houseCardsEl.innerHTML = '';

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
        var address = data.properties[i].location.address.line + ", " + data.properties[i].location.address.city +  ", " + data.properties[i].location.address.state_code + " " + data.properties[i].location.address.postal_code;
        AddMarker(data.properties[i].location.address.coordinate.lat, data.properties[i].location.address.coordinate.lon, i, data.properties[i].primary_photo.href, address);
        }
    })
    .catch(err => {

    });
};


cityFormEl.addEventListener('submit', formSubmitHandler);
