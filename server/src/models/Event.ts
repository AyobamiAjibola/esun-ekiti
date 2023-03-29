import {Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {CreationOptional, InferAttributes, InferCreationAttributes} from 'sequelize/types';
import {
    UUIDV4
} from 'sequelize';

@Table({
    timestamps: true,
    tableName: 'events',
})

export default class Event extends Model<InferAttributes<Event>, InferCreationAttributes<Event>> {
    @PrimaryKey
    // @AutoIncrement
    @Column({type: DataType.UUID, field: 'event_id', allowNull: false, defaultValue: UUIDV4})
    declare id: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.STRING(20000))
    declare detail: string;

    @Column(DataType.ARRAY(DataType.STRING))
    declare image: string;

    @Column({type: DataType.ENUM, values: ['active', 'pending'], defaultValue: 'active'})
    declare isEvent: string;
  }