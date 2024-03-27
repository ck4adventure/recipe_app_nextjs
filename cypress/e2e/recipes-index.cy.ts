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
		context('Recipes Header Section', () => {
			it('should display a header section', () => {
				cy.getByData('recipes-headerbar').should('exist')
			});
			it('should display a header with the correct text', () => {
				cy.getByData('recipes-header-type').contains("Recipes By Category")
			});
			it('should display an add recipe link', () => {
				cy.getByData('add-recipe-link').should('exist')
			});
		});
		context('It displays Recipes by Category by default', () => {
			it('should display recipes by category', () => {
				cy.getByData('recipe-categories').should('exist')
			});
			// cards should be flex and wrap/adjust to screen size
			it('should have a display of flex', () => {
				cy.getByData('recipe-categories').should('have.css', 'display', 'grid')
			});
			// todo: test for grid flow row
			it('should have a grid flow row', () => {
				cy.getByData('recipe-categories').should('have.css', 'grid-auto-flow', 'row')
			});
			// recipe-categories should contain at least one category card
			// and within that card should be at least one recipe
			it('should display at least one category card', () => {
				cy.getByData('category-card').should('exist')
				cy.getByData('category-card').should('have.length.greaterThan', 2)
			});
			context('category card display', () => {
				// card display tests
				// min 300 x 300 or so dimensions
				it('should have a width of 224px', () => {
					cy.getByData('category-card').should('have.css', 'width', '224px')
				});
				it('should have a minimum height of 128px', () => {
					cy.getByData('category-card').should('have.css', 'min-height', '64px')
				});

				it('should have a rounded border of 2px', () => {
					cy.getByData('category-card').should('have.css', 'border-width', '2px')
					cy.getByData('category-card').should('have.css', 'border-radius', '6px')
				});
			});
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
		context('It can also display a full list of recipes', () => {
			it('should have a button to toggle between catageory and full list views', () => {
				cy.getByData('recipe-toggle-switch').should('exist')
				cy.getByData('recipe-toggle-list').should('exist').click()
				cy.getByData('recipes-list').should('exist')
				cy.getByData('category-card').should('not.exist')
			});
		});

	});

})