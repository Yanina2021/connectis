import buscadorPage from './Pages/buscador';

describe('tienda Movistar', function(){
    beforeEach(function(){
        cy.visit('https://tienda.movistar.com.ar');

    }) 
    it(' Validar cuotas en compra de equipo -Cuotas.12 -Equipo.A52 ', function(){
        buscadorPage.search('A52')
        cy.get('.base').should('contain' , 'A52');
        cy.screenshot({ clip: { x: 20, y: 20, width: 400, height: 300 } });
        cy.get('#product-item-info_6115 > div > strong > a > span.name').contains('Samsung Galaxy A52');
        cy.contains('Comprar').click();
        cy.get('#installments-text').should('contain' , '12 cuotas');
        cy.screenshot({ clip: { x: 20, y: 20, width: 400, height: 300 } }); 
    }) 
  
    it('Aplicar filtro de equipos -Gama.Alta -Memoria Interna.256GB', function(){
        cy.get('#layered-filter-block > div.block-title.filter-title > strong').click();
        cy.wait(400);
        cy.get('[attribute="price"] > .filter-options-content > .items > :nth-child(2) > a').click()
        cy.wait(4000);
        cy.get('#layered-filter-block > div.block-title.filter-title > strong').click();
        cy.wait(400);
        cy.get('[attribute="movistar_internalmemory"] > .filter-options-content > .items > :nth-child(2) > a').click();
        cy.wait(4000);
        cy.get('#layer-product-list > div.products.wrapper.grid.products-grid > ol > li').its('length').should('be.gt', 0);
        cy.screenshot(); 
    
    }) 

     it('Validar Cuotas.60 -Equipo.Tercero de la lista -Banco.Credicoop -Tarjeta.Visa',function(){
        cy.get('#layer-product-list > div.products.wrapper.grid.products-grid > ol > li:nth-child(3)').click();
        cy.get('#open-installments-modal').click();
        cy.get('#bankSelector > span').contains('Banco Emisor');
        cy.get('#selectBank').select('Credicoop');
        cy.get('#selectCardByBank').select('Visa');
        cy.screenshot({ clip: { x: 20, y: 20, width: 400, height: 300 } });
        
    })
     it('Ordenar equipos,cargar un equipo al carrito y eliminarlo',function(){
        cy.get('#sorter').select('Precio - Mayor a Menor');
        cy.get('#product-item-info_6895 > div').first().click();
        cy.get('#product-item-info_6895 > .details > .product-item-inner > .product > .actions-primary > form > .action').click();
        cy.get('#movistar-pdp-addtocart-button').click();
        cy.get('#maincontent > div.page.messages > div.messages > div > div').contains('Añadiste Samsung Galaxy Z Fold 3 5G a tu carrito de compras.')
        cy.screenshot();
        cy.get('#shopping-cart-table > tbody > tr > td:nth-child(5) > div > a').click();
        cy.get('#maincontent > div.columns > div > div.cart-empty').should('contain', 'No tienes ningún artículo en tu carrito de compras.');
        cy.screenshot({ clip: { x: 20, y: 20, width: 400, height: 300 } });
        cy.get('#maincontent > div.columns > div > div.cart-empty > p:nth-child(2) > a').click();
        cy.get('#html-body > div.page-wrapper > header > div.header.content > div:nth-child(4) > ul > li:nth-child(1) > a').click();

    })   

})
