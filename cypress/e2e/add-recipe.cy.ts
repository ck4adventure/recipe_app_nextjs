describe("Add Recipe Page/Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recipes/add-recipe")
  })
  context("page layout", () => {
    it("has a recipe form", () => {
      cy.getByData("recipe-form").should("exist")
    });
    it("has a form with a title input", () => {
      cy.getByData("recipe-title-input").should("exist")
    })
    it("has a form with a category select", () => {
      cy.getByData("recipe-category-select").should("exist")
    })
    it("has a form with a submit button", () => {
      cy.getByData("recipe-submit-button").should("exist")
    })
  });
  // context("form functionality", () => {
  //   it("allows users to create a new recipe", () => {
  //     cy.getByData("recipe-title").type("Test Recipe")
  //     cy.getByData("recipe-category").select("Breakfast").should("have.value", "breakfast")
  //     cy.getByData("submit-button").click()
  //     // cy.getByData("success-message").should("exist").contains("tom@aol.com")
  //     // from here we can add more tests to check if the recipe was added to the list
  //   })

  //   it("does NOT allow an empty recipe title", () => {
  //     cy.getByData("recipe-title").type("")
  //     cy.getByData("submit-button").click()
  //     // cy.getByData("success-message").should("not.exist")
  //     // tbd how to handle form errors
  //   })
  // });

})
