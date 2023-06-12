function daysCalculator(start,end){
    const day = 1000 * 60 * 60 * 24
    const start_time = start.getTime()
    const end_time = end.getTime()

    let diff = end_time - start_time
    let days = diff / day

    return days
}

export { daysCalculator }