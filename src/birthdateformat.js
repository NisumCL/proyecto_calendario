const birthDateFormat = (cumple) => {
    const shortdate = '2020-' + cumple.slice(5)
    const birthdate = new Date(shortdate)
    return birthdate
}

module.exports = {
    birthDateFormat
}





