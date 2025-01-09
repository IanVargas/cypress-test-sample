import changeColor from "../atoms/changeColor.cy";

describe('Test for Unlayer hiring process, change of attribute of an item and exporting the item as an HTML', () => {
    const firstTextInput = '[id=u_content_heading_1]';
    const inputToChangeColor = '[id="u_content_text_2"]';
    const urlToVisit = 'https://react-email-editor-demo.netlify.app';
    const changeSizeText = '[id=":r25:"]';

    before(()=>{
        cy.on('window:load', (win) => {
            cy.spy(win.console, 'log').as('consoleLog');
        });
        cy.visit(urlToVisit);
        cy.getIframe().should('be.visible'); //changing to a dynamic condition instead of a wait
    });

    it('changing format [color - text - size] on Text items and Exporting content as HTML', () => {
        cy.getItem(firstTextInput).click({force : true}).then(() => {
            cy.getItem(changeSizeText)
            .click();
            changeColor('bc7ef5');
        });
        //changing another item information, using another way as creating an alias 
        cy.getItem(inputToChangeColor,{timeout : 1000}).as('inputInformation');
        cy.get('@inputInformation').click({ force: true }).then(()=> { //adding a then() to make sure everything is more readable and it execute after finding the item
            cy.get('@inputInformation').type('{selectall}{backspace}'); //Solution to clear not working due to the item being inside Divs and not being an input it self, this is a good alternative for this cases
            cy.get('@inputInformation').type("NOW ON SALE");
        });
        cy.contains('button', 'Export HTML').click();
        cy.get('@consoleLog').should('have.been.called');
    });
});