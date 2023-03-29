import {Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {CreationOptional, InferAttributes, InferCreationAttributes} from 'sequelize/types';
import {
    UUIDV4
} from 'sequelize';

@Table({
    timestamps: true,
    tableName: 'obas',
})

export default class Oba extends Model<InferAttributes<Oba>, InferCreationAttributes<Oba>> {
    @PrimaryKey
    // @AutoIncrement
    @Column({type: DataType.UUID, field: 'oba_id', allowNull: false, defaultValue: UUIDV4})
    declare id: CreationOptional<string>;

    @Column(DataType.STRING)
    declare fullName: string;

    @Column(DataType.STRING)
    declare from: string;

    @Column(DataType.STRING(1000))
    declare bio: string;

    @Column(DataType.STRING)
    declare image: string;

    @Column(DataType.STRING)
    declare to: string;

    @Column({type: DataType.STRING, defaultValue: 'elesun'})
    declare oba: string;
  }