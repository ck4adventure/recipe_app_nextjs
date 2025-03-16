describe('Chefs Ingrs Index Page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/chef/ingrs');
	});
	context('layout', () => {
		it('has a main page called ingrs', () => {
			cy.getByData('chef-ingrs-index').should('exist');
		})
		it('fills the main section with a listing of recipes grouped by category', () => {
			cy.getByData('chef-ingrs-by-category').should('exist');
		})
		it('there is at least one category displayed', () => {
			cy.getByData('chef-ingrs-by-category').children().should('have.length.at.least', 1);
			cy.getByData('chef-ingrs-by-category').children().first().getByData('category-section').should('exist');
		})
		it('each ingr displayed should have a ingr item with a link and a title', () => {
			cy.getByData('ingr-item').should('exist');
			cy.getByData('ingr-item').children().getByData('ingr-link').should('exist');
			cy.getByData('ingr-item').children().getByData('ingr-packaged-name').should('exist');
		})
	})
});