const stringToDate = (cumple) => {
    const birthdate = new Date(2020, parseInt(cumple.substring(5,7)) -1 , cumple.slice(8))
    return birthdate
}

const formatDate = (cumple) => {
    const format = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeStyle: 'short' }).format(cumple)
    return format
}

module.exports = {
    stringToDate,
    formatDate
    
}





