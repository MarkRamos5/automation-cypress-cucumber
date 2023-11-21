import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given ("Go to the Home Page", () => {
    // Go to the home page
    cy.visit("https://www.demoblaze.com/");
    // Check URL
    cy.url().should('eq', 'https://www.demoblaze.com/');
});

When ("Add a product", () => {
    // Check first product image is loaded
    cy.get(':nth-child(1) > .card > :nth-child(1) > .card-img-top')
        .should('be.visible');
    // Click in the first item
    cy.get(':nth-child(1) > .card > .card-block > .card-title > .hrefch')
        .should('be.visible')
        .click();
});

Then ("Check the product is added into the cart", () => {
    // Intercept /addtocart
    cy.intercept('POST', '/addtocart').as('addtocart');
    // Click in add to card button
    cy.get('.col-sm-12 > .btn')
        .should('be.visible')
        .click()
    cy.wait('@addtocart').then((intercept) => {
        // Check statusCode OK and the
        expect(intercept.response.statusCode).to.equal(200);
        // Check the item added is a product and it has product id
        expect(intercept.request.body).to.have.property('prod_id');
    });
});

When ("Go to the cart", () => {
    // Go to the card page
    cy.get('#navbarExample').contains('Cart').click();
});


Then ("Check the product added is correct", () => {
    // Intercept /view
    cy.intercept('POST', '/view').as('view');
    cy.wait('@view').then((intercept) => {
        // Check statusCode OK
        expect(intercept.response.statusCode).to.equal(200);
        // Check some key product propierties
        expect(intercept.response.body).to.have.property('id');
        expect(intercept.response.body).to.have.property('price');
        expect(intercept.response.body).to.have.property('desc');
    });
});

When ("Delete the product", () => {
    // Click in the delete button
    cy.get('.success > :nth-child(4) > a')
        .should('have.text', 'Delete')
        .click();
});

Then ("Check the product is not in the cart", () => {
    // Intercept /deleteitem
    cy.intercept('POST', '/deleteitem').as('deleteitem');
    cy.wait('@deleteitem').then((intercept) => {
        // Check statusCode OK item deleted
        expect(intercept.response.statusCode).to.eq(200);
    });
    // Intercept /viewcart
    cy.intercept('POST', '/viewcart').as('viewcart')
        cy.wait('@viewcart').then((interception) => {
            // Check the cart is empty
            console.log(interception);
            expect(interception.response.body.Items).to.have.lengthOf(0);
        });
});