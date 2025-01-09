// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
    Cypress.Commands.add('getIframe',() => {
        return cy.get('iframe',{timeout : 1000})
        .its('0.contentDocument.body')  
        .should('not.be.empty')
        .then(cy.wrap);
    });

    Cypress.Commands.add('getItem', (itemToFind) => {
        return cy.getIframe().find(itemToFind,{timeout : 1000})
    })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })