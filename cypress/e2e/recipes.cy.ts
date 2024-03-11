describe('recipes page', () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/recipes")
	})
	context('HeaderBar', () => {
		it('should have a headerbar', () => {
			cy.getByData('headerbar').should('exist')
		})
		it('should have a header with the correct text', () => {
			cy.getByData('recipes-header').contains("Recipes")
		})
	});
	// it('should have a list of recipes', () => {
	// 	cy.visit('http://localhost:3000/recipes')
	// 	cy.getByData('recipe-list').should('exist')
	// })
	context('Main section', () => {
		it('should display recipes by category', () => {
			cy.getByData('recipe-categories').should('exist')
		})
	});

})