// db.js
const mysql = require('mysql');

const dbConfig = {
    host: '61.14.60.1:3306',
    user: 'root',
    password: 'cpre436',
    database: 'cpre436',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

module.exports = connection;
