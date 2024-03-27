// journeys is a collection of tests that re-create the steps a user would take to accomplish a task.
describe('User Journeys', () => {
	it('a user can find the recipes page and see a list of recipes', () => {
		cy.visit("http://localhost:3000/recipes")
		cy.location("pathname").should("equal", "/recipes")
		cy.getByData('recipe-link').should('exist')
	});
	it('a user can click on a recipe and see its details', () => {
		cy.visit("http://localhost:3000/recipes")
		cy.getByData('recipe-link').first().invoke('attr', 'href').then((href) => {
			if (href) {
			const slug = href.split('/').pop();
			// slug should be a string not a number
			expect(isNaN(Number(slug))).to.be.true;
			}
		});
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
		cy.getByData('recipe-form').should('exist')
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
		it('a user can edit a recipe', () => {
		cy.visit("http://localhost:3000/recipes/test-recipe")
		cy.getByData('recipe-detail-edit-button').first().click()
		cy.getByData('recipe-title-input').should('exist')
		cy.getByData('recipe-category-select').should('exist')
		cy.getByData('recipe-submit-button').should('exist')
		// user can fill out the form and submit
		cy.getByData('recipe-title-input').clear().type('Test Recipe Updated')
		cy.getByData('recipe-category-select').select('salad')
		cy.getByData('recipe-submit-button').contains('Update Recipe').click()
		// on successful submit, user is redirected to the recipes detail page
		cy.location("pathname").should("equal", "/recipes/test-recipe-updated")

	});
	it('a user can delete a recipe', () => {
		cy.visit("http://localhost:3000/recipes/test-recipe-updated")
		cy.getByData('recipe-detail-delete-button').first().click()
		// on successful delete, user is redirected to the recipes page
		// modal should open
		cy.getByData('delete-recipe-modal').should('exist')
		// click the delete button
		cy.getByData('delete-recipe-button').click()

		cy.location("pathname").should("equal", "/recipes")
		// the recipe should not be displayed on the recipes page
		cy.getByData('category-card').should('exist')
		cy.getByData('category-card').contains('Test Recipe Updated').should('not.exist')
	})
	it('a user can find the categories page and see a list of categories', () => {
		cy.visit("http://localhost:3000/recipes")
		cy.getByData('category-link').should('exist')
		cy.getByData('category-link').contains("Breakfast").click()
		cy.location("pathname").should("equal", "/recipes/category/breakfast")
		cy.getByData('category-name').should('exist')
		cy.getByData('category-name').contains('Breakfast')
	});

})