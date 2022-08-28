const { Sequelize } = require('sequelize')
const { IDb } = require('../../interfaces/CrudInterface')

class Postgres {
    constructor(connection, schema) {
        this._db = schema
        this._connection = connection
    }

    static async defineModel(connection, schema) {
        const model = connection.define(schema.name, schema.schema, schema.options)
        await model.sync()

        return model
    }

    static async connect() {
        const sequelize = new Sequelize(
            'heroes',
            'x_men',
            'x_secret_pswd', {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false
            }
        )

        return sequelize
    }

    async isConnected() {
        try {
            await this._connection.authenticate()

            return true
        }
        catch(error) {
            console.log('fail', error);

            return false
        }
    }

    create(item) {
        return this._db.create(item, { raw: true })
    }

    read(item = {}) {
        return this._db.findAll({where: item, raw: true})
    }

    update(id, item) {
        return this._db.update(item, { where: {id: id}})
    }

    async delete(id) {
        const query = id ? {id}: {}

        return this._db.destroy({ where:query })
    }

}

module.exports = Postgres