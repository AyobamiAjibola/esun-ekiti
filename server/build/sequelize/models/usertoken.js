'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
;
module.exports = (sequelize, DataTypes) => {
    class UserToken extends sequelize_1.Model {
        static associate(models) {
        }
    }
    UserToken.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        UserId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expired_at: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'UserToken'
    });
    return UserToken;
};
//# sourceMappingURL=usertoken.js.map