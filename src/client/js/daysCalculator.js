function daysCalculator(start,end){
    const day = daysToMils(1)
    const start_time = start.getTime()
    const end_time = end.getTime()

    let diff = end_time - start_time
    let days = diff / day

    return days
}

function daysToMils(days){
    const mils = days * 1000 * 60 * 60 * 24
    return mils
}


function countdown(){
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



export { daysCalculator, daysToMils }