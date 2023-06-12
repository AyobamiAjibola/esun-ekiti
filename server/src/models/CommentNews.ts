import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import {CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute} from 'sequelize/types';
import News from './News';
import Reply from './Reply';

@Table({
    timestamps: true,
    tableName: 'commentNews',
    paranoid: true,
})

export default class CommentNews extends Model<InferAttributes<CommentNews>, InferCreationAttributes<CommentNews>> {
    @Column({
        type: DataType.INTEGER,
        field: 'comment_id',
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: CreationOptional<number>
    
    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.STRING)
    declare comment: string;

    @Column(DataType.INTEGER)
    declare like: number;

    @Column(DataType.INTEGER)
    declare dislike: number;

    @BelongsTo(() => News, { onDelete: 'CASCADE' })
    declare news: NonAttribute<News>;

    @HasMany(() => Reply)
    declare replies: NonAttribute<Reply[]>;

    @ForeignKey(() => News)
    @Column(DataType.UUID)
    declare newsId: string;
}