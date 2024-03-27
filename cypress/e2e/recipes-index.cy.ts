describe('recipes index page', () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/recipes")
	})
	context('HeaderBar', () => {
		it('should have a headerbar', () => {
			cy.getByData('headerbar').should('exist')
		})
	});
	context('Main section', () => {
		// it should display a list of category cards
		// each card should have a category name
		// and a list of recipes, if there are any
		context('It displays Recipes by Category by default', () => {
			it('should display recipes by category', () => {
				cy.getByData('recipe-categories').should('exist')
			});

			// recipe-categories should contain at least one category card
			// and within that card should be at least one recipe
			it('should display at least one category card', () => {
				cy.getByData('category-card').should('exist')
				cy.getByData('category-card').should('have.length.greaterThan', 2)
			});
			// context('category card display', () => {
			// 	// card display tests
			// 	// min 300 x 300 or so dimensions
			// 	it('should have a width of 224px', () => {
			// 		cy.getByData('category-card').should('have.css', 'width', '224px')
			// 	});
			// 	it('should have a minimum height of 128px', () => {
			// 		cy.getByData('category-card').should('have.css', 'min-height', '64px')
			// 	});

			// 	it('should have a rounded border of 2px', () => {
			// 		cy.getByData('category-card').should('have.css', 'border-width', '2px')
			// 		cy.getByData('category-card').should('have.css', 'border-radius', '6px')
			// 	});
			// });
			context('category card content', () => {
				it('should display a category name', () => {
					cy.getByData('category-name').should('exist')
				});
				it('should display a list of recipes', () => {
					cy.getByData('recipe-list').should('exist')
				});
				it('should display at least one recipe', () => {
					cy.getByData('recipe-link').should('exist')
				});
			});
		});
		context('It has a link to add recipes', () => {
			it('should have a link to add a recipe', () => {
				cy.getByData('add-recipe-link').should('exist')
			});
		});

	});

})