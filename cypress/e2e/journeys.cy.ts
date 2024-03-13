// journeys is a collection of tests that re-create the steps a user would take to accomplish a task.
describe('User Journeys', () => {
	it('a user can find the add recipe button and successfully add a recipe', () => {
		cy.visit("http://localhost:3000/recipes")
		cy.getByData('add-recipe-button').click()
		cy.location("pathname").should("equal", "/add-recipe")
		// recipe form has fields for the recipe title and a select dropdown to choose its category
		cy.getByData('add-recipe-form').should('exist')
		cy.getByData('recipe-title-input').should('exist')
		cy.getByData('recipe-category-select').should('exist')
		cy.getByData('submit-recipe-button').should('exist')
		// user can fill out the form and submit
		cy.getByData('recipe-title-input').type('Test Recipe')
		cy.getByData('recipe-category-select').select('Breakfast')
		cy.getByData('submit-recipe-button').click()
		// on successful submit, user is redirected to the recipes page
		cy.location("pathname").should("equal", "/recipes")
		// the recipe should be displayed on the recipes page
		cy.getByData('recipe-card').should('exist')
		cy.getByData('recipe-card').contains('Test Recipe')
	})
})