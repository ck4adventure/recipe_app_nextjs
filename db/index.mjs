import { pool } from './db.mjs';

export const query = async (text, params) => {
	const res = await pool.query(text, params);
	return res.rows
}

export const loggedQuery = async (text, params) => {
	const start = Date.now()
	const res = await pool.query(text, params);
	const duration = Date.now() - start
	console.log('executed query', { text, duration, rows: res.rowCount })
	return res.rows
}