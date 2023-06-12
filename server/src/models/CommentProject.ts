import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute} from 'sequelize/types';
import Project from './Project';
import Reply from './Reply';

@Table({
    timestamps: true,
    tableName: 'commentProjects',
    paranoid: true,
})

export default class CommentProject extends Model<InferAttributes<CommentProject>, InferCreationAttributes<CommentProject>> {
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

    @BelongsTo(() => Project, { onDelete: 'CASCADE' })
    declare project: NonAttribute<Project>;

    @HasMany(() => Reply)
    declare replies: NonAttribute<Reply[]>;

    @ForeignKey(() => Project)
    @Column(DataType.UUID)
    declare projectId: string;
}