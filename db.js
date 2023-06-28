const { Pool } = require('pg');

let pool;

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  console.log('Connected to production database');
} else {
  pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'docker',
    port: 5432,
  });
  console.log('connected to local database');
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