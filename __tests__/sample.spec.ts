// need to import jest expect 
import { expect as jestExpect } from '@jest/globals';

describe('sample test', () => {
	it('should pass', () => {
		jestExpect(true).toBeTruthy();
	});
});