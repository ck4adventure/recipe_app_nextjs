// Recipes Detail Page Tests
// layout
// it should display a header section
// it should display a header with the recipe title
// it should display a header with the recipe category
// it should display a recipe detail section

describe('Recipes Detail Page', () => {
	context('layout', () => {
		it('should display a header section', () => {
			cy.getByData('recipe-detail-header').should('exist')
		});
		it('should display a header with the recipe title', () => {
			cy.getByData('recipe-detail-title').should('exist')
		});
		it('should display a header with the recipe category', () => {
			cy.getByData('recipe-detail-category').should('exist')
		});
		it('should display a recipe detail section', () => {
			cy.getByData('recipe-detail-section').should('exist')
		});
		it('recipe detail section should have a left and right margin of 12', () => {
			cy.getByData('recipe-detail-section').should('have.css', 'margin-left', '12px')
			cy.getByData('recipe-detail-section').should('have.css', 'margin-right', '12px')
		});
	});
});