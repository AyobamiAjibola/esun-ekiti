'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface OloriAttributes {
  id: string;
  fullName: string;
  image: string;
  olori: string;
  duties: string;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class Olori extends Model <OloriAttributes>
  implements OloriAttributes {
    id!: string;
    fullName!: string;
    image!: string;
    olori!: string
    duties!: string;
    static associate(models: any) {
      // define association here
    }
  }

  Olori.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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