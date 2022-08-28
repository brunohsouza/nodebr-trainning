const { ICrud } = require('../../interfaces/CrudInterface')
const Mongoose = require('mongoose')
const heroesSchema = require('./schemas/heroesSchema')

const STATUS = {
    0: 'Disconnect',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
}

class MongoDB {
    constructor(connection, schema) {
        this._schema = heroesSchema
        this._connection = null
    }

    static connect() {
        Mongoose.connect('mongodb://mongonode:mongonode@localhost:27017/heroes',
        { useNewUrlParser: true },
        function (error) {
            if (!error) return;
            console.log('Connection failed!', error)
        })

        this._connection = Mongoose.connection

        this._connection.once('open', () => console.log('The DB is running!!! lol'))

        return this._connection;
    }

    async isConnected() {
        const state = STATUS[Mongoose.connection.readyState]

        switch (state) {
            case 'Connected':
                return state
                break
            case 'Connecting':
            case 'Disconnecting':
            case 'Disconnected':
                await new Promise(resolve => setTimeout(resolve, 1000))

                return STATUS[Mongoose.connection.readyState]
                break;
            default:
                console.log('Fail to get status from connection');;
        }


        return STATUS[Mongoose.connection.readyState]
    }

    create(item) {
        return this._schema.create(item)
    }

    read(item, skip=0, limit=10) {
        return this._schema.find(item).skip(skip).limit(limit)
    }

    update(id, item) {
        return this._schema.updateOne({ _id: id}, {$set: item })
    }

    delete(id) {
        return this._schema.deleteOne({ _id: id })
    }
}

module.exports = MongoDB