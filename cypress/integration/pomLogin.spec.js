/// <reference types="cypress" />

import { authLogin } from "../page_objects/authLogin";
import { header } from "../page_objects/header";
import { validationMessages} from "../fixtures/validationMessages.json";

const faker = require("faker");

describe('POM login', () => {

    let validEmail = 'dina1@test.com';
    let validPass = 'dinatest1';

    let userData = {
        randomEmail: faker.internet.email(),
        randomPassword: faker.internet.password(8)
    }

    beforeEach('visit app page and open login page', () => {
        cy.visit('/');
        cy.url().should('contains', 'https://gallery-app');
        header.loginBtn.click();
        cy.url().should('contains', '/login');
    });

    it('Login with all empty fields', () => {
        authLogin.loginPageHeading.should('be.visible').and('have.text', 'Please login');
        authLogin.submitBtn.click();
        authLogin.emailInput.should('have.value', '');
        authLogin.passwordInput.should('have.value', '');
        header.loginBtn.should('be.visible');
    });

    it('Login without email address', () => {
        authLogin.loginPageHeading.should('be.visible').and('have.text', 'Please login');
        authLogin.login('{selectall}{backspace}', validPass);
        authLogin.emailInput.should('have.value', '');
        authLogin.passwordInput.should('have.value', validPass);
        header.loginBtn.should('be.visible');
    });

    it('Login without password', () => {
        authLogin.loginPageHeading.should('be.visible').and('have.text', 'Please login');
        authLogin.login(validEmail, '{selectall}{backspace}');
        authLogin.emailInput.should('have.value', validEmail);
        authLogin.passwordInput.should('have.value', '');
        header.loginBtn.should('be.visible');
    });

    it('Login with invalid password', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/login'
        }).as('loginWithInvalidPass');

        authLogin.loginPageHeading.should('be.visible');
        authLogin.login(validEmail, userData.randomPassword);

        cy.wait('@loginWithInvalidPass').then((interception) => {
            expect(interception.response.statusCode).eq(401);
            expect(interception.response.body.error).to.have.string('Unauthorized');
        });

        authLogin.errorMsg.should('be.visible');
        authLogin.errorMsg.should('have.text', validationMessages.badCredentials);
        authLogin.errorMsg.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        authLogin.emailInput.should('have.value', validEmail);
        header.loginBtn.should('exist');
    });

    it('Login with invalid email address', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/login'
        }).as('loginWithInvalidEmail');

        authLogin.loginPageHeading.should('be.visible');
        authLogin.login(userData.randomEmail, validPass);

        cy.wait('@loginWithInvalidEmail').then((interception) => {
            expect(interception.response.statusCode).eq(401);
            expect(interception.response.body.error).to.have.string('Unauthorized');
        });
        authLogin.errorMsg.should('be.visible');
        authLogin.errorMsg.should('have.text', validationMessages.badCredentials);
        authLogin.errorMsg.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        authLogin.passwordInput.should('have.value', validPass);
        header.loginBtn.should('exist');
    });

    it('Login with invalid email address and invalid password', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/login'
        }).as('invalidLogin');

        authLogin.loginPageHeading.should('be.visible');
        authLogin.login(userData.randomEmail, userData.randomPassword);

        cy.wait('@invalidLogin').then((interception) => {
            expect(interception.response.statusCode).eq(401);
            expect(interception.response.body.error).to.have.string('Unauthorized');
        });
        authLogin.errorMsg.should('be.visible');
        authLogin.errorMsg.should('have.text', validationMessages.badCredentials);
        authLogin.errorMsg.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        authLogin.emailInput.should('have.value', userData.randomEmail);
        authLogin.passwordInput.should('have.value', userData.randomPassword);
        header.loginBtn.should('be.visible');
    });

    it('Login without email address and with invalid password', () => {
        authLogin.loginPageHeading.should('be.visible').and('have.text', 'Please login');
        authLogin.login('{selectall}{backspace}', userData.randomPassword);
        authLogin.emailInput.should('have.value', '');
        authLogin.passwordInput.should('have.value', userData.randomPassword);
        header.loginBtn.should('be.visible');
    });

    it('Login with invalid email address and without password', () => {
        authLogin.loginPageHeading.should('be.visible').and('have.text', 'Please login');
        authLogin.login(userData.randomEmail, '{selectall}{backspace}');
        authLogin.emailInput.should('have.value', userData.randomEmail);
        authLogin.passwordInput.should('have.value', '');
        header.loginBtn.should('exist');
    });

    it('Login with valid credentials', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/login'
        }).as('login')

        authLogin.loginPageHeading.should('be.visible').and('have.text', 'Please login');
        authLogin.login(validEmail, validPass);

        cy.wait('@login').then((interception) => {
            expect(interception.response.statusCode).eq(200);
        });
        authLogin.errorMsg.should('not.exist');
        cy.url().should('not.include', '/login');
        header.loginBtn.should('not.exist');
        header.logoutBtn.should('be.visible');
    });

    it('Logout', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/logout'
        }).as('logout');

        authLogin.login(validEmail, validPass);
        cy.url().should('not.contains', '/login');
        header.loginBtn.should('not.exist');
        header.logoutBtn.should('be.visible').click();

        cy.wait('@logout').then((interception) => {
            expect(interception.response.statusCode).eq(200);
        });
        authLogin.loginPageHeading.should('be.visible').and('have.text', 'Please login');
    });
});
