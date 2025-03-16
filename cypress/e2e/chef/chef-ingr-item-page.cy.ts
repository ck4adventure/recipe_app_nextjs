describe('Chefs Ingredient Item Page', () => {
	// recipe item needs to exist first, this runs on local db

	context('layout', () => {
		beforeEach(() => {
			// pistachio crumble recipes has data in all the fields
			cy.visit('http://localhost:3000/chef/ingrs/lucerne-half-half-cream');
		});
		it('has a main page called ingr-item', () => {
			cy.getByData('ingr-item').should('exist');
		})
		it('should show the ingr packaged name', () => {
			cy.getByData('ingr-packaged-name').should('exist');
		});
		it('should show the ingr label name', () => {
			cy.getByData('ingr-label-name').should('exist');
		});
		it('should show the ingr brand name', () => {
			cy.getByData('ingr-brand-name').should('exist');
		});
		it('should show the ingr category', () => {
			cy.getByData('ingr-category').should('exist');
		});
		it('should show an ingredients section', () => {
			cy.getByData('ingr-ingredients-section').should('exist');
		});
		it('should show an allergens section', () => {
			cy.getByData('ingr-allergens-section').should('exist');
		});
	})

	context('slug not found', () => {
		beforeEach(() => {
			cy.visit('http://localhost:3000/chef/ingrs/not-an-ingr');
		});
		it('has a main page called ingr-item', () => {
			cy.getByData('ingr-item').should('exist');
		})

		it('should display a not found message', () => {
			cy.getByData('ingr-item-not-found').should('exist');
		})
	})
});