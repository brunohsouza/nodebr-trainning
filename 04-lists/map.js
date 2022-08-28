const service = require('./service')

async function main() {
    try {
        const results = await service.getPeople('a')
        const characters = []

        console.time('foreach')
        results.results.forEach(element => {
            characters.push(element.name)
        });
        console.timeEnd('foreach')
        
        console.time('map')
        const names = results.results.map(function(person) {
            return person.name
        });
        console.timeEnd('map')

        console.time('map2')
        const names2 = results.results.map((person) => person.name);
        console.timeEnd('map2')


        console.log(characters);
        console.log(names)
    } catch (error) {
        console.error ('Error: ', error)
    }

}

main()