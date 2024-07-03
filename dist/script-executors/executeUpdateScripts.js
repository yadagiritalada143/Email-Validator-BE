"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const databaseConfig_1 = __importDefault(require("../config/databaseConfig"));
fs_1.default.readFile(path_1.default.join(__dirname, '../scripts/updateScripts.sql'), 'utf8', (err, sql) => {
    if (err) {
        console.error('Failed to read file:', err);
        process.exit(1);
    }
    databaseConfig_1.default
        .authenticate()
        .then(() => {
        console.info('Database connection has been established successfully.');
        return databaseConfig_1.default.sync({ alter: true });
    })
        .then(() => {
        console.info('Models synced successfully.');
        return databaseConfig_1.default.query(sql);
    })
        .then(() => {
        console.info('Script executed successfully.');
        process.exit(0);
    })
        .catch((error) => {
        console.error('Error occurred: ', error);
        process.exit(1);
    });
});
