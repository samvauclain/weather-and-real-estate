const api = {
    key: "60942443d3e34eb3a1a12037eb43bc84",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.input');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    let temp = document.querySelector('.current .title is-1');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
}