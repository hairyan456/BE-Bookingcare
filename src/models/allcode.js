'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {

        static associate(models) {
            // define association here
            Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' })
            Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
            Allcode.hasMany(models.User, { foreignKey: 'roleId', as: 'roleData' })

            Allcode.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeTypeData' })

            Allcode.hasMany(models.Booking, { foreignKey: 'timeType', as: 'timeTypeDataPatient' })

            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'priceId', as: 'priceData' })
            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'paymentId', as: 'paymentData' })
            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'provinceId', as: 'provinceData' })

        }
    };
    Allcode.init({
        keyMap: DataTypes.STRING, // 'ROLE' , 'STATUS' , 'TIME', "GENDER","POSITION"
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};