// Recipes Detail Page Tests
// layout
// it should display a header section
// it should display a header with the recipe title
// it should display a header with the recipe category
// it should display a recipe detail section

describe('Recipes Detail Page', () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/recipes/pancakes")
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
		it('should display a steps section', () => {
			cy.getByData('recipe-detail-steps').should('exist')
		});
		it('should have a recipe steps section', () => {
			cy.getByData('recipe-detail-steps').should('exist')
		});
		it('should have an update recipe button', () => {
			cy.getByData('recipe-detail-update-button').should('exist')
		});
		it('should have a delete button', () => {
			cy.getByData('recipe-detail-delete-button').should('exist')
		});
	});
	context('ingredients section', () => {
		it('should display a ingredients header', () => {
			cy.getByData('recipe-detail-ingredients-header').should('exist')
		});
		it('should display a list of ingredients', () => {
			cy.getByData('recipe-detail-ingredients-list').should('exist')
		});
		it('should have a least one ingredient', () => {
			cy.getByData('recipe-detail-ingredients').should('exist')
		});
	});
	context('steps section', () => {
		it('should display a steps header', () => {
			cy.getByData('recipe-detail-steps-header').should('exist')
		});
		it('should display a list of steps', () => {
			cy.getByData('recipe-detail-steps-list').should('exist')
		});
		it('should have a least one direction', () => {
			cy.getByData('recipe-detail-step').should('exist')
		});
	});
});