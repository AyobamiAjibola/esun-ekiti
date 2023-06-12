import {Column, DataType, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute} from 'sequelize/types';
import {
    UUIDV4
} from 'sequelize';
import CommentNews from './CommentNews';

@Table({
    timestamps: true,
    tableName: 'news',
})

export default class News extends Model<InferAttributes<News>, InferCreationAttributes<News>> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        field: 'news_id',
        allowNull: false,
        defaultValue: UUIDV4
    })
    declare id: CreationOptional<string>;

    @Column(DataType.STRING(20000))
    declare news: string;

    @Column({type: DataType.ENUM, values: ['active', 'pending'], defaultValue: 'pending'})
    declare status: string;

    @Column(DataType.STRING)
    declare title: string;

    @Column(DataType.STRING)
    declare videoLink: string;

    @Column(DataType.STRING)
    declare videoTitle: string;

    @Column(DataType.ARRAY(DataType.STRING))
    declare image: string;

    @HasMany(() => CommentNews)
    declare comments: NonAttribute<CommentNews[]>;

  }