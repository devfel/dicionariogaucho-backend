const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// CRUD operations will be here
//READ all words:
app.get('/words', (req, res) => {
    db.query('SELECT * FROM words ORDER BY word', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows);
    });
});

//CREATE a new word:
app.post('/words', (req, res) => {
    db.query('INSERT INTO words(word, meaning) VALUES($1, $2) RETURNING *', [req.body.word, req.body.meaning], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows[0]);
    });
});

//READ a single word:
app.get('/words/:id', (req, res) => {
    db.query('SELECT * FROM words WHERE id = $1', [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows[0]);
    });
});

//UPDATE a word:
app.put('/words/:id', (req, res) => {
    db.query('UPDATE words SET word = $1, meaning = $2 WHERE id = $3 RETURNING *', [req.body.word, req.body.meaning, req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result.rows[0]);
    });
});

//DELETE a word:
app.delete('/words/:id', (req, res) => {
    db.query('DELETE FROM words WHERE id = $1', [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({ changes: result.rowCount });
    });
});

