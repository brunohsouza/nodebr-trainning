const { readFile, writeFile }  = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {

    constructor() {
        this.filename = 'heroes.json'
    }

    async getDataFromFile() {
        const file = await readFileAsync(this.filename, 'utf8')

        return JSON.parse(file.toString())
    }

    async persistOnFile(data) {
        await writeFileAsync(this.filename, JSON.stringify(data))
        
        return true
    }
    
    async persist(hero) {
        const data = await this.getDataFromFile()
        const id = hero.id <= 2 ? hero.id : Date.now()
        const heroWithId = { id, ...hero }
        const FinalData = [ ...data, heroWithId ]
        
        await this.persistOnFile(FinalData)

        return id
    }

    async fimd(id) {
        const data = await this.getDataFromFile()
        const filteredData = data.filter(item => (id ? item.id === id : true))

        return filteredData
    }

    async list() {
        return await this.getDataFromFile()
    }

    async remove(id) {
        if (!id) {
            return await this.persistOnFile([])
        }

        const data = await this.getDataFromFile()
        const index = data.findIndex(item => item.id === id)
        if (-1 === index) {
            throw Error('User not found')
        }
        data.splice(index, 1)
        await this.persistOnFile([])
        await this.persistOnFile(data)

        return true
    }

    async update(id, newData) {
        const data = await this.getDataFromFile()
        const index = data.findIndex(item => item.id === id)

        if (-1 === index) {
            throw Error('Hero not found!')
        }

        const objectToUpdate = {
            'id' : id,
            'name' : newData.name !== null ? newData.name : data[index].name,
            'power' : newData.power !== null ? newData.power : data[index].power
        }
        data.splice(index, 1)

        return await this.persistOnFile([
            ...data,
            objectToUpdate
        ])         
    }
}

module.exports = new Database()