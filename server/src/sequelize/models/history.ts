'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface HistoryAttributes {
  id: string;
  history: string;
  image: string;
  esun: string;
};
module.exports = (sequelize: any, DataTypes: any) => {
  class History extends Model <HistoryAttributes>
  implements HistoryAttributes{
    id!: string;
    history!: string;
    image!: string;
    esun!: string;

    static associate(models: any) {
      // define association here
    }
  }
  History.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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