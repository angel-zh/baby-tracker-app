// function to fix the one day discrepancy between input date and display date
const formatDate = date => {
    return new Date(date.replace(/-/g, '\/').replace(/T.+/, ''))
}

module.exports = formatDate