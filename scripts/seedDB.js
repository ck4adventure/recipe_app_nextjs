import { pool } from '../scripts/db.js';

const seedDB = async () => {
	console.log("begin seeding db")
	await pool.query(`
    INSERT INTO recipes (title) VALUES
    ('Meringue Puffs'),
    ('Raspberry Tartlets'),
    ('Chocolate Ganache')
  `);

	console.log('db seeding complete');
};

seedDB();