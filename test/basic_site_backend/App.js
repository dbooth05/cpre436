// app.js (or your main server file)
const express = require('express');
const bodyParser = require('body-parser'); // For parsing form data
const db = require('./db'); // Your MySQL connection

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Handle user registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Validate input (you can add more validation here)
    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    } else {


        res.send('success')
    }

    // Save user info to the database (use proper hashing for passwords)
    // Example: INSERT INTO users (username, password) VALUES (?, ?)
    // ...

    // res.send('User registered successfully.');
});

// Other routes (login, profile, etc.) can be added similarly

// handle user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // validate input
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    } else {


        res.send('success')
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
