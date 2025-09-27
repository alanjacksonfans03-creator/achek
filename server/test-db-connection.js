// Simple Node.js script to test MySQL connection using .env credentials
require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1);
  } else {
    console.log('✅ MySQL connection successful!');
    connection.query('SHOW TABLES;', (err, results) => {
      if (err) {
        console.error('❌ Query failed:', err.message);
      } else {
        console.log('Tables:', results);
      }
      connection.end();
    });
  }
});
