import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';
import {CreationOptional, InferAttributes, InferCreationAttributes} from 'sequelize/types';

@Table({
    timestamps: true,
    tableName: 'usertokens',
})

export default class UserToken extends Model<InferAttributes<UserToken>, InferCreationAttributes<UserToken>> {
    @PrimaryKey
    @AutoIncrement
    @Column({type: DataType.INTEGER, allowNull: false})
    declare id: CreationOptional<number>;

    @Column({type: DataType.STRING, allowNull: false})
    declare UserId: string;

    @Column({type: DataType.STRING, allowNull: false})
    declare token: string;

    @Column(DataType.DATE)
    declare expired_at: Date;
  }