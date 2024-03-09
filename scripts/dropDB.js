import { pool } from '../scripts/db.js';

const dropDB = async () => {
	await pool.query(`
	DROP TABLE IF EXISTS recipes;
  `);
  console.log('Database dropped.');
}

dropDB();