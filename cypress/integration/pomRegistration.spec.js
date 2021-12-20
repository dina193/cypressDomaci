/// <reference types="cypress" />

import { header } from '../page_objects/header';
import { authRegister } from '../page_objects/authRegister';

const faker = require("faker");

describe('POM registration', () => {

    let invalidUserData = {
        emailMissingAtSign: 'dina729gmail.com',
        emailMissingDotCom: 'dina729@gmail',
        emailMissingDot: 'dina729@gmailcom',
        email2Dots: 'dina729@gmail..com',
        emailDotBeforeAt: 'dina729.@gmail.com',
        takenEmail: 'dina1@test.com'
    }
    
    let userData = {
        randomFirstName: faker.name.findName(),
        randomLastName: faker.name.lastName(),
        randomEmail: faker.internet.email(),
        randomPassword: faker.internet.password(8) + '1',
        randomNewPassword: faker.internet.password(8) + '1',
        randomShortPassword: faker.internet.password(6),
        randomPassWithoutDigit: faker.lorem.word(8)
    }

    before('visit app page', () => {
        cy.visit('/');
        cy.url().should('contains', 'https://gallery-app');
    });

    it('Register with all empty fields', () => {
        header.registerBtn.click();
        authRegister.submitBtn.click();
        cy.url().should('contains', '/register');
    });

    it('Register without first name', () => {
        header.registerBtn.click();
        authRegister.registerWithoutName(userData.randomLastName, userData.randomEmail, userData.randomPassword, userData.randomPassword);
        cy.url().should('contains', '/register');
    });

    it('Register without last name', () => {
        header.registerBtn.click();
        authRegister.registerWithoutLastName(userData.randomFirstName, userData.randomEmail, userData.randomPassword, userData.randomPassword);
        cy.url().should('contains', '/register');
    });

    it('Register without email address', () => {
        header.registerBtn.click();
        authRegister.registerWithoutEmail(userData.randomFirstName, userData.randomLastName, userData.randomPassword, userData.randomPassword);
        cy.url().should('contains', '/register');
    });

    it('Register with invalid email address-missing @', () => {
        header.registerBtn.click();
        authRegister.register(userData.randomFirstName, userData.randomLastName, invalidUserData.emailMissingAtSign, userData.randomPassword, userData.randomPassword);
        cy.url().should('contains', '/register');
    });

    it('Register with invalid email address-missing .com', () => {
        header.registerBtn.click();
        authRegister.register(userData.randomFirstName, userData.randomLastName, invalidUserData.emailMissingDotCom, userData.randomPassword, userData.randomPassword);
        cy.url().should('contains', '/register');
    });

    it('Register with invalid email address-missing .', () => {
        header.registerBtn.click();
        authRegister.register(userData.randomFirstName, userData.randomLastName, invalidUserData.emailMissingDot, userData.randomPassword, userData.randomPassword);
        cy.url().should('contains', '/register');
    });

    it('Register with invalid email address-contains two .', () => {
        header.registerBtn.click();
        authRegister.register(userData.randomFirstName, userData.randomLastName, invalidUserData.email2Dots, userData.randomPassword, userData.randomPassword);
        cy.url().should('contains', '/register');
    });

    it('Register with invalid email address-contains . before @', () => {
        header.registerBtn.click();
        authRegister.register(userData.randomFirstName, userData.randomLastName, invalidUserData.emailDotBeforeAt, userData.randomPassword, userData.randomPassword);
        cy.url().should('contains', '/register');
    });

    it('Register with invalid email address-contains . at the beginning', () => {
        header.registerBtn.click();
        authRegister.register(userData.randomFirstName, userData.randomLastName, '.' + userData.randomEmail, userData.randomPassword, userData.randomPassword);
        cy.url().should('contains', '/register');
    });

    it('Register without password and password confirmation', () => {
        header.registerBtn.click();
        authRegister.registerWithoutPassAndPassConf(userData.randomFirstName, userData.randomLastName, userData.randomEmail);
        cy.url().should('contains', '/register');
    });

    it('Register without password confirmation', () => {
        header.registerBtn.click();
        authRegister.registerWithoutPassConf(userData.randomFirstName, userData.randomLastName, userData.randomEmail, userData.randomPassword);
        cy.url().should('contains', '/register');
    });

    it('Register with invalid password-less than 8 characters', () => {
        header.registerBtn.click();
        cy.url().should('contains', '/register');
        authRegister.register(userData.randomFirstName, userData.randomLastName, userData.randomEmail, userData.randomShortPassword, userData.randomShortPassword);
    });

    it('Register with invalid password-without a digit', () => {
        header.registerBtn.click();
        authRegister.register(userData.randomFirstName, userData.randomLastName, userData.randomEmail, userData.randomPassWithoutDigit, userData.randomPassWithoutDigit);
        cy.url().should('contains', '/register');
    });

    it("Register if password and password confirmation don't match", () => {
        header.registerBtn.click();
        authRegister.register(userData.randomFirstName, userData.randomLastName, userData.randomEmail, userData.randomPassword, userData.randomNewPassword);
    });

    it('Register with unchecked terms and conditions', () => {
        header.registerBtn.click();
        authRegister.uncheckedTerms(userData.randomFirstName, userData.randomLastName, userData.randomEmail, userData.randomPassword, userData.randomPassword);
        cy.url().should('contains', '/register');
    });

    it('Register with already taken email address', () => {
        header.registerBtn.click();
        authRegister.register(userData.randomFirstName, userData.randomLastName, invalidUserData.takenEmail, userData.randomPassword, userData.randomPassword);
        cy.url().should('contains', '/register');
    });

    it('Register with valid credentials', () => {
        header.registerBtn.click();
        cy.url().should('contains', '/register');
        authRegister.register(userData.randomFirstName, userData.randomLastName, userData.randomEmail, userData.randomPassword, userData.randomPassword);
        cy.url().should('not.contains', '/register');
    });
});
