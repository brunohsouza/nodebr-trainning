const Sequelize = require('sequelize')

const HeroesSchema = {
    name: 'heroes',
    schema: {
        id: {
            type: Sequelize.STRING,
            require: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            required: true
        },
        power: {
            type: Sequelize.STRING,
            required: true
        }
    },
    options: {
        tableName: 'tb_heroes',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = HeroesSchema