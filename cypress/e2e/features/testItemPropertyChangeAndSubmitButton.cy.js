import changeColor from "../atoms/changeColor.cy";

describe('Test for Unlayer hiring process, change of attribute of an item and exporting the item as an HTML', () => {
    const firstTextInput = '[id=u_content_heading_1]'
    const inputToChangeColor = '[id="u_content_text_2"]'
    before(()=>{
        cy.on('window:load', (win) => {
            cy.spy(win.console, 'log').as('consoleLog');
        });
        cy.visit('https://react-email-editor-demo.netlify.app');
        cy.wait(3000);
    });

    it('changing format [color - text - size] on Text items and Exporting content as HTML', () => {
        cy.getIframe().find(firstTextInput).click({force : true}).then(() => {
            cy.getIframe() 
            .find('[id=":r25:"]')
            .click();
        });
        cy.wait(2000);
        changeColor('bc7ef5');
        //changing another item information, using another way as creating an alias 
        cy.getIframe().find(inputToChangeColor,{timeout : 1000}).as('inputInformation')
        cy.get('@inputInformation').click({ force: true });
        cy.get('@inputInformation').type('{selectall}'); //Solution to clear not working due to the item being inside Divs and not being an input it self, this is a good alternative for this cases
        cy.get('@inputInformation').type("NOW ON SALE");
        cy.contains('button', 'Export HTML').click();
        cy.get('@consoleLog').should('have.been.called');
    });
});