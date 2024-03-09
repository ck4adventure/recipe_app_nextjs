import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'synthesisdev',
  host: 'localhost',
  database: 'practice',
  port: 5432,
});