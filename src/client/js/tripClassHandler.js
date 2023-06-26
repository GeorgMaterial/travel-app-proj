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
        this.image_url = ""
        this.completeSetUp(obj)
    }

    countdown(){
        setInterval(() => {
            const el = document.getElementById(`countdown-${this.id}`)

            const now = new Date().getTime()
            const then = new Date(this.arrival).getTime()
        
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

    completeSetUp(obj){
        async function getImage(){
            let image = await client.getPixabay({city: obj.city, prov: obj.prov, country: obj.country})
            return image
        }

        getImage()
        .then((url) => {
            this.image_url = url
            this.fillCard()
            this.tripDatesCalculator()
            console.log(this.image_url)
        }
        )
    }

    tripDatesCalculator(){
        // RETURNS AN ARRAY OF ALL DATES DURING THE TRIP
        let start = new Date(this.arrival)
        let end = new Date(this.depart)
        let days = client.daysCalculator(start, end)
    
        let day = client.daysToMils(1)
        console.log(day)
        start = start.getTime()
        let i = 0
        const dates = []
    
        while (i < days){
            let mils = day * (i + 1)
            let date = new Date(start + mils).toDateString()
            dates.push(date)
            
            i ++
        }

        this.dates =  dates
    }

    fillCard(){
        const allTrips = document.getElementById('all-trips')

        let start = this.arrival.toDateString()
        let end = this.depart.toDateString()

        let html = `<div id="${this.id}" class="trip_card">
            <div class="trip-img" id="img-${this.id}">
            <h3>You're going to ${ this.city }<br>${ this.prov }, ${ this.country }</h3>
            <p>${ start } - ${ end }</p><button>remove trip</button>
            </div>
            <div class="trip-info">
                <div class="trip-basic">
                    <p><strong>Trip length:</strong> ${ this.days } days</p>
                    <p>Starts in <span id="countdown-${ this.id }"></span></p>
                </div>
                <button>Toggle Weather</button>
                <div class='weather' id='weather-${this.id}'>
                </div>
            </div>
            <button class="exp-trip" onclick="return client.toggleCard(event)">expand</button>
        </div>`

        allTrips.insertAdjacentHTML('beforeend',html)

        let gradient = `linear-gradient(rgba(72,0,72,0.35), rgba(192,72,72,0.35)), url(${this.image_url})`
        document.querySelector(`#img-${this.id}`).style['background-image'] = gradient

        this.countdown()
        client.toggleForm()
    }


    forecast(){
        // let milliseconds = client.daysToMils(1)
        let data = {
            lat: this.lat,
            lon: this.lon,
            prov: this.prov,
            country: this.country
        }

        let tripDates = tripDatesCalculator()

        // setInterval(() => {
            
            let now = new Date()

            let days_until = client.daysCalculator(now, this.arrival)

            if (days_until > 16){
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
        let tripDates = tripDatesCalculator()

        const cont = document.getElementById(`weather-${this.id}`)
        for (let item of w.data){
            const date = item.valid_date
            const icon = `https://cdn.weatherbit.io/static/img/icons/${item.weather.icon}.png`
            const desc = item.weather.description
            const max_temp = item.max_temp
            const min_temp = item.min_temp
            const rain = item.pop 


            let html = `<div class="item">
                    <img src="${ icon }" width="100px">
                    <div class="w-date">${ date }</div>
                    <p class="w-desc">${ desc }</p>
                    <p class="w-info">${min_temp} - ${max_temp}<br>${rain}% chance of rain</p>
                </div>`
            
            cont.insertAdjacentHTML('beforeend',html)
        }

    }

    
    

}

/* 



*/