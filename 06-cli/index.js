const Commander = require('commander')
const Database = require('./database')
const Hero = require('./hero')
const crypto = require('crypto')

async function main()
{
    Commander
        .version('v1')
        .option('-n, --name [value]', "Name Of The Hero")
        .option('-p, --power [value]', "Power Of The Hero")
        .option('-c, --create', "Creates a Hero")
        .option('-l, --list', "List a Hero")
        .option('-r, --remove', "Remove a Hero By Id")
        .option('-i, --id', "Hero Id")
        .option('-u, --update', "Update a Hero By Id")
        .parse(process.argv)

    const options = Commander.program.opts()
    const args = Commander.program.args
    const hero = new Hero(options.name, options.power)
    try {
        if (options.create) {
            hero.id = crypto.randomUUID()
            const result = await Database.persist(hero)
            if (!result) {
                console.error('Hero was not created :(');
                return
            }
            console.log('Hero was created with success! id number: ' + hero.id)
        }

        if (options.remove) {
            const result = await Database.remove(args[0])
            if (!result) {
                console.error('Hero was not removed :(');
                return
            }
            console.log('Hero was removed with success!')
        }

        if (options.list) {
            const result = await Database.list()
            if (!result) {
                console.error('There was an error white trying to list the hero :(');
                return
            }
            console.table(result)
        }

        if (options.update) {
            if (!args[0]) {
                console.error('Please, inform the id to update');
                
                return
            }

            const data = JSON.stringify(hero)
            const updatedHero = JSON.parse(data)
            let name = options.name !== undefined ?  options.name : null 
            let power = options.power !== undefined ? options.power : null
            const newData = {"id" : args[0], "name" : name, "power" : power }
            const result = await Database.update(args[0], newData)

            if (!result) {
                console.error('There was an error while updating the hero');
            }
            console.log('Hero updated with success!');
        }
    } catch (error) {
        console.error(error);
    }
}

main()
