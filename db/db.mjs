// // db file sets up connection to the database
// import pkg from 'pg';
// const { Pool, Client } = pkg;

// // process.env.parameter_name is used to access the environment variables

// export const pool = new Pool({
//   user: 'synthesisdev',
//   host: 'localhost',
//   database: 'practice',
//   port: 5432,
// 	idleTimeoutMillis: 2000,
// });


// export const testPool = new Pool({
//   user: 'synthesisdev',
//   host: 'localhost',
//   database: 'test_practice',
//   port: 5432,
// 	max: 1,
// 	idleTimeoutMillis: 1000,
// });