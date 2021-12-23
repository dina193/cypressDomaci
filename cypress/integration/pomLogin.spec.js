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
        authLogin.loginPageHeading.should('be.visible');
        authLogin.login(validEmail, userData.randomPassword);
        authLogin.errorMsg.should('be.visible');
        authLogin.errorMsg.should('have.text', validationMessages.badCredentials);
        authLogin.errorMsg.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        authLogin.emailInput.should('have.value', validEmail);
        header.loginBtn.should('exist');
    });

    it('Login with invalid email address', () => {
        authLogin.loginPageHeading.should('be.visible');
        authLogin.login(userData.randomEmail, validPass);
        authLogin.errorMsg.should('be.visible');
        authLogin.errorMsg.should('have.text', validationMessages.badCredentials);
        authLogin.errorMsg.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        authLogin.passwordInput.should('have.value', validPass);
        header.loginBtn.should('exist');
    });

    it('Login with invalid email address and invalid password', () => {
        authLogin.loginPageHeading.should('be.visible');
        authLogin.login(userData.randomEmail, userData.randomPassword);
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
        authLogin.loginPageHeading.should('be.visible').and('have.text', 'Please login');
        authLogin.login(validEmail, validPass);
        authLogin.errorMsg.should('not.exist');
        cy.url().should('not.include', '/login');
        header.loginBtn.should('not.exist');
        header.logoutBtn.should('be.visible');
    });

    it('Logout', () => {
        authLogin.login(validEmail, validPass);
        cy.url().should('not.contains', '/login');
        header.loginBtn.should('not.exist');
        header.logoutBtn.should('be.visible').click();
        authLogin.loginPageHeading.should('be.visible').and('have.text', 'Please login');
    });
});
