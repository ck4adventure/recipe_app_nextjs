import { pool } from '../scripts/db.js';

const setupDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL
    );
  `);

  console.log('Database setup complete.');
};

setupDb();