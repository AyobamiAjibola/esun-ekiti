'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Admin extends sequelize_1.Model {
        static associate(models) {
        }
    }
    Admin.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        fullName: {
            type: DataTypes.STRING
        },
        phone_num: {
            type: DataTypes.STRING
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        user_type: {
            type: DataTypes.ENUM,
            values: ['admin', 'user']
        },
        password: {
            type: DataTypes.STRING
        },
        confirm_password: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Admin',
    });
    return Admin;
};
//# sourceMappingURL=admin.js.map