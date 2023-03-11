'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
;
module.exports = (sequelize, DataTypes) => {
    class Oba extends sequelize_1.Model {
        static associate(models) {
        }
    }
    Oba.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        bio: {
            type: DataTypes.STRING(10000)
        },
        fullName: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        from: {
            type: DataTypes.STRING
        },
        to: {
            type: DataTypes.STRING
        },
        oba: {
            type: DataTypes.STRING,
            defaultValue: "elesun"
        }
    }, {
        sequelize,
        modelName: 'Oba',
    });
    return Oba;
};
//# sourceMappingURL=oba.js.map