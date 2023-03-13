'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
;
module.exports = (sequelize, DataTypes) => {
    class Olori extends sequelize_1.Model {
        static associate(models) {
        }
    }
    Olori.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        fullName: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        olori: {
            type: DataTypes.STRING,
            defaultValue: "elesun"
        },
        duties: {
            type: DataTypes.STRING(1000)
        }
    }, {
        sequelize,
        modelName: 'Olori',
    });
    return Olori;
};
//# sourceMappingURL=olori.js.map