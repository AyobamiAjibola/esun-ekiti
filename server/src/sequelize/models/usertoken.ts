'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface UsersToken {
  id: string;
  UserId: string;
  token: string;
  expired_at: Date;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class UserToken extends Model <UsersToken>
  implements UsersToken{

    id!: string;
    UserId!: string;
    token!: string;
    expired_at!: Date

    static associate(models: any) {
      // define association here
    }
  }
  UserToken.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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