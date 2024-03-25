// db file sets up connection to the database
import pkg from 'pg';
const { Pool, Client } = pkg;

export const pool = new Pool({
  user: 'synthesisdev',
  host: 'localhost',
  database: 'practice',
  port: 5432,
});


export const testPool = new Pool({
  user: 'synthesisdev',
  host: 'localhost',
  database: 'test_practice',
  port: 5432,
	max: 1,
	idleTimeoutMillis: 1000,
});