'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
;
module.exports = (sequelize, DataTypes) => {
    class History extends sequelize_1.Model {
        static associate(models) {
        }
    }
    History.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        history: {
            type: DataTypes.STRING(10000)
        },
        image: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        esun: {
            type: DataTypes.STRING,
            defaultValue: 'esun'
        }
    }, {
        sequelize,
        modelName: 'History',
    });
    return History;
};
//# sourceMappingURL=history.js.map