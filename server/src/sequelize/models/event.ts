'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface EventAttributes {
  id: string;
  name: string;
  detail: string;
  image: string;
  isEvent: string;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class Event extends Model <EventAttributes>
  implements EventAttributes{
    id!: string;
    name!: string;
    detail!: string;
    image!: string;
    isEvent!: string;

    static associate(models: any) {
      // define association here
    }
  }
  Event.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    detail: {
      type: DataTypes.STRING(20000)
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    isEvent: {
      type: DataTypes.ENUM,
      values: ['active', 'pending'],
      defaultValue: 'active'
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};