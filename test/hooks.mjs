// test/hooks.ts

import { dropTables } from "../db/utils/drop.mjs";
import { migrateTables } from "../db/utils/migrate.mjs";

// note testPool has a maxClient of 1 and a timeout of 1 sec
import { testPool } from "../db/db.mjs";



export const mochaHooks = {
  beforeAll: async  function () {
    // global setup for all tests
		await dropTables(testPool);
		await migrateTables(testPool);
		console.log("finished beforeAll")

  },
  afterAll: async function () {
    // one-time final cleanup
		await dropTables(testPool);
		await testPool.end();

  }
};