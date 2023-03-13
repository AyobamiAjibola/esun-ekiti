'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
;
module.exports = (sequelize, DataTypes) => {
    class Event extends sequelize_1.Model {
        static associate(models) {
        }
    }
    Event.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        detail: {
            type: DataTypes.STRING(20000)
        },
        image: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        isEvent: {
            type: DataTypes.ENUM,
            values: ['active', 'pending'],
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'Event',
    });
    return Event;
};
//# sourceMappingURL=event.js.map