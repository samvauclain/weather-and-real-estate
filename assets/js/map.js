// alert("map js connected");
/*
var map = document.getElementById("map");

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

var AddMarker = function (lat, lon, n, img_url) {
        marker[n] = L.marker([lat, lon]).addTo(mymap);
        console.log(img_url);
        marker[n].bindPopup('<img src=' + img_url + '><b>Hello world!</b><br>I am popup'+ n + '. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ut veritatis suscipit, eaque architecto illo quibusdam rerum itaque! Quaerat maxime amet eaque totam ea sed doloribus unde provident iste atque!').openPopup();
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
*/