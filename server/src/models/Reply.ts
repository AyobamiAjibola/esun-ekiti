import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute} from 'sequelize/types';
import Project from './Project';
import CommentNews from './CommentNews';
import CommentProject from './CommentProject';
import News from './News';

@Table({
    timestamps: true,
    tableName: 'replies',
    paranoid: true,
})

export default class Reply extends Model<InferAttributes<Reply>, InferCreationAttributes<Reply>> {
    @Column({
        type: DataType.INTEGER,
        field: 'reply_id',
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: CreationOptional<number>
    
    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.STRING)
    declare reply: string;

    @Column(DataType.INTEGER)
    declare like: number;

    @Column(DataType.INTEGER)
    declare dislike: number;

    @BelongsTo(() => CommentNews, { onDelete: 'CASCADE' })
    declare commentNews: NonAttribute<CommentNews>;

    @BelongsTo(() => CommentProject, { onDelete: 'CASCADE' })
    declare commentProject: NonAttribute<CommentProject>;

    @ForeignKey(() => CommentNews)
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare commentNewsId: number | null;

    @ForeignKey(() => CommentProject)
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare commentProjectId: number |  null;
}