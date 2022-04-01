class buscadorPage{
    constructor(){
        this.searchButton = '#search_mini_form > div.actions' ;
        this.searchInput = '#search' ;

    }

    search = (element) =>{
        cy.get(this.searchButton).click();
        cy.get(this.searchInput).type('A52{enter}');
    
    }
}
       
export default new buscadorPage ();