import mysql from 'mysql2/promise';
/**
 * mysql2/promise  because we use async await syntax
 */

let connection;

export const connectToDatabase = async () => {
    if (!connection) {
        try {
            connection = await mysql.createConnection({
                host: process.env.DB_Host,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });

            console.log('Successfully connected to the database!');
        } catch (error) {
            console.error('Error while connecting to the database: ', error.message);
        }
    }
    return connection;
};
