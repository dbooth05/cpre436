const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create a new Express application
const app = express();

// Use CORS and body-parser middleware
app.use(cors());
app.use(bodyParser.json());

// Create a connection to the database
const db = mysql.createConnection({
  host: '61.14.60.1:3306',
  user: 'cpre436',
  password: 'cpre436',
  database: 'accounts'
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Define the /login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }

    if (results.length > 0) {
      return res.json({ message: 'Login successful' });
    } else {
      return res.json({ message: 'Invalid username or password' });
    }
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
