
describe('Verifikasi fungsi Retry-ability', () => {
    it('TC001 - Memastikan jumlah item keranjang bertambah', () => {
        cy.visit('https://www.saucedemo.com/')

        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('.btn_action').click()

        cy.get('#add-to-cart-sauce-labs-backpack').click()

        cy.get('.shopping_cart_badge')
            .should('be.visible')
            .and('have.text', '1')
    })
})
