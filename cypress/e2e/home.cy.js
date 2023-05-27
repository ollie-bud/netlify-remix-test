/// <reference types="cypress" />

describe("home", () => {
  it("loads pokemon", () => {
    cy.visit("/");
    cy.contains("h1", "ditto").should("be.visible");
    cy.contains("h1", "charmander").should("be.visible");
  });
});
