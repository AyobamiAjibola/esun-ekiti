import {Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {CreationOptional, InferAttributes, InferCreationAttributes} from 'sequelize/types';
import {
    UUIDV4
} from 'sequelize';

@Table({
    timestamps: true,
    tableName: 'oloris',
})

export default class Olori extends Model<InferAttributes<Olori>, InferCreationAttributes<Olori>> {
    @PrimaryKey
    // @AutoIncrement
    @Column({type: DataType.UUID, field: 'olori_id', allowNull: false, defaultValue: UUIDV4})
    declare id: CreationOptional<string>;

    @Column(DataType.STRING)
    declare fullName: string;

    @Column(DataType.STRING)
    declare image: string;

    @Column({type: DataType.STRING, defaultValue: "elesun"})
    declare olori: string;

    @Column(DataType.STRING(1000))
    declare duties: string;
  }