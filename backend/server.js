const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '', 
    database: 'konyvtar'
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`A szerver fut: http://localhost:${PORT}`);
});