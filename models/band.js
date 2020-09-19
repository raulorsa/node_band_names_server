
const { v4: uuid} = require('uuid');

class Band {
    constructor(name = 'no-name'){
        this.id = uuidV4();
        this.name = name;
        this.votes = 0;
    }
}