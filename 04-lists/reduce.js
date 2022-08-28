const { getPeople } = require('./service')

Array.prototype.myReduce = function(callback, initialValue) {
    let finalValue = typeof initialValue !== undefined ? initialValue : this[0]

    for (let index = 0; index <= this.length -1; index++) {
        finalValue = callback(finalValue, this[index], this)
    }

    return finalValue
}

async function main() {
    try {
        const { results } = await getPeople('a')
        const weights = results.map(item => parseInt(item.height))
        console.log('weights', weights);

        /*const total = weights.reduce((previous, next) => {
            return previous + next
        })*/

        const total = weights.myReduce((previous, next) => {
            if (previous.valueOf().length === 0) {
                 return next
            }
            return previous + next
        }, []) // dont break if the first item is an empty array 

        console.log('total', total)
    } catch (error) {
        console.error(error);
    }
}

main()