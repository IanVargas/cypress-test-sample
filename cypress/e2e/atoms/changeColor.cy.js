function changeColor(hexaDecimalColor){
    cy.getIframe().find('[id="color-picker-trigger"]',{timeout : 1000}).click({ force: true })
    cy.getIframe().contains('label', 'hex',{timeout : 1000}).siblings('input').clear({ force: true }).type(hexaDecimalColor); //finding the hexa input based on label as id changes depending on the click
};


export default changeColor;