class LoginPage {
    usernameField = 'input[name="username"]';
    passwordField = 'input[name="password"]';
    loginButton = 'button[type="submit"]';
    errorMessage = '.oxd-alert-content-text';
    requiredMessage = '.oxd-input-field-error-message';

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    enterUsername(username) {
        cy.get(this.usernameField).clear().type(username);
    }

    enterPassword(password) {
        cy.get(this.passwordField).clear().type(password);
    }

    clickLogin() {
        cy.get(this.loginButton).click();
    }

    login(username, password) {
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickLogin();
    }

    verifyLoginPage() {
        cy.get(this.usernameField).should('be.visible');
        cy.get(this.passwordField).should('be.visible');
        cy.get(this.loginButton).should('be.visible');
    }

    verifyDashboard() {
        cy.url().should('include', '/dashboard');
        cy.get('.oxd-topbar-header-breadcrumb')
            .should('contain', 'Dashboard');
    }

    verifyErrorMessage(message) {
        cy.get(this.errorMessage).should('contain', message);
    }

    verifyRequiredMessage() {
        cy.get(this.requiredMessage).should('be.visible');
    }
}

export default LoginPage;
