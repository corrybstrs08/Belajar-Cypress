
describe('Verifikasi DOM Query dan Interaksi UI', () => {
    it('TC001 - Mengisi form login dan klik tombol Login', () => {
        cy.visit('https://www.saucedemo.com/')

        cy.get('#user-name').should('be.visible')
            .type('standard_user')

        cy.get('#password').should('be.visible')
            .type('secret_sauce')

        cy.get('.btn_action').click()

        cy.url().should('include', '/inventory.html')
    })
})
