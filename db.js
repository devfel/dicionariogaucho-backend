const { Pool } = require('pg');

let pool;

if (process.env.NODE_PROD === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} else {
  pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'docker',
    port: 5432,
  });
}

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