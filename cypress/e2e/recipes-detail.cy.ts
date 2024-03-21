// Recipes Detail Page Tests
// layout
// it should display a header section
// it should display a header with the recipe title
// it should display a header with the recipe category
// it should display a recipe detail section

describe('Recipes Detail Page', () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/recipes/1")
	})
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
		it('should display a ingredients section', () => {
			cy.getByData('recipe-detail-ingredients').should('exist')
		});
		it('should have a recipe directions section', () => {
			cy.getByData('recipe-detail-directions').should('exist')
		});
	});
});