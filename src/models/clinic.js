'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Clinic extends Model {

        static associate(models) {
            // define association here
            Clinic.hasOne(models.Markdown, { foreignKey: 'clinicId' })

            Clinic.hasMany(models.Doctor_Infor, { foreignKey: 'clinicId' })

        }
    };
    Clinic.init({
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Clinic',
    });
    return Clinic;
};