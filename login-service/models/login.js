'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Login extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Login.init({
    id_user: {
      type: DataTypes.INTEGER(6),
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'tbl_user',
    timestamps: false,
    underscored: true
  });
  return Login;
};