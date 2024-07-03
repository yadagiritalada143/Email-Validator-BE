import fs from 'fs';
import path from 'path';
import sequelize from '../config/databaseConfig';
    
fs.readFile(path.join(__dirname, '../scripts/updateScripts.sql'), 'utf8', (err, sql) => {
    if (err) {
        console.error('Failed to read file:', err);
        process.exit(1);
    }

    sequelize
        .authenticate()
        .then(() => {
            console.info('Database connection has been established successfully.');
            return sequelize.sync({ alter: true });
        })
        .then(() => {
            console.info('Models synced successfully.');
            return sequelize.query(sql);
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