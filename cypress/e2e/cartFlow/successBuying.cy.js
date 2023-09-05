/// <reference types = "Cypress" />

describe('E2E - Success buying products', () => {
  it('Buying products flow', () => {
    //Login flow
    cy.loginTest('standard_user', 'secret_sauce')
    cy.get('.title').should('contain', 'Products')

    // Ordenation price filter
    cy.get('[data-test="product_sort_container"]').select('Price (low to high)')
    
    // Validating ordination of products
    cy.get(':nth-child(1) > .inventory_item_description').should('contain', 'Sauce Labs Onesie')
    cy.get(':nth-child(2) > .inventory_item_description').should('contain', 'Sauce Labs Bike Light')
    cy.get(':nth-child(3) > .inventory_item_description').should('contain', 'Sauce Labs Bolt T-Shirt')
    
    // Adding products to the shopping cart
    cy.contains('Sauce Labs Onesie').click()
    cy.get('.btn_primary').click()
    cy.backButton()

    cy.contains('Sauce Labs Bike Light').click()
    cy.get('.btn_primary').click()
    cy.backButton()

    cy.contains('Sauce Labs Bolt T-Shirt').click()
    cy.get('.btn_primary').click()
    cy.backButton()

    // Checking quantity of products added to cart
    cy.get('.shopping_cart_link').should('have.text', '3')
    cy.get('.shopping_cart_link').click()
    cy.cartList()

    // Checkout
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('Test first name')
    cy.get('[data-test="lastName"]').type('Test last name')
    cy.get('[data-test="postalCode"]').type('12345678')
    cy.get('[data-test="continue"]').click()

    // Validating products in checkout
    cy.cartList()

    // Checking total value and order completed successfully
    cy.get('.summary_total_label').should('have.text', 'Total: $36.69')
    cy.get('[data-test="finish"]').click()
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')
  });
  
});