// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');

// const dbPath = path.resolve(__dirname, 'database.sqlite');

// const db = new sqlite3.Database(dbPath, (err) => {
//     if (err) {
//         console.error('Database connection error:', err.message);
//     } else {
//         console.log('Connected to SQLite database.');
//     }
// });

// module.exports = db;
const { Pool } = require('pg');

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: process.env.NODE_ENV === 'production'
//     ? { rejectUnauthorized: false }
//     : false
// });
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;
