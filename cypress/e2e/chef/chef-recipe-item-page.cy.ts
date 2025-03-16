describe('Chefs Recipes Item Page', () => {
	// recipe item needs to exist first, this runs on local db

	context('layout', () => {
		beforeEach(() => {
			// pistachio crumble recipes has data in all the fields
			cy.visit('http://localhost:3000/chef/recipes/pistachio-crumble');
		});
		it('has a main page called chef-recipe-item', () => {
			cy.getByData('chef-recipe-item-page').should('exist');
		})
		it('should show the recipe title', () => {
			cy.getByData('recipe-title').should('exist');
		});
		it('should show the recipe label name', () => {
			cy.getByData('recipe-label-name').should('exist');
		});
		it('should show the recipe category', () => {
			cy.getByData('recipe-category').should('exist');
		});
		it('should show an ingredients section', () => {
			cy.getByData('recipe-ingredients-section').should('exist');
		});
		it('each ingredient should have a qty, measure, ingr name and opt note', () => {
			cy.getByData('ingredient-qty').should('exist');
			cy.getByData('ingredient-measure').should('exist');
			cy.getByData('ingredient-name').should('exist');
			cy.getByData('ingredient-note').should('exist');
		})
		it('should show a method section', () => {
			cy.getByData('recipe-method-section').should('exist');
			cy.getByData('recipe-step').should('exist');
		});
		it('should show a notes section', () => {
			cy.getByData('recipe-notes-section').should('exist');
		});
	})

	context('slug not found', () => {
		beforeEach(() => {
			cy.visit('http://localhost:3000/chef/recipes/not-a-recipe');
		});
		it('has a main page called chef-recipes-item', () => {
			cy.getByData('chef-recipe-item-page').should('exist');
		})

		it('should display a not found message', () => {
			cy.getByData('recipe-item-not-found').should('exist');
		})
	})
});