import { pool } from './db.mjs'; 
 
export const query = async (text, params) => {
  const res = await pool.query(text, params);
  return res
}