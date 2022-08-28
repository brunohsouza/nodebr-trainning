const { ICrud } = require('../interfaces/CrudInterface')

class Postgres {
    constructor() {
    }

    create(item) {
        console.log('The item was saved in Postgres');
    }
}

module.exports = Postgres