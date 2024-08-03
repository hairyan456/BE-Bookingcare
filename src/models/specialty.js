'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {

    static associate(models) {
      // define association here
      Specialty.hasOne(models.Markdown, { foreignKey: 'specialtyId' })

      Specialty.hasMany(models.Doctor_Infor, { foreignKey: 'specialtyId' })
    }
  };
  Specialty.init({
    name: DataTypes.STRING,
    nameEn: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Specialty',
  });
  return Specialty;
};