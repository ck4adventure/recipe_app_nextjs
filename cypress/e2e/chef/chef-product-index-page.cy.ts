describe('Chef Index Page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/chef/products');
	});
	context('layout', () => {
		it('has a main section called products', () => {
			cy.getByData('chef-products-index').should('exist');
		});
		it('fills the main section with a listing of recipes grouped by category', () => {
			cy.getByData('chef-products-by-category').should('exist');
		})
		it('there is at least one category displayed', () => {
			cy.getByData('chef-products-by-category').children().should('have.length.at.least', 1);
		})
		it('each category displayed should have a recipe item with a link and a title', () => {
			cy.getByData('product-item').should('exist');
			cy.getByData('product-item').children().getByData('product-link').should('exist');
			cy.getByData('product-item').children().getByData('product-title').should('exist');
		})
	})
});