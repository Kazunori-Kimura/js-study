const uuid = require('uuid/v4');

class Enquete {
  constructor({
    id = uuid(),
    title = '',
    description = '',
    enabled = false,
    createAt = (new Date()).toJSON(),
    updateAt = (new Date()).toJSON(),
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.enabled = enabled;
    this.createAt = createAt;
    this.updateAt = updateAt;
  }

  static findAll() {

  }

  static find(id) {
    
  }
}

module.exports = Enquete;
