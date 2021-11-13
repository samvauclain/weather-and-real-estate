// alert("map js connected");

var map = document.getElementById("map");

//pretend these are houses' locations
var lat = [51.5, 51.5, 51.5, 51.5, 51.49, 51.49];
var lon = [-0.09, -0.08, -0.10, -0.11, -0.11, -0.10];

//counter for houses found
var n = 6; 

//empty array to keep markers on map
var marker = [];

//Keep this global, Add-Map() and AddMarker() need access to it
var mymap;

var Add_Map = function (lat, lon) {
    map.setAttribute("style", "margin-top: 20px; height: 350px;");
    mymap = L.map('map').setView([lat, lon], 13); 
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFnZ2llOTY4NSIsImEiOiJja3Z0NmRsajk3c3pqMzBxcDg4bTU5amc0In0.eZRtZIrAHKxxLrTXZ3jAUg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFnZ2llOTY4NSIsImEiOiJja3Z0NmRsajk3c3pqMzBxcDg4bTU5amc0In0.eZRtZIrAHKxxLrTXZ3jAUg'
    }).addTo(mymap);
}

var AddMarker = function (lat, lon, n) {
        marker[n] = L.marker([lat, lon]).addTo(mymap);
        marker[n].bindPopup("<b>Hello world!</b><br>I am popup"+ n + ".").openPopup();
}

var Map_reset = function () {
    var i = 0;
    while(i < marker.length) {
        marker[i].remove();
        i++;
    }
    mymap.remove();
    map.removeAttribute("style");
}



//center of map adjust based on user input
Add_Map(51.505, -0.09);

//In final code, call AddMarker everytime you find a new house
for(var i = 0; i < n; i++) {
    AddMarker(lat[i], lon[i], i);
}


