const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '', 
    database: 'konyvtar'
});

app.get('/konyvek', (req, res) => {
    const query = 'SELECT szerzo, cim, mufaj FROM konyvek'; 
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Hiba a lekérdezés során');
        } else {
            res.json(results);
        }
    });
});

app.get('/olvasok', (req, res) => {
    const query = 'SELECT nev, osztaly FROM kolcsonzes'; 
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Hiba a lekérdezés során');
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`A szerver fut: http://localhost:${port}`);
});