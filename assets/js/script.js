//Input
var cityInputEl = document.querySelector('#cityname');
var cityFormEl = document.querySelector('#city-form');
var state_opt = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
var stateOptEl= document.querySelector('#state-option');
//Real Estate
var houseCardsEl = document.getElementById("houseCards");
//Map
var map = document.getElementById("map");
var marker = [];
var mymap;
var first = 1;
//Weather
var weatherCardsEl = document.getElementById('weatherCards');
const api = {
    key: "60942443d3e34eb3a1a12037eb43bc84",
    base: "https://api.openweathermap.org/data/2.5/"
}
//modalbox for error message
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
//cities array for local storage
var savedCitiesArray = [];
//element used to populate saved city searches
var savedCityDropdown = document.getElementById('savedCityDropdown');


for(var n = 0; n < state_opt.length; n++){ //dropdown menu for State
    stateOptEl.innerHTML += '<option value="' + state_opt[n] + '">' + state_opt[n] + '</option>';
}

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
<<<<<<< HEAD
        marker[n] = L.marker([lat, lon]).addTo(mymap);
        marker[n].bindPopup('<img src=' + img_url + '>' + address).openPopup();
=======
        if(lat&&lon){
        marker[n] = L.marker([lat, lon]).addTo(mymap);
        marker[n].bindPopup('<img src=' + img_url + '>' + address).openPopup();
        }
>>>>>>> add_state_to_search
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

function getResults (query) { //Get Weather
    fetch(`${api.base}forecast?q=${query}&units=imperial&APPID=${api.key}`)
    .then(response => {
        return response.json();
    }).then(function(data) {

  

        weatherCardsEl.innerHTML = "";

    for (var i = 0; i < 5; i++) {
        weatherCardsEl.innerHTML += 
        `<div id="column-weather-${i}" class="column">
            <div class="card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">Date: ${moment(moment()).add(i+1,'days').format("ddd, MM/DD/YYYY")}</p>
                        </div>
                    </div>
                    <div class="content">
                        <img class="weatherIcon" src='http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png'>
                        <p>${data.list[i].weather[0].description}</p>
                        <p>Temperature: ${Math.round(data.list[i].main.temp)}<span>°c</span></p>
                        <p>Humidity: ${data.list[i].main.humidity}</p>
                    </div>
                </div>
            </div>
        </div>`;
    }

    });
}

var AddHouse = function (city, state) {
    fetch(`https://real-estate12.p.rapidapi.com/listings/sale?state=${state}&city=${city}&page=1&sort=relevant&type=single-family%2Cmulti-family`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "real-estate12.p.rapidapi.com",
            "x-rapidapi-key": "0fbbdd1a95msh72cdeb0d1f9e3cbp181050jsn72302190d720"
        }
    })
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {

<<<<<<< HEAD
        Add_Map(data.properties[0].location.address.coordinate.lat, data.properties[0].location.address.coordinate.lon);
=======
        if(Object.keys(data).includes("error")){ //detect invalid city name or typo
            modal.setAttribute("style", "display: block;");
        }

        Add_Map(data.properties[0].location.address.coordinate.lat, data.properties[0].location.address.coordinate.lon);

        getResults(city);
>>>>>>> add_state_to_search

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
<<<<<<< HEAD
                    <img src="${data.properties[i].primary_photo.href}" alt="House image ${i}">
=======
                    <img src="${houseImg}" alt="House image ${i}">
>>>>>>> add_state_to_search
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
                        ${houseCity},
                        ${houseState},
                        ${housePostal}
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

           localStorage.setItem(city.toUpperCase() + ", " + state, city.toUpperCase() + ", " + state);
            refresh();

            var address = data.properties[i].location.address.line + ", " + data.properties[i].location.address.city +  ", " +data.properties[i].location.address.state_code + " " + data.properties[i].location.address.postal_code;

            AddMarker(data.properties[i].location.address.coordinate.lat, data.properties[i].location.address.coordinate.lon, i, houseImg, address);
        }

    })
    .catch(err => {
        console.error(err);
    });
};

var formSubmitHandler = function (event) { //Get Input
    event.preventDefault();

    Map_reset(); //clear old map & markers

    city = cityInputEl.value.trim();
    state = document.querySelector("select[name='state-option']").value;

    AddHouse(city, state);
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

function allStorage() {
  
    var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
      values.push(localStorage.getItem(keys[i]));   
  }

  return values;
}

function refresh() {
  cityInputEl.value = '';
  savedCityDropdown.innerHTML = "";

  for (var i = 0; i < allStorage().length; i++) {
    savedCityDropdown.innerHTML += 
      `<a class="navbar-item">${allStorage()[i]}</a>`;
  }
}

var buttonClickHandler = function (event) { //If user click search histories

    Map_reset(); //clear old map & markers
    
    var searchHistory = event.target.textContent;
    var history = searchHistory.split(", ");
    AddHouse(history[0], history[1]);
};


refresh();

cityFormEl.addEventListener('submit', formSubmitHandler);
savedCityDropdown.addEventListener('click', buttonClickHandler);

