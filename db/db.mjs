
import { Pool, Client } from 'pg';

export const pool = new Pool({
  user: 'synthesisdev',
  host: 'localhost',
  database: 'practice',
  port: 5432,
});

export const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'practice',
  user: 'synthesisdev',
})