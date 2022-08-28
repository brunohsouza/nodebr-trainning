const Commander = require('commander')
const Redis = require('./db/strategies/redis')
const crypto = require('crypto')
const Partner = require('./partner/partner')
const { exit } = require('process')
const microtime = require('microtime')

async function main()
{
    Commander
        .version('v1')
        .option('-n, --name [value]', "Name Of The Partner")
        .option('-t, --type [value]', "Type Of The Partner")
        .option('-i, --id [value]', "Partner Id")
        .option('-c, --create', "Creates a Partner")
        .option('-l, --list', "List a Partner")
        .option('-f, --find', "Find a Partner By Id")
        .parse(process.argv)

    const options = Commander.program.opts()
    const args = Commander.program.args
    let partner = new Partner(options.name, options.type, options.id)
    try {
        if (options.create) {
            partner.credential = crypto.randomUUID()
            const result = await Redis.persist(partner)
            if (!result) {
                console.error('Partner was not created :(');
                return
            }
            console.log('Partner was created with success! id number: ' + result.urn)
        }

        if (options.list) {
            let start = microtime.nowDouble()
            console.log(start);
            const result = await Redis.list()
            let end = microtime.nowDouble()
            console.log(end);
            console.log('List Time:' + (end - start))
            if (!result) {
                console.error('There was an error white trying to list the Partner :(');
                return
            }
            console.table(result)
            exit()
        }
    } catch (error) {
        console.error(error);
    }
}

main()
