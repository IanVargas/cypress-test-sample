function changeColor(hexaDecimalColor){
    const colorPicker = '[id="color-picker-trigger"]';
    cy.getItem(colorPicker,{timeout : 1000}).should('be.visible').as('color-picker-button');
    cy.get('@color-picker-button').click({ force: true });
    cy.getIframe().contains('label', 'hex',{timeout : 1000}).siblings('input').as('change-color');
    cy.get('@change-color').type('{selectall}{backspace}').then(() => {
        cy.get('@change-color').type(hexaDecimalColor);
    });
    cy.wait(100); //system takes approximately 1 millisecond on make the change
};

export default changeColor;