const mysql = require('mysql');

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: process.env.CONF_IP,
    user: 'felix',
    password: '123456789',
    database: 'db_escuela_ide'
});

// Conectar a la base de datos MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a MySQL: ', err);
        throw err;
    }
    console.log('Conexión a MySQL establecida');
});

module.exports = connection;
