export class Trip{
    constructor(obj = {}){
        this.city = obj.city
        this.arrival = obj.arrival
        this.depart = obj.depart
        this.days = client.daysCalculator(obj.arrival, obj.depart)
        this.lat = obj.lat
        this.lon = obj.lon
        this.prov = obj.prov
        this.country = obj.country
        this.id = obj.id

        client.getPixabay(`${obj.city}+${obj.country}+${obj.prov}`, obj.id)
    }

    countdown(){
        setInterval(() => {
            const el = document.getElementById(`countdown-${this.id}`)

            const now = new Date().getTime()
            const then = new Date("2023,06,23").getTime()
        
            const second = 1000
            const minute = second * 60
            const hour = minute * 60
            const day = hour * 24
        
            let diff = ((then - now));
            let days = Math.floor((diff / day))
            let hours = Math.floor((diff % day) / hour)
            let mins = Math.floor(((diff % day ) % hour ) / minute)
            let secs = Math.floor((((diff % day) % hour ) % minute ) / second)
        
            let string = 
                `${ days }days, ${hours}hours, ${mins}mins, ${ secs }s`
            
            el.innerText = string
            
            
        }, 1000);
    }

    fillCard(){
        const allTrips = document.getElementById('all-trips')

        let start = this.arrival.toDateString()
        let end = this.depart.toDateString()

        let html = `<div id="${this.id}" class="trip_card">
            <div class="trip-img" id="img-${this.id}">
                <h3>You're going to <span class="dest">${ this.city }, ${ this.prov }, ${ this.country }</span></h3>
                <p>${ start } - ${ end }</p>
            </div>
            <div class="trip-info">
                <p><strong>Trip length:</strong> ${ this.days } days</p>
                <p>Starts in <span id="countdown-${this.id}"></span></p>
                <div class='weather' id='weather-${this.id}'><button>Toggle Weather</button>
                </div>
                <button>save trip</button><button>remove trip</button>
            </div>
            <button class="exp-trip" onclick="return client.toggleCard(event)">expand</button>
        </div>`

        allTrips.insertAdjacentHTML('beforeend',html)

        let gradient = `linear-gradient(rgba(72,0,72,0.6), rgba(192,72,72,0.6)), url(${this.image_url})`
        document.querySelector(`#img-${this.id}`).style['background-image'] = gradient

        this.countdown()
        client.toggleForm()
    }


    forcast(){
        let milliseconds = client.daysToMils(1)
        let data = {
            lat: this.lat,
            lon: this.lon,
            prov: this.prov,
            country: this.country
        }

        // setInterval(() => {
            
            let now = new Date()

            let days_until = client.daysCalculator(now, this.arrival)

            while (days_until > 16){
                let now = new Date()
                let days_until = client.daysCalculator(now, this.arrival)

                console.log('inside interval')

                setInterval(10000)
            }

            if (days_until <= 16){
                client.getWeather(data, this.id)
                // this.addEventListener('weatherReceived', e => {
                //     let response = e.detail.response // WEATHER DATA FOR SELECTED LOCATION
                //     // showForecast(response)
                // })

            }
            // let milli_until = client.daysToMils(days_until)
            
        // }, 10000 )

        // function showForecast(data){
        //     console.log(data.data)
        // }
    }

    showForecast(w){
        const cont = document.getElementById(`weather-${this.id}`)
        for (let item of w.data){
            const date = item.valid_date
            const icon = `https://cdn.weatherbit.io/static/img/icons/${item.weather.icon}.png`
            const desc = item.weather.description
            const max_temp = item.max_temp
            const min_temp = item.min_temp
            const rain = item.pop 


            let html = `<img src="${icon}" width="100px">
            <div class="w-date">${date}</div><ul>
                <li>${desc}
                <li>Max Temp: ${ max_temp }
                <li>Min Temp: ${ min_temp}
                <li>Chance of rain: ${rain}
                </ul>`
            
            cont.insertAdjacentHTML('beforeend',html)
            
        }

    }

    
    

}

/* 



*/