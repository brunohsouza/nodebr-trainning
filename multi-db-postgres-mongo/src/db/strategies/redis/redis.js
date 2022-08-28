const redis = require('redis')
const redisClient = redis.createClient('6379', '172.30.0.6')
const microtime = require('microtime')

class Redis {
    constructor() {
        this.connect()
    }

    async connect() {
        await redisClient.connect()
    }

    async disconnect() {
        await redisClient.disconnect()
    }

    async persist(partner) {
        let data = {
            'name': partner.name,
            'type': partner.type,
            'urn': partner.urn,
            'credential': partner.credential
        }

        let start = microtime.nowDouble()
        console.log(start);
        await redisClient.hSet(partner.name, data)
        let end = microtime.nowDouble()
        console.log(end);
        console.log('Process Time: ' + (end - start))

        this.disconnect()

        return partner
    }

    async find(id) {
        return redisClient.get(id)
    }

    async list() {
        return await redisClient.hGetAll('pos-test', function() {
            this.disconnect()
        })
    }
}

module.exports = new Redis()