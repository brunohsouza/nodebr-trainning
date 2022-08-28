const axios = require('axios')

const URL = 'https://swapi.dev/api/people'

async function getPerson(name) {
    const url = `${URL}/?search=${name}&format=json`
    const response = await axios.get(url)

    return response.data.results.map(mapPersonData)
}

function mapPersonData(item) {
    return {
        name: item.name,
        height: item.height
    }
}

module.exports = { getPerson }