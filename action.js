let weather = {
    apikey: "",
    fetchWeather: function(city) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apikey}`)
            .then(function(response) {
                return response.json()
            }).then((data) => this.displayWeather(data))

    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed)
        document.querySelector('.city').innerHTML = `${name}`
        document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`
        document.querySelector('.description').innerHTML = description
        document.querySelector('.temp').innerHTML = temp + `°C`
        document.querySelector('.humidity').innerHTML = `Humidiy: ${humidity} %`
        document.querySelector('.wind').innerHTML = `Wind Speed: ${speed} km/h`
        document.querySelector('.weather').classList.remove('loading')
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function() {
        let city_value = document.querySelector('.search-bar').value
        this.fetchWeather(city_value)
    }

}


let btn = document.querySelector('.search button')
let search_bar = document.querySelector('.search-bar')
btn.addEventListener('click', function() {
    weather.search()
})

search_bar.addEventListener('keyup', function(event) {
    if (event.key == "Enter") {
        weather.search()
    }
})

weather.fetchWeather('Taipei')