describe('recipes page', () => {
	it('should have a headerbar', () => {
		cy.visit('http://localhost:3000/recipes')
		cy.getByData('headerbar').should('exist')
	})
	it('should have a header with the correct text', () => {
		cy.visit('http://localhost:3000/recipes')
		cy.getByData('recipes-header').contains("Recipes")
	})
	it('should have a list of recipes', () => {
		cy.visit('http://localhost:3000/recipes')
		cy.getByData('recipe-list').should('exist')
	})
})