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
        this.wait = ""
        this.countTimer ;
        this.weatherInt ;
        this.completeSetUp(obj)
    }

    countdown(){
        this.countTimer = setInterval(() => {
            
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
            this.tripDatesCalculator()
            this.fillCard()
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

        let html = `<div id="${this.city}-${this.id}" class="trip_card">
            <div class="trip-img" id="img-${this.id}">
            <h3>You're going to ${ this.city }<br>${ this.prov }, ${ this.country }</h3>
            <p>${ start } - ${ end }</p><button onclick='return client.removeTrip("${this.city}-${this.id}")'>remove trip</button>
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
        this.forecast()
        client.toggleForm()
    }


    forecast(){
        
        let data = {
            lat: this.lat,
            lon: this.lon,
            prov: this.prov,
            country: this.country
        }

        this.weatherInt = setInterval(() => {
            let forecast = []
            let wait = client.daysCalculator(new Date(),this.arrival)
            console.log(wait)
            client.getWeather(data)
            .then((res) => {
                console.log(res.data)
                const length = res.data.length
                if ( wait < length ){
                    let difference = length - wait
                    let num = difference > this.days ? this.days : difference ;
                    let i = 0
                    while ( i < num ){
                        forecast.push(res.data[i])
                        i ++
                    }
                } else {
                    forecast.push(res.data[0])
                }
                console.log(forecast)
                this.showForecast(forecast)
            })
            
            
        }, ( 1000 * 60 * 60 ) )
    }

    clearTimers(){
        clearInterval(this.countTimer)
        clearInterval(this.weatherInt)
    }

    showForecast(w){

        const cont = document.getElementById(`weather-${this.id}`)
        for (let item of w){
            const date = item.valid_date
            const icon = `https://cdn.weatherbit.io/static/img/icons/${item.weather.icon}.png`
            const desc = item.weather.description
            const max_temp = item.max_temp
            const min_temp = item.min_temp
            const rain = item.pop 

            let date_string = new Date(date).toDateString()


            let html = `<div class="item">
                    <img src="${ icon }" width="100px">
                    <div class="w-date">${ date_string }</div>
                    <p class="w-desc">${ desc }</p>
                    <p class="w-info">${min_temp}ºC - ${max_temp}ºC<br>${rain}% chance of rain</p>
                </div>`
            
            cont.insertAdjacentHTML('beforeend',html)
        }

    }

    
    

}

/* 



*/