import {Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {CreationOptional, InferAttributes, InferCreationAttributes} from 'sequelize/types';
import {
    UUIDV4
} from 'sequelize';

@Table({
    timestamps: true,
    tableName: 'chiefs',
})

export default class Chief extends Model<InferAttributes<Chief>, InferCreationAttributes<Chief>> {
    @PrimaryKey
    // @AutoIncrement
    @Column({type: DataType.UUID, field: 'chief_id', allowNull: false, defaultValue: UUIDV4})
    declare id: CreationOptional<string>;

    @Column(DataType.STRING)
    declare fullName: string;

    @Column(DataType.STRING)
    declare title: string;

    @Column(DataType.STRING(1000))
    declare bio: string;

    @Column(DataType.STRING)
    declare image: string;

    @Column(DataType.STRING)
    declare duties: string;

    @Column(DataType.INTEGER)
    declare position: number;
  }