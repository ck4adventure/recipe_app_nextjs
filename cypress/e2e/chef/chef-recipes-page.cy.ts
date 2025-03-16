describe('Chefs Recipes Index Page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/chef/recipes');
	});
	context('layout', () => {
		it('has a main page called chef-reipes', () => {
			cy.getByData('chef-recipes').should('exist');
		})
		it('fills the main section with a listing of recipes grouped by category', () => {
			cy.getByData('chef-recipes-by-category').should('exist');
		})
		it('there is at least one category displayed', () => {
			cy.getByData('chef-recipes-by-category').children().should('have.length.at.least', 1);
		})
		it('each category displayed should have a recipe item with a link and a title', () => {
			cy.getByData('recipe-item').should('exist');
			cy.getByData('recipe-item').children().getByData('recipe-link').should('exist');
			cy.getByData('recipe-item').children().getByData('recipe-title').should('exist');
		})
	})
});