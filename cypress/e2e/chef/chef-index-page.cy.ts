describe('Chef Index Page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/chef');
	});
	context('layout', () => {
		it('displays a link for ingredients', () => {
			cy.getByData('ingredients-link').should('exist');
		});
		it('displays a link for recipes', () => {
			cy.getByData('recipes-link').should('exist');
		});
	})
});