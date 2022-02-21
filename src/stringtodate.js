const stringToDate = (date) => {
    const birthdate = new Date(2020, parseInt(date.substring(5,7)) -1 , date.slice(8))
    return birthdate
}

const formatDate = (date) => {
    const format = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeStyle: 'short' }).format(date)
    return format
}

module.exports = {
    stringToDate,
    formatDate
    
}





