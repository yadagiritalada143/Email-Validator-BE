"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const databaseConfig_1 = __importDefault(require("../config/databaseConfig"));
class UserModel extends sequelize_1.Model {
}
UserModel.init({
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: false
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    mobileNumber: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    userRole: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: databaseConfig_1.default,
    tableName: 'users',
});
exports.default = UserModel;
