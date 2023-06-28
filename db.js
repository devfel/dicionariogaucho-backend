const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'docker',
    port: 5432,
});

/*
//     "type": "postgres",
//     "host": "localhost",
//     "port": 5432,
//     "username": "postgres",
//     "password": "docker",
//     "database": "rper_database",
*/

pool.query(`
  CREATE TABLE IF NOT EXISTS words (
    id SERIAL PRIMARY KEY,
    word TEXT NOT NULL,
    meaning TEXT NOT NULL
  )
`, (err) => {
    if (err) {
        console.error(err);
    }
});

module.exports = pool;