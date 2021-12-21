/// <reference types="cypress" />

import { header } from '../page_objects/header';
import { authRegister } from '../page_objects/authRegister';
import { validationMessages } from '../fixtures/validationMessages.json';

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
        randomShortPassword: `${faker.internet.password(5)}1`,
        randomPassWithoutDigit: faker.lorem.word(8)
    }

    beforeEach('visit app page and open register page', () => {
        cy.visit('/');
        cy.url().should('contains', 'https://gallery-app');
        header.registerBtn.click();
        cy.url().should('contains', '/register');
    });

    it('Register with all empty fields', () => {
        authRegister.submitBtn.click();
        authRegister.registerPageHeading.should('be.visible');
        authRegister.firstNameInput.should('have.value', '');
        authRegister.lastNameInput.should('have.value', '');
        authRegister.emailInput.should('have.value', '');
        authRegister.passwordInput.should('have.value', '');
        authRegister.confirmedPasswordInput.should('have.value', '');
    });

    it('Register without first name', () => {
        authRegister.register('{selectall}{backspace}', userData.randomLastName, userData.randomEmail, userData.randomPassword, userData.randomPassword);
        authRegister.registerPageHeading.should('be.visible');
        authRegister.firstNameInput.should('have.value', '');
        header.registerBtn.should('be.visible');
    });

    it('Register without last name', () => {
        authRegister.register(userData.randomFirstName, '{selectall}{backspace}', userData.randomEmail, userData.randomPassword, userData.randomPassword);
        authRegister.registerPageHeading.should('be.visible');
        authRegister.lastNameInput.should('have.value', '');
        header.registerBtn.should('be.visible');
    });

    it('Register without email address', () => {
        authRegister.register(userData.randomFirstName, userData.randomLastName, '{selectall}{backspace}', userData.randomPassword, userData.randomPassword);
        authRegister.registerPageHeading.should('be.visible');
        authRegister.emailInput.should('have.value', '');
        header.registerBtn.should('be.visible');
    });

    it('Register with invalid email address-missing @', () => {
        authRegister.register(userData.randomFirstName, userData.randomLastName, invalidUserData.emailMissingAtSign, userData.randomPassword, userData.randomPassword);
        authRegister.registerPageHeading.should('be.visible');
        header.registerBtn.should('be.visible');
        authRegister.emailInput.should('have.value', invalidUserData.emailMissingAtSign);
    });

    it('Register with invalid email address-missing .com', () => {
        authRegister.register(userData.randomFirstName, userData.randomLastName, invalidUserData.emailMissingDotCom, userData.randomPassword, userData.randomPassword);
        authRegister.registerPageHeading.should('be.visible');
        
        authRegister.errorMessage.should('be.visible');
        authRegister.errorMessage.should('have.text', validationMessages.invalidEmail);
        authRegister.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        header.registerBtn.should('exist');
    });

    it('Register with invalid email address-missing .', () => {
        authRegister.registerPageHeading.should('be.visible');
        authRegister.register(userData.randomFirstName, userData.randomLastName, invalidUserData.emailMissingDot, userData.randomPassword, userData.randomPassword);

        authRegister.errorMessage.should('be.visible');
        authRegister.errorMessage.should('have.text', validationMessages.invalidEmail);
        authRegister.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        header.registerBtn.should('exist');
    });

    it('Register with invalid email address-contains two .', () => {
        authRegister.register(userData.randomFirstName, userData.randomLastName, invalidUserData.email2Dots, userData.randomPassword, userData.randomPassword);
        authRegister.registerPageHeading.should('be.visible');
        header.registerBtn.should('be.visible');
        authRegister.emailInput.should('have.value', invalidUserData.email2Dots);
    });

    it('Register with invalid email address-contains . before @', () => {
        authRegister.registerPageHeading.should('be.visible');
        authRegister.register(userData.randomFirstName, userData.randomLastName, invalidUserData.emailDotBeforeAt, userData.randomPassword, userData.randomPassword);
        
        authRegister.errorMessage.should('be.visible');
        authRegister.errorMessage.should('have.text', validationMessages.invalidEmail);
        authRegister.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        header.registerBtn.should('exist');
    });

    it('Register with invalid email address-contains . at the beginning', () => {
        authRegister.registerPageHeading.should('be.visible');
        authRegister.register(userData.randomFirstName, userData.randomLastName, '.' + userData.randomEmail, userData.randomPassword, userData.randomPassword);
        
        authRegister.errorMessage.should('be.visible');
        authRegister.errorMessage.should('have.text', validationMessages.invalidEmail);
        authRegister.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        header.registerBtn.should('be.visible');
    });

    it('Register without password and password confirmation', () => {
        authRegister.register(userData.randomFirstName, userData.randomLastName, userData.randomEmail, '{selectall}{backspace}', '{selectall}{backspace}');
        authRegister.registerPageHeading.should('be.visible');
        authRegister.passwordInput.should('have.value', '');
        authRegister.confirmedPasswordInput.should('have.value', '');
        header.registerBtn.should('be.visible');
    });

    it('Register without password confirmation', () => {
        authRegister.register(userData.randomFirstName, userData.randomLastName, userData.randomEmail, userData.randomPassword, '{selectall}{backspace}');
        authRegister.registerPageHeading.should('be.visible');
        authRegister.confirmedPasswordInput.should('have.value', '');
        header.registerBtn.should('be.visible');
    });

    it('Register with invalid password-less than 8 characters', () => {
        authRegister.register(userData.randomFirstName, userData.randomLastName, userData.randomEmail, userData.randomShortPassword, userData.randomShortPassword);
        authRegister.registerPageHeading.should('be.visible');

        authRegister.errorMessage.should('be.visible');
        authRegister.errorMessage.should('have.text', validationMessages.shortPass);
        authRegister.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        header.registerBtn.should('exist');
    });

    it('Register with invalid password-without a digit', () => {
        authRegister.registerPageHeading.should('be.visible');
        authRegister.register(userData.randomFirstName, userData.randomLastName, userData.randomEmail, userData.randomPassWithoutDigit, userData.randomPassWithoutDigit);
        
        authRegister.errorMessage.should('be.visible');
        authRegister.errorMessage.should('have.text', validationMessages.invalidPassFormat);
        authRegister.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        header.registerBtn.should('exist');
    });

    it("Register if password and password confirmation don't match", () => {
        authRegister.registerPageHeading.should('be.visible');
        authRegister.register(userData.randomFirstName, userData.randomLastName, userData.randomEmail, userData.randomPassword, userData.randomNewPassword);

        authRegister.errorMessage.should('be.visible');
        authRegister.errorMessage.should('have.text', validationMessages.confMismatch);
        authRegister.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        header.registerBtn.should('exist');
    });

    it('Register with unchecked terms and conditions', () => {
        authRegister.registerPageHeading.should('be.visible');
        authRegister.uncheckedTerms(userData.randomFirstName, userData.randomLastName, userData.randomEmail, userData.randomPassword, userData.randomPassword);

        authRegister.errorMessage.should('be.visible');
        authRegister.errorMessage.should('have.text', validationMessages.termsMustBeAccepted);
        authRegister.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        header.registerBtn.should('exist');
    });

    it('Register with already taken email address', () => {
        authRegister.registerPageHeading.should('be.visible');
        authRegister.register(userData.randomFirstName, userData.randomLastName, invalidUserData.takenEmail, userData.randomPassword, userData.randomPassword);
        
        authRegister.errorMessage.should('be.visible');
        authRegister.errorMessage.should('have.text', validationMessages.emailTaken);
        authRegister.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        header.registerBtn.should('be.visible');
    });

    it('Register with valid credentials', () => {
        authRegister.registerPageHeading.should('be.visible');
        authRegister.register(userData.randomFirstName, userData.randomLastName, userData.randomEmail, userData.randomPassword, userData.randomPassword);
        
        authRegister.errorMessage.should('not.exist');
        cy.url().should('not.contains', '/register');
        header.registerBtn.should('not.exist');
        header.logoutBtn.should('be.visible');
    });
});
