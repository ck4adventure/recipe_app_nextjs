import { pool } from './db.js'; 
 
export const query = (text, params, callback) => {
  return pool.query(text, params, callback)
}