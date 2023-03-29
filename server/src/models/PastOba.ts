import {Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {CreationOptional, InferAttributes, InferCreationAttributes} from 'sequelize/types';
import {
    UUIDV4
} from 'sequelize';

@Table({
    timestamps: true,
    tableName: 'pastobas',
})

export default class PastOba extends Model<InferAttributes<PastOba>, InferCreationAttributes<PastOba>> {
    @PrimaryKey
    // @AutoIncrement
    @Column({type: DataType.UUID, field: 'pastoba_id', allowNull: false, defaultValue: UUIDV4})
    declare id: CreationOptional<string>;

    @Column(DataType.STRING)
    declare fullName: string;

    @Column(DataType.STRING)
    declare from: string;

    @Column(DataType.STRING)
    declare to: string;

    @Column(DataType.STRING)
    declare position: string;
  }