describe('home page', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  context('HeaderBar', () => {
    // so far on the main landing page there is just a placeholder h1
    it("there is a headerbar", () => {
      cy.getByData('headerbar').should("exist")
    })
    it("there is a logo", () => {
      cy.getByData('headerbar').find("img").should("exist")
    })
    it("there is a link to the recipes page", () => {
      cy.getByData('headerbar').contains("Recipes")
    })
  })

  context('main section', () => {
		it("there is a main section", () => {
			cy.getByData('recipes-index').should("exist")
		})
		it("there are recipe cards", () => {
			cy.getByData('recipe-card').should("have.length", 2)
		})
  })
})

