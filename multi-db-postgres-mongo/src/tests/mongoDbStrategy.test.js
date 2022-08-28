const { deepEqual } = require('assert')
const assert = require('assert')
const { randomInt } = require('crypto')
const { model } = require('mongoose')
const Context = require('../db/base/contextStrategy')
const MongoDB = require('../db/strategies/mongodb/mongo')
const heroesSchema = require('../db/strategies/mongodb/schemas/heroesSchema')

let context = {}
const MOCK_HERO_CREATE = { name: 'Cyclops', power: 'laser eyes' }
const MOCK_HERO_UPDATED = { name: 'Beast_' + randomInt(5), power: 'Wisdom' }

describe('Mongo Strategy', function() {
    this.beforeAll(async function() {
        const connection = MongoDB.connect()
        context = new Context(new MongoDB(connection, heroesSchema))
    })

    it('Mongo Connection', async () => {
        const result = await context.isConnected()
        const expected = 'Connected'

        assert.equal(result, expected)
    })

    it('Create a hero', async () => {
        const { name, power } = await context.create(MOCK_HERO_CREATE)

        assert.deepEqual({ name, power }, MOCK_HERO_CREATE)
    })

    it('List', async function() {
        const [{ name, power }] = await context.read({ name: MOCK_HERO_CREATE.name })
        const result = { name, power }

        assert.deepEqual(result, MOCK_HERO_CREATE)
    })

    it('Update', async () => {
        const { _id, name, power, insertedAt} = await context.create(MOCK_HERO_UPDATED)
        const result = [{ name, power, insertedAt}]
        const newItem = {
            ...result[0],
            power: 'Walk in the roof'
        }

        await context.update(_id, newItem)
        const [updatedItem] = await context.read({name: name})

        assert.deepEqual(updatedItem.name, name)
        assert.notDeepEqual(updatedItem.power, power)
        assert.deepEqual(updatedItem.power, newItem.power)
    })

    it('Remove Hero', async () => {
        let { _id } = await context.create(MOCK_HERO_CREATE)
        const result = await context.delete(_id)

        assert.deepEqual(result.deletedCount, 1)
    })
})

