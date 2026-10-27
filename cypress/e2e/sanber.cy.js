describe ('Verifikasi fungsi ;ogin', () =>{
    it('TC001-Login dengan email dan password yang valid', () =>{
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('.btn_action').click()
    })
})