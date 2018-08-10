const uuid = require('uuid/v4');
const QuestionType = require('../lib/QuestionType');

class Question {
  constructor({
    id = uuid(),
    body = '',
    type = QuestionType.single,
    choices = [],
    createAt = (new Date()).toJSON(),
    updateAt = (new Date()).toJSON(),
  }) {
    this.id = id;
    this.body = body;
    this.type = type;
    this.choices = choices;
    this.createAt = createAt;
    this.updateAt = updateAt;
  }
}

module.exports = Question;
