import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
//Si vamos a tener una db en servidor
//import {fileURLToPath} from 'url';
//import {dirname, join} from 'path';
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
 //Si usamos un archivo local para la db
    //socketPath: join(__dirname, 'path_to_your_socket_file')

const config = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',        
    password: process.env.DB_PASSWORD || 'n0m3l0',    
    database: process.env.DB_NAME || 'curso', 
    //conectionLimit: 10
    //acquireTimeout: 10000
    //idleTimeout: 10000
});
config.getConnection((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
    conection.release();
});

export default pool;