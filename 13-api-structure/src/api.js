const Hapi = require('hapi')
const ContextStrategy = require('./db/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongo')
const heroesSchema = require('./db/strategies/mongodb/schemas/heroesSchema')
const HeroRoutes = require('./routes/HeroRoutes')
const app = new Hapi.Server({ port: 5000 })

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDB.connect()
    const context = new ContextStrategy(new MongoDB(connection, heroesSchema))

    app.route([
        ...mapRoutes(new HeroRoutes(context, HeroRoutes.methods()))
    ])

    await app.start()
    console.log('Server running on ', app.info.port );
}

module.exports = main()