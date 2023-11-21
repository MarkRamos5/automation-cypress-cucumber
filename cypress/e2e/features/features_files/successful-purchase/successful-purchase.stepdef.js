import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

var credentials;

Given ("Go to the Home Page", () => {
    // Go to the home page
    cy.visit("https://www.demoblaze.com/");
    // Check URL
    cy.url().should('eq', 'https://www.demoblaze.com/');
});

When ("Login", () => {
    // Click in login tab
    cy.get('#login2').should('be.visible').click();
    // Login with the credentials created
    cy.fixture('user-credentials.json').then(function(cred){
        credentials = cred;
        cy.get('#loginusername').should('be.visible').clear().type(cred.existingUser);
        cy.get('#loginpassword').should('be.visible').clear().type(cred.password);  
    });
    // Click in login button
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary')
    .should('be.visible')
    .click();
    cy.wait(2000);
});

When ("Add a product", () => {
    // Check first product image is loaded
    cy.get(':nth-child(1) > .card > :nth-child(1) > .card-img-top')
        .should('be.visible');
    // Click in the first item
    cy.get(':nth-child(1) > .card > .card-block > .card-title > .hrefch')
        .should('be.visible')
        .click();
    cy.wait(2000);
    // Click in add to card button
    cy.get('.col-sm-12 > .btn')
        .should('be.visible')
        .click()
    // Go to the card page
    cy.get('#navbarExample').contains('Cart').click();
});

When ("Fill order form", () => {
    // Click in place order button
    cy.get('.col-lg-1 > .btn').should('have.text', 'Place Order').click();
    cy.fixture('purchase-data.json').then(function(data){
        cy.get('#name').should('be.visible').clear().type(data.name);
        cy.get('#country').should('be.visible').clear().type(data.country);
        cy.get('#city').should('be.visible').clear().type(data.city);
        cy.get('#card').should('be.visible').clear().type(data.creditCard);
        cy.get('#month').should('be.visible').clear().type(data.month);
        cy.get('#year').should('be.visible').clear().type(data.year);
    });
    // Click in purcase button
    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary')
        .should('have.text', 'Purchase')
        .click();
});

Then ("Purchase is successfull and return to the home page", () => {
    cy.get('.sweet-alert')
        .should('be.visible')
        .contains('Thank you for your purchase!');
    cy.get('.sa-success').should('be.visible');
    cy.wait(2000);
    cy.get('.confirm').contains('OK').click();
    cy.url().should('eq', 'https://www.demoblaze.com/index.html');
});

When ("Return to cart page", () => {
    // Go to the cart page
    cy.get('#navbarExample').contains('Cart').click();
});

Then ("Cart is empty", () => {
    // Intercept /viewcart
    cy.intercept('POST', '/viewcart').as('viewcart')
        cy.wait('@viewcart').then((interception) => {
            // Check the cart is empty
            console.log(interception);
            expect(interception.response.body.Items).to.have.lengthOf(0);
        });
});

