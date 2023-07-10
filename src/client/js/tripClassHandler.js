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
        // this.countTimer ;
        // this.weatherInt ;
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
            if (diff < 0){
                let days = 0
                let hours = 0
                let mins = 0
                let secs = 0

                let string = 
                    `${ days } days, ${hours} hours, ${mins} mins, ${ secs }s`
            
                el.innerText = string

                clearInterval(this.countTimer)
            } else {
                let days = Math.floor((diff / day))
                let hours = Math.floor((diff % day) / hour)
                let mins = Math.floor(((diff % day ) % hour ) / minute)
                let secs = Math.floor((((diff % day) % hour ) % minute ) / second)

                let string = 
                    `${ days } days, ${hours} hours, ${mins} mins, ${ secs }s`
            
                el.innerText = string
            } 
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
            console.log(this)
            this.fillCard()
        }
        )
    }

    tripDatesCalculator(){
        // RETURNS AN ARRAY OF ALL DATES DURING THE TRIP
        let start = new Date(this.arrival)
        let end = new Date(this.depart)
        let days = client.daysCalculator(start, end)
    
        let day = client.daysToMils(1)
        start = start.getTime()
        let i = 0
        const dates = []
    
        while (i < days){
            let mils = day * (i + 1)
            let date = new Date(start + mils).toDateString()
            dates.push(date)
            
            i ++
        }
        return dates
    }

    fillCard(){
        const allTrips = document.getElementById('all-trips')

        let start = this.arrival.toDateString()
        let end = this.depart.toDateString()

        let city = client.capitalizeFirstLetter(this.city)
        let prov = client.capitalizeFirstLetter(this.prov)
        let country = client.capitalizeFirstLetter(this.country)

        let html = 
        `<div id="${this.city}-${this.id}" class="trip_card">
            <img id="img-${this.id}" src="${this.image_url}" alt="Tourism image, ${country}">
            <div class="trip-info" id="info-${this.id}" active="">
                <h3>You're going to ${ city }, ${ prov }, ${ country }</h3>
                <p>${ start } - ${ end }</p><button class="remove" onclick="return client.removeTrip('${this.city}-${this.id}')">remove trip</button>
                <p><strong>Trip length:</strong> ${ this.days } days</p>
                <p>Starts in <span id="countdown-${ this.id }"></span></p>
            </div>
            <button class="weather-but" onclick="return client.generalToggle(event,'weather-${this.id}')">Toggle Weather</button>
            <div class="weather" id="weather-${this.id}">
            </div>
        </div>`

        allTrips.insertAdjacentHTML('beforeend',html)

        this.countdown()
        this.forecast()
        document.getElementById('form').removeAttribute('active')
    }


    forecast(){
        let data = {
            lat: this.lat,
            lon: this.lon,
            prov: this.prov,
            country: this.country
        }
        let generator = () => {
            let forecast = []
            let wait = client.daysCalculator(new Date(),this.arrival)
            client.getWeather(data)
            .then((res) => {
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
                this.showForecast(forecast)
            })
        }
        generator()
        this.weatherInt = setInterval(generator,  1000 * 60 * 60)
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


            let html = 
                `<div class="item">
                    <img src="${ icon }" width="100px">
                    <div class="w-date">${ date_string }</div>
                    <p class="w-desc">${ desc }</p>
                    <p class="w-info">${min_temp}ºC - ${max_temp}ºC<br>${rain}% chance of rain</p>
                </div>`
            
            cont.insertAdjacentHTML('beforeend',html)
        }

    }
}