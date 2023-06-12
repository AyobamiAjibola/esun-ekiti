import {AutoIncrement, Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {CreationOptional, InferAttributes, InferCreationAttributes} from 'sequelize/types';
import {
    UUIDV4
} from 'sequelize';

@Table({
    timestamps: true,
    tableName: 'admins',
})

export default class Admin extends Model<InferAttributes<Admin>, InferCreationAttributes<Admin>> {
    @PrimaryKey
    // @AutoIncrement
    @Column({
        type: DataType.UUID,
        field: 'admin_id',
        allowNull: false,
        defaultValue: UUIDV4
    })
    declare id: CreationOptional<string>;

    @Column(DataType.STRING)
    declare fullName: string;

    @Column(DataType.STRING)
    declare phone_num: string;

    @Column({type: DataType.BOOLEAN, defaultValue: true})
    declare isAdmin: boolean;

    @Column({type: DataType.ENUM, values: ['admin', 'user']})
    declare user_type: string;

    @Column(DataType.STRING)
    declare password: string;

    @Column(DataType.STRING)
    declare confirm_password: string;
  }