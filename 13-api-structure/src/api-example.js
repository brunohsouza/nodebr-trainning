const Hapi = require('hapi')
const ContextStrategy = require('./db/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongo')
const heroesSchema = require('./db/strategies/mongodb/schemas/heroesSchema')
const app = new Hapi.Server({ port: 5000 })

async function main() {
    const connection = MongoDB.connect()
    const context = new ContextStrategy(new MongoDB(connection, heroesSchema))

    app.route([
        {
            path: '/heroes',
            method: 'GET',
            handler: (request, head) => { return context.read() }
        }
    ])

    await app.start()
    console.log('Server running on ', app.info.port );
}

module.exports = main()