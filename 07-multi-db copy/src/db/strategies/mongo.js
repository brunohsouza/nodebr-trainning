const { ICrud } = require('../interfaces/CrudInterface')

class MongoDB extends ICrud {
    constructor() {
    }

    create(item) {
        console.log('The item was saved in MongoDB');
    }
}

module.exports = MongoDB