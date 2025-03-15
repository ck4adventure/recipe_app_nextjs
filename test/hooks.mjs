// test/hooks.ts

import { dropLocalTables } from "../db/utils/local/drop.mjs";
import { migrateLocalTables } from "../db/utils/local/migrate.mjs";

// note testPool has a maxClient of 1 and a timeout of 1 sec
import { testPool } from "../db/db.mjs";



export const mochaHooks = {
  beforeAll: async  function () {
    // global setup for all tests
		await dropLocalTables(testPool);
		await migrateLocalTables(testPool);
		console.log("finished beforeAll")

  },
  afterAll: async function () {
    // one-time final cleanup
		await dropLocalTables(testPool);
		await testPool.end();

  }
};