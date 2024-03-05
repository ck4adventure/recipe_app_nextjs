describe('My First Test', () => {
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

  // so far on the main landing page there is just a placeholder h1
  it("there is an h1 that contains the correct text", () => {
    cy.visit("http://localhost:3000")
    cy.get("h1").contains("Christina's Corner")
  })
})

