var weatherCardsEl = document.getElementById('weatherCards');

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
    fetch(`${api.base}forecast?q=${query}&units=imperial&APPID=${api.key}`)
    .then(response => {
        return response.json();
    }).then(function(data) {
        console.log(data);
        // displayResults(data);
        // let temp = document.querySelector('.current .title is-1');
        // temp.innerHTML = `${data.main.temp}<span>°c</span>`;
        // console.log(temp);

        // var date = data.dt; 
        var date = (moment(moment()).format("ddd, MM/DD/YYYY"));
        
    for (var i = 0; i < 5; i++) {
        weatherCardsEl.innerHTML += 
        `<div id="column-weather-${i}" class="column">
            <div class="card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">Date: ${date}</p>
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