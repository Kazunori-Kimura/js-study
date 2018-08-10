const uuid = require('uuid/v4');

class Choice {
  constructor({
    enqueteId,
    questionId,
    id = uuid(),
    text = '',
  }) {
    this.enqueteId = enqueteId;
    this.questionId = questionId;
    this.id = id;
    this.text = text;
  }

  /**
   * 選択肢を取得
   */
  static async find({ enqueteId, questionId }) {

  }

  create() {

  }

  update() {

  }

  remove() {

  }
}

module.exports = Choice;
