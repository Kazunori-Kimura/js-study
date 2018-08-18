const answer = (sequelize, DataTypes) => {
  return sequelize.define('answer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
};

module.exports = answer;
