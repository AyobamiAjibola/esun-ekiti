'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface NewsAttributes {
  id: string;
  news: string;
  status: boolean;
  title: string;
  image: string;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class News extends Model <NewsAttributes>
  implements NewsAttributes{
    id!: string;
    news!: string;
    status!: boolean;
    title!: string;
    image!: string;
    static associate(models: any) {
      // define association here
    }
  }
  News.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    news: {
      type: DataTypes.STRING(20000)
    },
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'pending'],
      defaultValue: 'pending'
    },
    title: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};