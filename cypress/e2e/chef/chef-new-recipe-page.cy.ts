describe('Chefs New Recipe Page', () => {
	// recipe item needs to exist first, this runs on local db

	context('layout', () => {
		beforeEach(() => {
			// pistachio crumble recipes has data in all the fields
			cy.visit('http://localhost:3000/chef/recipes/new');
		});
		it('has a main page called new-recipe-age', () => {
			cy.getByData('new-recipe-page').should('exist');
		})
		it('has a new recipe form', () => {
			cy.getByData('recipe-form').should('exist');
		})
		it('the form has a title input', () => {
			cy.getByData('recipe-form-title-input').should('exist');
		})
		it('the form has a label input', () => {
			cy.getByData('recipe-form-label-input').should('exist');
		})
		it('the form shows the generated slug', () => {
			cy.getByData('recipe-form-slug').should('exist');
		})
		it('the form has a category input', () => {
			cy.getByData('recipe-form-category-input').should('exist');
		})
		it('the form has a ingredients section', () => {
			cy.getByData('recipe-form-ingredients-section').should('exist');
		})
		it('the form has a steps section', () => {
			cy.getByData('recipe-form-steps-section').should('exist');
		})
		it('the form has a notes section', () => {
			cy.getByData('recipe-form-notes-section').should('exist');
		})
		it('the form has a submit button', () => {
			cy.getByData('recipe-form-submit-button');
		})

	})
});