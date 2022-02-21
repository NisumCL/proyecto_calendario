const compareDates = (start, end, date) => {
    // date.setTime(start.getTime())

    if(start <= end ){
        if (date >= start && date <= end) {
            return true;
        }
    }
    else if (start > end ){
        if(date >= start || date <= end){
            return true
        }
    }
} 

module.exports = {
    compareDates
}