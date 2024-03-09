import { cache } from 'react'
import * as db from '../../../db/index.mjs'
 
export const getRecipeTitles = cache(async () => {
  // wraps pool.query(text, params, callback) in a promise
  const result = await db.query('SELECT * FROM recipes')
  return result
})