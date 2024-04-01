describe('Sources Index Page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/recipes/sources');
	});
	context('layout', () => {
		it('displays a header section', () => {
			cy.getByData('sources-header').should('exist');
		});
		it('displays a list of books', () => {
			cy.getByData('sources-list-books').should('exist');
		});
		it('displays a list of sites', () => {
			cy.getByData('sources-list-sites').should('exist');
		});
		it('displays a list of books', () => {
			cy.getByData('sources-list-collections').should('exist');
		});
	})
});