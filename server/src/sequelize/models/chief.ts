'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface ChiefAttributes {
  id: string;
  fullName: string;
  title: string;
  bio: string;
  image: string;
  duties: string;
  position: number;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class Chief extends Model <ChiefAttributes>
  implements ChiefAttributes{
    id!: string;
    fullName!: string;
    title!: string;
    bio!: string;
    image!: string;
    duties!: string;
    position!: number;

    static associate(models: any) {
      // define association here
    }
  }
  Chief.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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