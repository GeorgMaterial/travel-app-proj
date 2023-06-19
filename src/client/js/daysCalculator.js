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

export { daysCalculator, daysToMils }