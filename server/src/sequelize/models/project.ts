'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface ProjectAttributes {
  id: string;
  project: string;
  date_commissioned: any;
  detail: string;
  image: string;
  isProject: boolean;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class Project extends Model <ProjectAttributes>
  implements ProjectAttributes{
    id!: string;
    project!: string;
    date_commissioned!: any;
    detail!: string;
    image!: string;
    isProject!: boolean;

    static associate(models: any) {
      // define association here
    }
  }
  Project.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    project: {
      type: DataTypes.STRING
    },
    date_commissioned: {
      type: DataTypes.DATE
    },
    detail: {
      type: DataTypes.STRING(20000)
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    isProject: {
      type: DataTypes.ENUM,
      values: ['active', 'pending'],
      defaultValue: 'active'
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};