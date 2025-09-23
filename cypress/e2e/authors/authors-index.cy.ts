describe('Authors Index Page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/blue-binder/recipes/authors');
	});
	context('layout', () => {
		it('displays a header section', () => {
			cy.getByData('authors-header').should('exist');
		});
		it('displays a list of authors', () => {
			cy.getByData('authors-list').should('exist');
		});
	})
});