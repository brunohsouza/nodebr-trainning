const axios = require('axios')
const URL = 'https://swapi.dev/api/people'

async function getPeople(name) {
    const url = `${URL}/?search=${name}&format=json`
    const response = await axios.get(url)
    return response.data
}

/*getPeople('yoda')
    .then(function (result){
        console.log('The people you had searched was: ', result);
    })
    .catch(function(error) {
        console.log('There was an error in your search', error);

    })
*/

module.exports = {
    getPeople
}