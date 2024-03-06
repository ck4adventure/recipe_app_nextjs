describe('home page', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })
  // it("the features on the homepage are correct", () => {
  //   cy.get("dt").eq(0).contains("4 Courses")
  //   cy.get("dt").eq(1).contains("25+ Lessons")
  //   cy.get("dt").eq(2).contains("Free and Open Source")
  // })

  // it('Gets, types and asserts', () => {
  //   cy.visit('https://example.cypress.io')

  //   cy.contains('type').click()

  //   // Should be on a new URL which
  //   // includes '/commands/actions'
  //   cy.url().should('include', '/commands/actions')

  //   // Get an input, type into it
  //   cy.get('.action-email').type('fake@email.com')

  //   //  Verify that the value has been updated
  //   cy.get('.action-email').should('have.value', 'fake@email.com')
  // })

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
    it("there is an h1 that contains the correct text", () => {
      cy.getByData('hero-heading').contains("Christina's Corner")
    })
  })
})

