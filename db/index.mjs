import { pool } from './db.mjs'; 
 
export const query = async (text, params, callback) => {
  return await pool.query(text, params, callback)
}