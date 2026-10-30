
describe('OrangeHRM - Login Intercept Testing', () => {

    const loginUrl =
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

    const loginApi = '**/web/index.php/auth/validate';

    const usernameField = 'input[name="username"]';
    const passwordField = 'input[name="password"]';
    const loginButton = 'button[type="submit"]';

    // Helper untuk memasang intercept pada setiap skenario
    const interceptLogin = (alias, expectedValue) => {
        cy.intercept('POST', loginApi).as(alias);
    };

    const verifyLoginRequest = (alias, expectedValue) => {
        cy.wait(`@${alias}`).then((interception) => {
            expect(interception.request.method).to.equal('POST');
            expect(interception.request.body).to.exist;
            expect(
                JSON.stringify(interception.request.body)
            ).to.include(expectedValue);
            expect(interception.response).to.exist;
        });
    };

    // TC-INT-001: Login valid
    it('TC-INT-001 - Login dengan kredensial valid', () => {
        interceptLogin('validLogin', 'Admin');

        cy.visit(loginUrl);
        cy.get(usernameField).type('Admin');
        cy.get(passwordField).type('admin123');
        cy.get(loginButton).click();

        verifyLoginRequest('validLogin', 'Admin');

        cy.url().should('include', '/dashboard');
    });

    // TC-INT-002: Password salah
    it('TC-INT-002 - Login dengan password salah', () => {
        interceptLogin('wrongPassword', 'user123');

        cy.visit(loginUrl);
        cy.get(usernameField).type('Admin');
        cy.get(passwordField).type('user123');
        cy.get(loginButton).click();

        verifyLoginRequest('wrongPassword', 'user123');

        cy.contains('Invalid credentials').should('be.visible');
    });

    // TC-INT-003: Username salah
    it('TC-INT-003 - Login dengan username salah', () => {
        interceptLogin('wrongUsername', 'User');

        cy.visit(loginUrl);
        cy.get(usernameField).type('User');
        cy.get(passwordField).type('admin123');
        cy.get(loginButton).click();

        verifyLoginRequest('wrongUsername', 'User');

        cy.contains('Invalid credentials').should('be.visible');
    });

    // TC-INT-004: Username dan password salah
    it('TC-INT-004 - Login dengan kedua kredensial salah', () => {
        interceptLogin('bothWrong', 'UnknownUser');

        cy.visit(loginUrl);
        cy.get(usernameField).type('UnknownUser');
        cy.get(passwordField).type('wrongPassword123');
        cy.get(loginButton).click();

        verifyLoginRequest('bothWrong', 'UnknownUser');

        cy.contains('Invalid credentials').should('be.visible');
    });

    // TC-INT-005: Login menggunakan tombol Enter
    it('TC-INT-005 - Login dengan menekan tombol Enter', () => {
        cy.intercept('POST', loginApi).as('loginWithEnter');

        cy.visit(loginUrl);

        cy.get(usernameField).type('Admin');
        cy.get(passwordField).type('admin123{enter}');

        cy.wait('@loginWithEnter').then((interception) => {
            expect(interception.request.method).to.equal('POST');
            expect(interception.request.body).to.exist;
            expect(interception.response).to.exist;
        });

        // Memastikan login berhasil
        cy.url().should('include', '/dashboard');
    });

    // TC-INT-006: Password berbeda kapitalisasi
    it('TC-INT-006 - Login dengan password berbeda kapitalisasi', () => {
        interceptLogin('caseSensitivePassword', 'Admin123');

        cy.visit(loginUrl);
        cy.get(usernameField).type('Admin');
        cy.get(passwordField).type('Admin123');
        cy.get(loginButton).click();

        verifyLoginRequest('caseSensitivePassword', 'Admin123');

        cy.contains('Invalid credentials').should('be.visible');
    });

    // TC-INT-007: Username tidak terdaftar
    it('TC-INT-007 - Login dengan username tidak terdaftar', () => {
        interceptLogin('unregisteredUsername', 'TestUser999');

        cy.visit(loginUrl);
        cy.get(usernameField).type('TestUser999');
        cy.get(passwordField).type('admin123');
        cy.get(loginButton).click();

        verifyLoginRequest('unregisteredUsername', 'TestUser999');

        cy.contains('Invalid credentials').should('be.visible');
    });

   // TC-INT-008: Username dengan spasi
    it('TC-INT-008 - Verifikasi link LinkedIn', () => {
        cy.intercept('GET', '**/web/index.php/auth/login').as('loginPageLinkedIn');

        cy.visit(loginUrl);

        cy.wait('@loginPageLinkedIn');

        cy.get('a[href="https://www.linkedin.com/company/orangehrm/mycompany/"]')
            .should('be.visible')
            .and('have.attr', 'target', '_blank');
    });
});
