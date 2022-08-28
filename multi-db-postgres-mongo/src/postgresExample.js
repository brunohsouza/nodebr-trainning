const { INTEGER } = require('sequelize')
const { STRING } = require('sequelize')
const { Sequelize } = require('sequelize')
const sequelize = require('sequelize')

const driver = new Sequelize(
    'heroes',
    'x_men',
    'x_secret_pswd', {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false
    }
)

async function main() {
    const Heroes = driver.define('heroes', {
        id: {
            type: INTEGER,
            require: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: STRING,
            required: true
        },
        power: {
            type: STRING,
            required: true
        }
    }, {
        tableName: 'tb_heroes',
        freezeTableName: false,
        timestamps: false
    })
    await Heroes.sync()
    await Heroes.create({
        name: 'Wolverine',
        power: 'claws and healing factor'
    })

    const result = await Heroes.findAll({
        raw: true,
        attributes: ['name']
    })
    console.log('result', result);
}

main()