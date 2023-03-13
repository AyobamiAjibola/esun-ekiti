'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
;
module.exports = (sequelize, DataTypes) => {
    class Chief extends sequelize_1.Model {
        static associate(models) {
        }
    }
    Chief.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        fullName: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        bio: {
            type: DataTypes.STRING(500)
        },
        image: {
            type: DataTypes.STRING
        },
        duties: {
            type: DataTypes.STRING
        },
        position: {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'Chief',
    });
    return Chief;
};
//# sourceMappingURL=chief.js.map