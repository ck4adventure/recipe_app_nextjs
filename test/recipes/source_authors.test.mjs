// source authors
// id, PK
// source_id, FK source.id
// author_id, FK author.id
// would like to somehow ensure that if source_type is PERSONAL, then only one author is allowed
import { expect } from 'chai';
import { testPool } from '../../db/db.mjs';

describe('source authors', () => {
	afterEach(async () => {
		await testPool.query('DELETE FROM source_authors');
	});
	context('columns', () => {
		it('has an id column which is the primary key', async () => {
			const result = await testPool.query(`
				SELECT column_name, column_default, is_nullable, data_type
				FROM information_schema.columns
				WHERE table_name = 'source_authors'
			`);
			const idColumn = result.rows.find((row) => row.column_name === 'id');
			expect(idColumn).to.exist;
			expect(idColumn.column_default).to.match(/nextval\('source_authors_id_seq'::regclass/);
			expect(idColumn.is_nullable).to.equal('NO');
			expect(idColumn.data_type).to.equal('integer');
		});
		it('has a source_id column which is a foreign key', async () => {
			const result = await testPool.query(`
				SELECT column_name, column_default, is_nullable, data_type
				FROM information_schema.columns
				WHERE table_name = 'source_authors'
			`);
			const sourceIdColumn = result.rows.find((row) => row.column_name === 'source_id');
			expect(sourceIdColumn).to.exist;
			expect(sourceIdColumn.column_default).to.be.null;
			expect(sourceIdColumn.is_nullable).to.equal('NO');
			expect(sourceIdColumn.data_type).to.equal('integer');
		});
		it('has an author_id column which is a foreign key', async () => {
			const result = await testPool.query(`
				SELECT column_name, column_default, is_nullable, data_type
				FROM information_schema.columns
				WHERE table_name = 'source_authors'
			`);
			const authorIdColumn = result.rows.find((row) => row.column_name === 'author_id');
			expect(authorIdColumn).to.exist;
			expect(authorIdColumn.column_default).to.be.null;
			expect(authorIdColumn.is_nullable).to.equal('NO');
			expect(authorIdColumn.data_type).to.equal('integer');
		});
	});
	context('constraints', () => {
		it('has a unique constraint on source_id and author_id', async () => {
			const result = await testPool.query(`
				SELECT constraint_name, constraint_type
				FROM information_schema.table_constraints
				WHERE table_name = 'source_authors'
			`);
			const uniqueConstraint = result.rows.find((row) => row.constraint_type === 'UNIQUE');
			expect(uniqueConstraint).to.exist;
			expect(uniqueConstraint.constraint_name).to.match(/source_authors_source_id_author_id_key/);
		});
	});
context('when an author is deleted', () => {
		it('should delete the source_author entry', async () => {
			// create an author
			const authorResult = await testPool.query('INSERT INTO authors (first_name, last_name, is_profi) VALUES ($1, $2, $3) RETURNING id', ['delete', 'me', false]);
			const authorId = authorResult.rows[0].id;
			// create a source
			const sourceResult = await testPool.query('INSERT INTO sources (source_type, title, source_url) VALUES ($1, $2, $3) RETURNING id', ['BOOK', 'delete me', 'http://delete.me']);
			const sourceId = sourceResult.rows[0].id;
			// create a source_author entry
			await testPool.query('INSERT INTO source_authors (source_id, author_id) VALUES ($1, $2)', [sourceId, authorId]);
			// delete the author
			await testPool.query('DELETE FROM authors WHERE id = $1', [authorId]);
			// check that the source_author entry was deleted
			const sourceAuthorResult = await testPool.query('SELECT * FROM source_authors WHERE source_id = $1 AND author_id = $2', [sourceId, authorId]);
			expect(sourceAuthorResult.rows).to.be.empty;
		});
	});
	context('when a source is deleted', () => {
		it('should delete the source_author entry', async () => {
			// create an author
			const authorResult = await testPool.query('INSERT INTO authors (first_name, last_name, is_profi) VALUES ($1, $2, $3) RETURNING id', ['delete', 'me', false]);
			const authorId = authorResult.rows[0].id;
			// create a source
			const sourceResult = await testPool.query('INSERT INTO sources (source_type, title, source_url) VALUES ($1, $2, $3) RETURNING id', ['BOOK', 'delete me', 'http://delete.me']);
			const sourceId = sourceResult.rows[0].id;
			// create a source_author entry
			await testPool.query('INSERT INTO source_authors (source_id, author_id) VALUES ($1, $2)', [sourceId, authorId]);
			// delete the source
			await testPool.query('DELETE FROM sources WHERE id = $1', [sourceId]);
			// check that the source_author entry was deleted
			const sourceAuthorResult = await testPool.query('SELECT * FROM source_authors WHERE source_id = $1 AND author_id = $2', [sourceId, authorId]);
			expect(sourceAuthorResult.rows).to.be.empty;
		});
	});

});