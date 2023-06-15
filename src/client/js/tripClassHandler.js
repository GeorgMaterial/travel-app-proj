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

        client.getPixabay(`${obj.city}+${obj.country}`, obj.id)
    }


}

/* 



*/