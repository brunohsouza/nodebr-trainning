const { deepEqual, ok } = require('assert')
const database = require('./database')


const DEFAULT_HERO = {
    "id": 1,
    "name": "Flash",
    "power": "speed"
}

const DEFAULT_HERO_BATMAN = {
    "id": 2,
    "name": "Batman",
    "power": "Rich"
}

const DEFAULT_HERO_SUPERMAN = {
    "id": 3,
    "name": "Superman",
    "power": "Fly, laser in the eye, super strong, speed"
}

describe('Hero\'s Handler Suit', () => {
    before(async () => {
        await database.persist(DEFAULT_HERO)
        await database.persist(DEFAULT_HERO_SUPERMAN)
    })

    it ('Search for a hero using files', async () => {
        const expected = DEFAULT_HERO
        const [result] = await database.list(expected.id)
        
        deepEqual(result, expected)
    })

    it ('should create a hero using files', async() => {
        const expected = {
            id: 2,
            name: 'Batman',
            power: 'Rich'
        }
        const result = await database.persist(DEFAULT_HERO_BATMAN)
        const [currentList] = await database.list(DEFAULT_HERO_BATMAN.id)

        deepEqual(currentList, expected)
    })

    it ('should remove a hero from the file', async() => {
        const expected = true
        const result = await database.remove(DEFAULT_HERO.id)

        ok(result)
    })

    it ('should update a hero from the file by id', async() => {
        const expected = {
            ...DEFAULT_HERO_SUPERMAN,
            nome: 'Green Lantern',
            power: 'Green energy in the ring'
        }
        const newData = {
            nome: 'Green Lantern',
            power: 'Green energy in the ring'
        }
        await database.update(DEFAULT_HERO.id, newData)
        const result = await database.list(DEFAULT_HERO_BATMAN.id)

        ok(result)
    })
})