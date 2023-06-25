function daysCalculator(start,end){
    const day = daysToMils(1)
    const start_time = start.getTime()
    const end_time = end.getTime()

    let diff = end_time - start_time
    let days = Math.floor(diff / day)

    return days
}

function daysToMils(days){
    const mils = days * 1000 * 60 * 60 * 24
    return mils
}



function tripDatesCalculator(){
    let start = new Date()
    let end = new Date("2023,07,01")
    let days = daysCalculator(start, end)

    let day = daysToMils(1)
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

    console.log(dates)
}
// export { daysCalculator, daysToMils }

// tripDatesCalculator()