import {Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {CreationOptional, InferAttributes, InferCreationAttributes} from 'sequelize/types';
import {
    UUIDV4
} from 'sequelize';

@Table({
    timestamps: true,
    tableName: 'histories',
})

export default class History extends Model<InferAttributes<History>, InferCreationAttributes<History>> {
    @PrimaryKey
    // @AutoIncrement
    @Column({type: DataType.UUID, field: 'history_id', allowNull: false, defaultValue: UUIDV4})
    declare id: CreationOptional<string>;

    @Column(DataType.STRING(10000))
    declare history: string;

    @Column(DataType.ARRAY(DataType.STRING))
    declare image: string;

    @Column({type: DataType.STRING, defaultValue: 'esun'})
    declare esun: string;
  }