describe('Category Index', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/recipes/category/breakfast');
	});
	context('layout', () => {
		it('displays the category name', () => {
			cy.getByData('category-name').should('exist');
		});
		it('has a list of recipes', () => {
			cy.getByData('recipes-list').should('exist');
		});
		it('has at least one recipe', () => {
			cy.getByData('recipe-link').should('exist');
		});
		it('should have a link to add a recipe', () => {
			cy.getByData('add-recipe-link').should('exist');
		});
	})
});