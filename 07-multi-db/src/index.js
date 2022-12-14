const ContextStrategy = require('./db/base/contextStrategy')
const MongoDB = require('./db/strategies/mongo')
const Postgres = require('./db/strategies/postgres')

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create()

