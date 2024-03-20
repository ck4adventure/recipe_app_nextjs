// journeys is a collection of tests that re-create the steps a user would take to accomplish a task.
describe('User Journeys', () => {
	it('a user can find the recipes page and see a list of recipes', () => {
		cy.visit("http://localhost:3000/recipes")
		cy.location("pathname").should("equal", "/recipes")
		cy.getByData('recipe-link').should('exist')
	});
	it('a user can click on a recipe and see its details', () => {
		cy.visit("http://localhost:3000/recipes")
		cy.getByData('recipe-link').first().click()
		cy.location("pathname").should("include", "/recipes/")
		cy.getByData('recipe-detail-title').should('exist')
		cy.getByData('recipe-detail-category').should('exist')
	});
	it('a user can find the add recipe button and successfully add a recipe', () => {
		cy.visit("http://localhost:3000/recipes")
		cy.getByData('add-recipe-link').click()
		cy.location("pathname").should("equal", "/recipes/add-recipe")
		// recipe form has fields for the recipe title and a select dropdown to choose its category
		cy.getByData('add-recipe-form').should('exist')
		cy.getByData('recipe-title-input').should('exist')
		cy.getByData('recipe-category-select').should('exist')
		cy.getByData('recipe-submit-button').should('exist')
		// user can fill out the form and submit
		cy.getByData('recipe-title-input').type('Test Recipe')
		cy.getByData('recipe-category-select').select('breakfast')
		cy.getByData('recipe-submit-button').click()
		// on successful submit, user is redirected to the recipes page
		cy.location("pathname").should("equal", "/recipes")
		// the recipe should be displayed on the recipes page
		cy.getByData('category-card').should('exist')
		cy.getByData('category-card').contains('Test Recipe')
	})
})