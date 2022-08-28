const NotImplementedException = require('../../../Exception/NotImplementedException')

class ICrud {
    constructor() {
        
    }

    create(item) {
        throw new NotImplementedException()
    }

    read(query) {
        throw new NotImplementedException()
    }

    update(id, item) {
        throw new NotImplementedException()
    }

    delete(id) {
        throw new NotImplementedException()
    }
}

module.exports = ICrud