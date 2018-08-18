const path = require('path');
const Sequelize = require('sequelize');
const administrator = require('../models/administrator');
const answer = require('../models/answer');
const choice = require('../models/choice');
const enquete = require('../models/enquete');
const question = require('../models/question');

class Database {
  /**
   * @param {string} params.storage
   */
  constructor({ storage }) {
    const file = path.resolve(process.cwd(), storage);
    const sequelize = new Sequelize(`sqlite:${file}`, { operatorsAliases: false });

    // model
    const Administrator = sequelize.import('administrator', administrator);
    const Answer = sequelize.import('answer', answer);
    const Choice = sequelize.import('choice', choice);
    const Enquete = sequelize.import('enquete', enquete);
    const Question = sequelize.import('question', question);

    // association
    Enquete.hasMany(Question);
    Question.hasMany(Choice);
    Choice.hasMany(Answer);

    this._instance = sequelize;
    this._models = {
      Administrator,
      Answer,
      Choice,
      Enquete,
      Question,
    };
  }

  get instance() {
    return this._instance;
  }

  get models() {
    return this._models;
  }

  async sync() {
    await this.instance.sync();
  }
}

module.exports = Database;
