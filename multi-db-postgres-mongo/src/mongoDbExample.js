const Mongoose = require('mongoose')
Mongoose.connect('mongodb://mongonode:mongonode@localhost:27017/heroes',
    { useNewUrlParser: true } , function (error) {
        if (!error) return;
        console.log('Connection failed!', error)
    })

const connection = Mongoose.connection

connection.once('open', () => console.log('The DB is running!!! lol'))

/*
CONNECTION STATES:
    0: Disconnect
    1: Connected
    2: Connecting
    3: Disconnecting
*/
setTimeout(() => {
    const state = connection.readyState
    console.log('state', state);
}, 1000);

const heroesSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    power: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('heroes', heroesSchema)

async function main() {
    const resultCreate = await model.create({
        name: 'Batman',
        power: 'Money'
    })
    console.log('Create result: ', resultCreate);

    const listItems = await model.find()
    console.log('items', listItems);
}

main()