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
    const query = 'SELECT konyv_id, szerzo, cim, mufaj FROM konyvek';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Hiba a lekérdezés során');
        } else {
            res.json(results);
        }
    });
});

app.post('/ujkonyv', (req, res) => {
    const { szerzo, cim, mufaj } = req.body;
    const query = "INSERT INTO konyvek (szerzo, cim, mufaj) VALUES (?, ?, ?)";
    
    db.query(query, [szerzo, cim, mufaj], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Hiba a könyv mentése során");
        } else {
            res.status(200).send("Könyv sikeresen mentve");
        }
    });
});
app.delete('/torles/:id', (req, res) => {
    const id = req.params.id;

    // Először töröljük a kapcsolótáblából is!
    const torlesKapcsolo = "DELETE FROM konyvek_kolcsonzes WHERE kolcsonzes_id = ?";
    const torlesKolcsonzes = "DELETE FROM kolcsonzes WHERE kolcsonzes_id = ?";

    db.query(torlesKapcsolo, [id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Hiba a törlés során (kapcsoló tábla)");
        } else {
            db.query(torlesKolcsonzes, [id], (err2) => {
                if (err2) {
                    console.error(err2);
                    res.status(500).send("Hiba a törlés során (kolcsonzes tábla)");
                } else {
                    res.status(200).send("Kölcsönzés törölve (könyv visszahozva)");
                }
            });
        }
    });
});
app.post('/ujkolcsonzes', (req, res) => {
    const { nev, osztaly, konyv_id } = req.body;
    
    const beszurKolcsonzes = 
        "INSERT INTO kolcsonzes (nev, osztaly, datum) VALUES (?, ?, CURDATE())";
    const beszurKapcsolo = 
        "INSERT INTO konyvek_kolcsonzes (kolcsonzes_id, konyv_id, datum) VALUES (?, ?, CURDATE())";

    db.query(beszurKolcsonzes, [nev, osztaly], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Hiba a kölcsönzés létrehozásakor");
        } else {
            const kolcsonzes_id = result.insertId;

            db.query(beszurKapcsolo, [kolcsonzes_id, konyv_id], (err2) => {
                if (err2) {
                    console.error(err2);
                    res.status(500).send("Hiba a könyv hozzárendelésekor");
                } else {
                    res.status(200).send("Kölcsönzés rögzítve");
                }
            });
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