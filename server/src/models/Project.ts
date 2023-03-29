import {Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {CreationOptional, InferAttributes, InferCreationAttributes} from 'sequelize/types';
import {
    UUIDV4
} from 'sequelize';

@Table({
    timestamps: true,
    tableName: 'projects',
})

export default class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
    @PrimaryKey
    // @AutoIncrement
    @Column({type: DataType.UUID, field: 'project_id', allowNull: false, defaultValue: UUIDV4})
    declare id: CreationOptional<string>;

    @Column(DataType.STRING)
    declare project: string;

    @Column(DataType.STRING)
    declare date_commissioned: string;

    @Column(DataType.STRING(20000))
    declare detail: string;

    @Column(DataType.ARRAY(DataType.STRING))
    declare image: string;

    @Column({type: DataType.ENUM, values: ['active', 'pending'], defaultValue: "active"})
    declare isProject: string;
  }