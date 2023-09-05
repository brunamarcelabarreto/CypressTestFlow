/// <reference types = "Cypress" />

describe('Functional login test', () => {
  it('Should realize a login method successfully', () => {
    cy.loginTest('standard_user', 'secret_sauce')
    cy.get('.title').should('contain', 'Products')
  });

  it('Validating incorrect login', () => {
    cy.loginTest('incorrect', 'secret_sauce')
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
  });

  it('Validating incorrect password', () => {
    cy.loginTest('standard_user', 'incorrect')
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
  });
});