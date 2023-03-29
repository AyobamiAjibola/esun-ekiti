import {Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {CreationOptional, InferAttributes, InferCreationAttributes} from 'sequelize/types';
import {
    UUIDV4
} from 'sequelize';

@Table({
    timestamps: true,
    tableName: 'news',
})

export default class News extends Model<InferAttributes<News>, InferCreationAttributes<News>> {
    @PrimaryKey
    // @AutoIncrement
    @Column({type: DataType.UUID, field: 'news_id', allowNull: false, defaultValue: UUIDV4})
    declare id: CreationOptional<string>;

    @Column(DataType.STRING(20000))
    declare news: string;

    @Column({type: DataType.ENUM, values: ['active', 'pending'], defaultValue: 'pending'})
    declare status: string;

    @Column(DataType.STRING)
    declare title: string;

    @Column(DataType.ARRAY(DataType.STRING))
    declare image: string;
  }