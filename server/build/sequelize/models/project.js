'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
;
module.exports = (sequelize, DataTypes) => {
    class Project extends sequelize_1.Model {
        static associate(models) {
        }
    }
    Project.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        project: {
            type: DataTypes.STRING
        },
        date_commissioned: {
            type: DataTypes.DATE
        },
        detail: {
            type: DataTypes.STRING(20000)
        },
        image: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        isProject: {
            type: DataTypes.ENUM,
            values: ['active', 'pending'],
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'Project',
    });
    return Project;
};
//# sourceMappingURL=project.js.map