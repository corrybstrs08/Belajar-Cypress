
describe('OrangeHRM - Login Automation Testing', () => {

    const loginUrl =
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

    const usernameField = 'input[name="username"]';
    const passwordField = 'input[name="password"]';
    const loginButton = 'button[type="submit"]';

    // Menunggu halaman login dan elemen siap digunakan
    beforeEach(() => {
        cy.visit(loginUrl);

        cy.get('.orangehrm-login-title', {
            timeout: 15000
        }).should('be.visible');

        cy.get(usernameField, {
            timeout: 15000
        }).should('be.visible');

        cy.get(passwordField, {
            timeout: 15000
        }).should('be.visible');

        cy.get(loginButton, {
            timeout: 15000
        }).should('be.visible');
    });

    // Screenshot otomatis setelah setiap test
    // Termasuk test yang Passed maupun Failed
    afterEach(function () {
        const testTitle = this.currentTest.title;
        const testState = this.currentTest.state;

        const screenshotName = testTitle
            .replace(/[^a-zA-Z0-9-]/g, '-');

        cy.screenshot(
            `${screenshotName}-${testState}`,
            { capture: 'runner' }
        );
    });

    // TC-LOG-001
    it('TC-LOG-001 - Memastikan halaman login ditampilkan dengan benar', () => {
        cy.get('.orangehrm-login-branding img')
            .should('be.visible');

        cy.get('.orangehrm-login-title')
            .should('be.visible')
            .and('contain.text', 'Login');

        cy.get(usernameField).should('be.visible');
        cy.get(passwordField).should('be.visible');

        cy.get(loginButton)
            .should('be.visible')
            .and('contain.text', 'Login');

        cy.contains('Forgot your password?')
            .should('be.visible');
    });

    // TC-LOG-002
    it('TC-LOG-002 - Memastikan informasi kredensial demo ditampilkan', () => {
        cy.contains('Username : Admin')
            .should('be.visible');

        cy.contains('Password : admin123')
            .should('be.visible');
    });

    // TC-LOG-003
    it('TC-LOG-003 - Memastikan field Username dapat menerima input', () => {
        cy.get(usernameField)
            .click()
            .type('Admin')
            .should('have.value', 'Admin');
    });

    // TC-LOG-004
    it('TC-LOG-004 - Memastikan field Password menerima input', () => {
        cy.get(passwordField)
            .click()
            .type('admin123')
            .should('have.value', 'admin123')
            .and('have.attr', 'type', 'password');
    });

    // TC-LOG-005
    it('TC-LOG-005 - Login menggunakan kredensial demo yang tersedia', () => {
        cy.get(usernameField).type('Admin');
        cy.get(passwordField).type('admin123');

        cy.get(loginButton).click();

        cy.url({ timeout: 15000 })
            .should('include', '/dashboard');

        cy.get('.oxd-topbar-header-breadcrumb', {
            timeout: 15000
        })
            .should('be.visible')
            .and('contain.text', 'Dashboard');
    });

    // TC-LOG-006
    it('TC-LOG-006 - Login menggunakan password yang salah', () => {
        cy.get(usernameField).type('Admin');
        cy.get(passwordField).type('user123');

        cy.get(loginButton).click();

        cy.get('.oxd-alert-content-text', {
            timeout: 15000
        })
            .should('be.visible')
            .and('contain.text', 'Invalid credentials');

        cy.url().should('include', '/auth/login');
    });

    // TC-LOG-007
    it('TC-LOG-007 - Login menggunakan username yang salah', () => {
        cy.get(usernameField).type('User');
        cy.get(passwordField).type('admin123');

        cy.get(loginButton).click();

        cy.get('.oxd-alert-content-text', {
            timeout: 15000
        })
            .should('be.visible')
            .and('contain.text', 'Invalid credentials');

        cy.url().should('include', '/auth/login');
    });

    // TC-LOG-008
    it('TC-LOG-008 - Login tanpa mengisi Username', () => {
        cy.get(passwordField).type('admin123');

        cy.get(loginButton).click();

        cy.get(usernameField)
            .parents('.oxd-input-group')
            .find('.oxd-input-field-error-message')
            .should('be.visible')
            .and('contain.text', 'Required');

        cy.url().should('include', '/auth/login');
    });

    // TC-LOG-009
    it('TC-LOG-009 - Login tanpa mengisi Password', () => {
        cy.get(usernameField).type('Admin');

        cy.get(loginButton).click();

        cy.get(passwordField)
            .parents('.oxd-input-group')
            .find('.oxd-input-field-error-message')
            .should('be.visible')
            .and('contain.text', 'Required');

        cy.url().should('include', '/auth/login');
    });

    // TC-LOG-010
    it('TC-LOG-010 - Login dengan kedua field kosong', () => {
        cy.get(usernameField).should('have.value', '');
        cy.get(passwordField).should('have.value', '');

        cy.get(loginButton).click();

        cy.get('.oxd-input-field-error-message')
            .should('have.length', 2)
            .each(($error) => {
                cy.wrap($error)
                    .should('be.visible')
                    .and('contain.text', 'Required');
            });

        cy.url().should('include', '/auth/login');
    });

    // TC-LOG-011
    it('TC-LOG-011 - Membuka halaman pemulihan password', () => {
        cy.contains('Forgot your password?')
            .should('be.visible')
            .click();

        cy.url({ timeout: 15000 })
            .should('include', '/requestPasswordResetCode');

        cy.contains('Reset Password', {
            timeout: 15000
        }).should('be.visible');

        cy.get('input[name="username"]')
            .should('be.visible');
    });

    // TC-LOG-012
    it('TC-LOG-012 - Memastikan tombol Login merespons klik tanpa kredensial', () => {
        cy.get(loginButton)
            .should('be.enabled')
            .click();

        cy.get('.oxd-input-field-error-message')
            .should('have.length', 2);

        cy.get(usernameField)
            .parents('.oxd-input-group')
            .find('.oxd-input-field-error-message')
            .should('be.visible')
            .and('contain.text', 'Required');

        cy.get(passwordField)
            .parents('.oxd-input-group')
            .find('.oxd-input-field-error-message')
            .should('be.visible')
            .and('contain.text', 'Required');

        cy.url().should('include', '/auth/login');
    });

});
