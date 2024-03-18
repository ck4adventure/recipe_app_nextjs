// test/hooks.ts
import { client } from '../db.mjs';
export const mochaHooks = {
  beforeEach: async  function () {
    // global setup for all tests
		// create a new client
		// and setup database
		await client.connect();
		// create tables
		// insert data
		

  },
  afterAll: async function () {
    // one-time final cleanup
		// drop the tables
		// close the client
		await client.end();
  }
};