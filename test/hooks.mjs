// test/hooks.ts

import { dropTables } from "../scripts/drop.mjs";
import { migrateTables } from "../scripts/migrate.mjs";


export const mochaHooks = {
  beforeAll: async  function () {
    // global setup for all tests
		// each file should connect to the client and the end of the file should close the client
		await dropTables();
		await migrateTables();
		console.log("finished beforeAll, hopefully client is closed")

  },
  afterAll: async function () {
    // one-time final cleanup
		await dropTables();

  }
};