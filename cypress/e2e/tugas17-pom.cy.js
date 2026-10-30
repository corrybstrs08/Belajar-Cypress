import LoginPage from '../support/loginPage';

describe('OrangeHRM - Login Automation Using POM', () => {

    const loginPage = new LoginPage();
    let loginData;

    beforeEach(() => {
        cy.fixture('loginData').then((data) => {
            loginData = data;
        });

        loginPage.visit();
    });

    it('TC-POM-001 - Menampilkan halaman Login', () => {
        loginPage.verifyLoginPage();
    });

    it('TC-POM-002 - Login dengan username dan password valid', () => {
        loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );

        loginPage.verifyDashboard();
    });

    it('TC-POM-003 - Login dengan password salah', () => {
        loginPage.login(
            loginData.invalidPassword.username,
            loginData.invalidPassword.password
        );

        loginPage.verifyErrorMessage('Invalid credentials');
    });

    it('TC-POM-004 - Login dengan username salah', () => {
        loginPage.login(
            loginData.invalidUsername.username,
            loginData.invalidUsername.password
        );

        loginPage.verifyErrorMessage('Invalid credentials');
    });

    it('TC-POM-005 - Login dengan username dan password salah', () => {
        loginPage.login(
            loginData.invalidCredentials.username,
            loginData.invalidCredentials.password
        );

        loginPage.verifyErrorMessage('Invalid credentials');
    });

    it('TC-POM-006 - Login dengan kedua field kosong', () => {
        loginPage.clickLogin();

        loginPage.verifyRequiredMessage();
        loginPage.verifyLoginPage();
    });

    it('TC-POM-007 - Login tanpa mengisi username', () => {
        loginPage.enterPassword(loginData.validUser.password);
        loginPage.clickLogin();

        loginPage.verifyRequiredMessage();
        loginPage.verifyLoginPage();
    });

    it('TC-POM-008 - Login tanpa mengisi password', () => {
        loginPage.enterUsername(loginData.validUser.username);
        loginPage.clickLogin();

        loginPage.verifyRequiredMessage();
        loginPage.verifyLoginPage();
    });

});
