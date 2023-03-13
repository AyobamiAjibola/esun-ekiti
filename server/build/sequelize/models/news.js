'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
;
module.exports = (sequelize, DataTypes) => {
    class News extends sequelize_1.Model {
        static associate(models) {
        }
    }
    News.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        news: {
            type: DataTypes.STRING(20000)
        },
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'pending'],
            defaultValue: 'pending'
        },
        title: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    }, {
        sequelize,
        modelName: 'News',
    });
    return News;
};
//# sourceMappingURL=news.js.map