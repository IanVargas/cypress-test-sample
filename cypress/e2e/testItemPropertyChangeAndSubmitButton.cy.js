describe('Test for Unlayer hiring process, change of attribute of an item and exporting the item as an HTML', () => {
    before(()=>{
        cy.on('window:load', (win) => {
            cy.spy(win.console, 'log').as('consoleLog');
        });
        cy.visit('https://react-email-editor-demo.netlify.app');
        cy.wait(3000);
    });

    function getIframeInformation(){
        //We need to access the iframe in order to be able to interact with the items inside it.
        return cy.get('iframe',{timeout : 1000})
        .its('0.contentDocument.body')  
        .should('not.be.empty')
        .then(cy.wrap);
    };

    function changeColor(hexaDecimalColor){
        getIframeInformation().find('[id="color-picker-trigger"]',{timeout : 1000}).click({ force: true })
        getIframeInformation().contains('label', 'hex',{timeout : 1000}).siblings('input').clear({ force: true }).type(hexaDecimalColor); //finding the hexa input based on label as id changes depending on the click
    };

    it('changing format [color - text - size] on Text items and Exporting content as HTML', () => {
        getIframeInformation().find('[id="u_content_heading_1"]').click({force : true}).then(() => {
            getIframeInformation()  
            .find('[id=":r25:"]')
            .click();
        }
        );
        cy.wait(2000);
        changeColor('bc7ef5');
        //changing another item information, using another way as creating an alias 
        getIframeInformation().find('[id="u_content_text_2"]',{timeout : 1000}).as('inputInformation')
        cy.get('@inputInformation').click({ force: true });
        cy.get('@inputInformation').type('{selectall}'); //Solution to clear not working due to the item being inside Divs and not being an input it self, this is a good alternative for this cases
        cy.get('@inputInformation').type("NOW ON SALE");
        cy.contains('button', 'Export HTML').click();
        cy.get('@consoleLog').should('have.been.called');
    });
});