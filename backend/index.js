const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'portfolio'
});

app.get('/api/projects', (req, res) => {
    const sql = 'SELECT * FROM projects';
    db.query(sql, (err, result) => {
        if (err) res.status(500).send(err);
        res.send(result);
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
