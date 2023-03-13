'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
;
module.exports = (sequelize, DataTypes) => {
    class PastOba extends sequelize_1.Model {
        static associate(models) {
        }
    }
    PastOba.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        fullName: {
            type: DataTypes.STRING
        },
        from: {
            type: DataTypes.STRING
        },
        to: {
            type: DataTypes.STRING
        },
        position: {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'PastOba',
    });
    return PastOba;
};
//# sourceMappingURL=pastoba.js.map