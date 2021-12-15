/// <reference types="cypress" />

describe('Registration test', () => {

    it('Register with all empty fields', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('button[type="submit"]').click();
    });

    it('Register without first name', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#last-name').type('Bolta');
        cy.get('#email').type('dina729@gmail.com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('.form-check-input').click();
        cy.get('button[type="submit"]').click();
    });

    it('Register without last name', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Dina');
        cy.get('#email').type('dina729@gmail.com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('.form-check-input').click();
        cy.get('button[type="submit"]').click();
    });

    it('Register without email address', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Dina');
        cy.get('#last-name').type('Bolta');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('.form-check-input').click();
        cy.get('button[type="submit"]').click();
    });

    it('Register with invalid email address-missing @', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Dina');
        cy.get('#last-name').type('Bolta');
        cy.get('#email').type('dina729gmail.com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('.form-check-input').click();
        cy.get('button[type="submit"]').click();
    });

    it('Register with invalid email address-missing .com', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Dina');
        cy.get('#last-name').type('Bolta');
        cy.get('#email').type('dina729@gmail');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('.form-check-input').click();
        cy.get('button[type="submit"]').click();
    });

    it('Register with invalid email address-missing .', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Dina');
        cy.get('#last-name').type('Bolta');
        cy.get('#email').type('dina729@gmailcom');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('.form-check-input').click();
        cy.get('button[type="submit"]').click();
    });

    it('Register with invalid email address-contains two .', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Dina');
        cy.get('#last-name').type('Bolta');
        cy.get('#email').type('dina729@gmail..com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('.form-check-input').click();
        cy.get('button[type="submit"]').click();
    });

    it('Register with invalid email address-contains . before @', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Dina');
        cy.get('#last-name').type('Bolta');
        cy.get('#email').type('dina729.@gmail.com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('.form-check-input').click();
        cy.get('button[type="submit"]').click();
    });

    it('Register with invalid email address-contains . at the beginning', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Dina');
        cy.get('#last-name').type('Bolta');
        cy.get('#email').type('.dina729@gmail.com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('.form-check-input').click();
        cy.get('button[type="submit"]').click();
    });

    it('Register without password and password confirmation', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Dina');
        cy.get('#last-name').type('Bolta');
        cy.get('#email').type('dina729@gmail.com');
        cy.get('.form-check-input').click();
        cy.get('button[type="submit"]').click();
    });

    it('Register without password confirmation', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Dina');
        cy.get('#last-name').type('Bolta');
        cy.get('#email').type('dina729@gmail.com');
        cy.get('#password').type('test1234');
        cy.get('.form-check-input').click();
        cy.get('button[type="submit"]').click();
    });

    it('Register with invalid password-less than 8 characters', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Dina');
        cy.get('#last-name').type('Bolta');
        cy.get('#email').type('dina729@gmail.com');
        cy.get('#password').type('test12');
        cy.get('#password-confirmation').type('test12');
        cy.get('.form-check-input').click();
        cy.get('button[type="submit"]').click();
    });

    it('Register with invalid password-without a digit', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Dina');
        cy.get('#last-name').type('Bolta');
        cy.get('#email').type('dina729@gmail.com');
        cy.get('#password').type('testtestt');
        cy.get('#password-confirmation').type('testtestt');
        cy.get('.form-check-input').click();
        cy.get('button[type="submit"]').click();
    });

    it('Register if password and password confirmation don\'t match', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Dina');
        cy.get('#last-name').type('Bolta');
        cy.get('#email').type('dina729@gmail.com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test123 ');
        cy.get('.form-check-input').click();
        cy.get('button[type="submit"]').click();
    });

    it('Register with unchecked terms and conditions', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Dina');
        cy.get('#last-name').type('Bolta');
        cy.get('#email').type('dina729@gmail.com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('button[type="submit"]').click();
    });

    it('Register with already taken email address', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Dina');
        cy.get('#last-name').type('Bolta');
        cy.get('#email').type('dina1@test.com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('.form-check-input').click();
        cy.get('button[type="submit"]').click();
    });

    it('Register with valid credentials', () => {
        cy.visit('/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Dina');
        cy.get('#last-name').type('Bolta');
        cy.get('#email').type('dina7299@gmail.com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('.form-check-input').click();
        cy.get('button[type="submit"]').click();
    });
})