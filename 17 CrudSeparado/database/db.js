const mysql2 = require ('mysql2');

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'cursosdb'
});

db.connect((error) => {
    if (error) {
        console.log('Error de conexion a la base de datos:', error.stack);
        return;
    }
    console.log('Conectado a la base de datos Mysql')
});

module.exports = db;