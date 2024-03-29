// recipe source
// id: PK
// recipe_id: FK recipe.id
// source_id: FK source.id
// page: string, null OK
// unique constraint on recipe_id and source_id

import { expect } from 'chai';
import { testPool } from '../../db/db.mjs';

describe('recipe source', () => {
	context('columns', () => {
		it('has an id column which is the primary key', async () => {
			const result = await testPool.query(`
				SELECT column_name, column_default, is_nullable, data_type
				FROM information_schema.columns
				WHERE table_name = 'recipe_source'
			`);
			const idColumn = result.rows.find((row) => row.column_name === 'id');
			expect(idColumn).to.exist;
			expect(idColumn.column_default).to.match(/nextval\('recipe_source_id_seq'::regclass/);
			expect(idColumn.is_nullable).to.equal('NO');
			expect(idColumn.data_type).to.equal('integer');
		});
		it('has a recipe_id column which is a foreign key', async () => {
			const result = await testPool.query(`
				SELECT column_name, column_default, is_nullable, data_type
				FROM information_schema.columns
				WHERE table_name = 'recipe_source'
			`);
			const recipeIdColumn = result.rows.find((row) => row.column_name === 'recipe_id');
			expect(recipeIdColumn).to.exist;
			expect(recipeIdColumn.column_default).to.be.null;
			expect(recipeIdColumn.is_nullable).to.equal('NO');
			expect(recipeIdColumn.data_type).to.equal('integer');
		});
		it('has a source_id column which is a foreign key', async () => {
			const result = await testPool.query(`
				SELECT column_name, column_default, is_nullable, data_type
				FROM information_schema.columns
				WHERE table_name = 'recipe_source'
			`);
			const sourceIdColumn = result.rows.find((row) => row.column_name === 'source_id');
			expect(sourceIdColumn).to.exist;
			expect(sourceIdColumn.column_default).to.be.null;
			expect(sourceIdColumn.is_nullable).to.equal('NO');
			expect(sourceIdColumn.data_type).to.equal('integer');
		});
		it('has a page column which is a string', async () => {
			const result = await testPool.query(`
				SELECT column_name, column_default, is_nullable, data_type
				FROM information_schema.columns
				WHERE table_name = 'recipe_source'
			`);
			const pageColumn = result.rows.find((row) => row.column_name === 'page');
			expect(pageColumn).to.exist;
			expect(pageColumn.column_default).to.be.null;
			expect(pageColumn.is_nullable).to.equal('YES');
			expect(pageColumn.data_type).to.equal('character varying');
		});
	});
	context('constraints', () => {
		it('has a unique constraint on recipe_id so taht it can only have one source', async () => {
			const result = await testPool.query(`
				SELECT constraint_name, constraint_type
				FROM information_schema.table_constraints
				WHERE table_name = 'recipe_source'
			`);
			const uniqueConstraint = result.rows.find((row) => row.constraint_type === 'UNIQUE');
			expect(uniqueConstraint).to.exist;
			expect(uniqueConstraint.constraint_name).to.match(/recipe_source_recipe_id_key/);
		});
	});
});