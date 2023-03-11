'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface AdminAttributes {
  id: string;
  fullName: string;
  phone_num: String;
  isAdmin: Boolean;
  user_type: String;
  password: String;
  confirm_password: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Admin extends Model <AdminAttributes>
  implements AdminAttributes{
    id!: string;
    fullName!: string;
    phone_num!: String;
    isAdmin!: Boolean;
    user_type!: String;
    password!: String;
    confirm_password!: string;

    static associate(models: any) {
    }
  }
  Admin.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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