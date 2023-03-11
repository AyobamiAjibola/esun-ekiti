'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface ObaAttributes {
  id: string;
  fullName: string;
  bio: string;
  image: string;
  from: string;
  to: string;
  oba: string
};

module.exports = (sequelize: any, DataTypes: any) => {
  class Oba extends Model <ObaAttributes>
  implements ObaAttributes{
    id!: string;
    fullName!: string;
    bio!: string;
    image!: string;
    from!: string;
    to!: string;
    oba!: string;
    static associate(models: any) {
      // define association here
    }
  }
  Oba.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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