'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface PastObaAttributes {
  id: string;
  fullName: string;
  from: string;
  to: string;
  position: number;
};
module.exports = (sequelize: any, DataTypes: any) => {
  class PastOba extends Model <PastObaAttributes>
  implements PastObaAttributes{
    id!: string;
    fullName!: string;
    from!: string;
    to!: string;
    position!: number;

    static associate(models: any) {
      // define association here
    }
  }
  PastOba.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING
    },
    from: {
      type: DataTypes.STRING
    },
    to: {
      type: DataTypes.STRING
    },
    position: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'PastOba',
  });
  return PastOba;
};