const { getPeople } = require('./service.js');
const service = require('./service.js')

async function main() {
    try {
        const result = await getPeople('a')
        const names = []

        console.time('for')
        for (let i = 0; i <= result.results.length - 1; i++) {
            const person = result.results[i];
            names.push(person.name)
        }
        console.timeEnd('for')
                
        console.time('ForIn')
        for (let i in result.results) {
            const person = result.results[i]
            names.push(person.name)
        }
        console.timeEnd('ForIn')
        

        console.time('ForOf')
        for (pessoa of result.results) {
            names.push(pessoa.name)
        }
        console.timeEnd('ForOf')

        console.log('List of Names', names);
    } catch (error) {
        console.log('There was an error with your request', error);
    }
}

main()

