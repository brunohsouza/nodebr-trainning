const { deepEqual } = require('assert')
const assert = require('assert')
const Context = require('../db/base/contextStrategy')
const Postgres = require('../db/strategies/postgres/postgres')
const HeroesSchema = require('../db/strategies/postgres/schemas/HeroesSchema')

const MOCK_HERO_CREATE = { name: 'Cyclops', power: 'laser eyes' }
const MOCK_HERO_UPDATED = { name: 'Beast', power: 'Wisdom' }

let context = {}
describe('Postgres Strategy', function() {
    this.timeout(Infinity)
    this.beforeAll(async function() {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, HeroesSchema)
        context = new Context(new Postgres(connection, model))
        await context.delete()
    })

    it('PosgresSQL Connection', async function() {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('Create a hero', async function(){
        const { name, power } = await context.create(MOCK_HERO_CREATE)

        assert.deepEqual({ name, power }, MOCK_HERO_CREATE)
    })

    it('List', async function(){
        const [result] = await context.read({ name: MOCK_HERO_CREATE.name })
        delete result.id

        assert.deepEqual(result, MOCK_HERO_CREATE)
    })

    it('Update', async function(){
        const item = await context.create(MOCK_HERO_UPDATED)
        const newItem = {
            ...MOCK_HERO_UPDATED,
            power: 'Walk in the roof'
        }
        const result = await context.update(item.id, newItem)
        const [updatedItem] = await context.read({id: item.id})

        assert.deepEqual(updatedItem.id, item.id)
        assert.deepEqual(updatedItem.name, newItem.name)
        assert.deepEqual(updatedItem.power, newItem.power)
    })

})

