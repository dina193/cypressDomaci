/// <reference types="cypress" />

import { header } from "../page_objects/header";
import { createGallery } from "../page_objects/createGallery";
import { validationMessages } from '../fixtures/validationMessages.json';
import { authLogin } from "../page_objects/authLogin";
import { myGalleries } from "../page_objects/myGalleries";

const faker = require("faker");

describe('POM create gallery', () => {

    let galleryData = {
        randomValidTitle: faker.random.word(),
        randomValidDescription: faker.random.words(),
        validImg: `${faker.image.imageUrl()}.jpg`,
        shortTitle: faker.lorem.word(1),
        longTitle: faker.lorem.sentences(10),
        longDescription: faker.lorem.words(155),
        invalidImg: faker.image.imageUrl()
    }

    beforeEach('Login and open create gallery page', () => {
        cy.visit('/login');
        authLogin.login('dina1@test.com', 'dinatest1');
        cy.url().should('not.include', '/login');
        header.createGalleryBtn.click();
        cy.url().should('include', '/create');  
    });

    it('Create gallery with all empty fields', () => {
        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.createGalleryWithOneImg('{selectall}{backspace}', '{selectall}{backspace}', '{selectall}{backspace}');
        createGallery.titleInput.should('have.value', '');
        createGallery.descriptionInput.should('have.value', '');
        createGallery.imageInput.should('have.value', '');
    });

    it('Create gallery without title', () => {
        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.createGalleryWithOneImg('{selectall}{backspace}', galleryData.randomValidDescription, galleryData.validImg);
        createGallery.titleInput.should('have.value', '');
        createGallery.descriptionInput.should('have.value', galleryData.randomValidDescription);
        createGallery.imageInput.should('have.value', galleryData.validImg);
        createGallery.errorMessage.should('not.exist');
    });

    it('Create gallery without image url', () => {
        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.createGalleryWithOneImg(galleryData.randomValidTitle, galleryData.randomValidDescription, '{selectall}{backspace}');
        createGallery.titleInput.should('have.value', galleryData.randomValidTitle);
        createGallery.descriptionInput.should('have.value', galleryData.randomValidDescription);
        createGallery.imageInput.should('have.value', '');
    });

    it('Create gallery with invalid title-less than 2 characters', () => {
        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.createGalleryWithOneImg(galleryData.shortTitle, galleryData.randomValidDescription, galleryData.validImg);
        createGallery.titleInput.should('have.value', galleryData.shortTitle);
        createGallery.errorMessage.should('be.visible');
        createGallery.errorMessage.should('have.text', validationMessages.shortTitle);
        createGallery.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
    });

    it('Create gallery with invalid title-more than 255 characters', () => {
        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.createGalleryWithOneImg(galleryData.longTitle, galleryData.randomValidDescription, galleryData.validImg);
        createGallery.errorMessage.should('be.visible');
        createGallery.errorMessage.should('have.text', validationMessages.longTitle);
        createGallery.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
    });

    it('Create gallery with invalid description-more than 1000 characters', () => {
        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.createGalleryWithOneImg(galleryData.randomValidTitle, galleryData.longDescription, galleryData.validImg);
        createGallery.errorMessage.should('be.visible');
        createGallery.errorMessage.should('have.text', validationMessages.longDescription);
        createGallery.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
    });

    it('Create gallery with invalid image format', () => {
        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.createGalleryWithOneImg(galleryData.randomValidTitle, galleryData.randomValidDescription, galleryData.invalidImg);
        createGallery.titleInput.should('have.value', galleryData.randomValidTitle);
        createGallery.descriptionInput.should('have.value', galleryData.randomValidDescription);
        createGallery.errorMessage.should('be.visible');
        createGallery.errorMessage.should('have.text', validationMessages.invalidImgFormat);
        createGallery.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
    });

    it('Create gallery without description', () => {
        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.createGalleryWithOneImg(galleryData.randomValidTitle, '{selectall}{backspace}', galleryData.validImg);
        createGallery.titleInput.should('have.value', galleryData.randomValidTitle);
        createGallery.descriptionInput.should('have.value', '');
        createGallery.imageInput.should('have.value', galleryData.validImg);
        cy.url().should('not.contains', '/create');
        cy.url().should('include', '/my-galleries');
    });

    it('Click on cancel button when all fields are empty', () => {
        createGallery.createGalleryPageHeading.should('be.visible').and('have.text', 'Create Gallery');
        createGallery.cancelBtn.click();
        cy.url().should('not.include', '/create');
        createGallery.createGalleryPageHeading.should('not.exist');
        cy.url().should('contains', '/my-galleries');
    });

    it('Enter valid data and click on cancel button', () => {
        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.cancelCreatingGallery(galleryData.randomValidTitle, galleryData.randomValidDescription, galleryData.validImg);
        cy.url().should('not.contains', '/create');
        createGallery.createGalleryPageHeading.should('not.exist');
        header.myGalleriesBtn.click();
        cy.url().should('contains', '/my-galleries');
        myGalleries.myGalleriesPageHeading.should('be.visible').and('have.text', 'My Galleries');
        myGalleries.getGalleryTitle(galleryData.randomValidTitle).should('not.exist');
    });

    it('Create gallery with valid data', () => {
        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.createGalleryWithOneImg(galleryData.randomValidTitle, galleryData.randomValidDescription, galleryData.validImg);
        createGallery.titleInput.should('have.value', galleryData.randomValidTitle);
        createGallery.descriptionInput.should('have.value', galleryData.randomValidDescription);
        createGallery.imageInput.should('have.value', galleryData.validImg);
        cy.url().should('not.contains', '/create');
        createGallery.createGalleryPageHeading.should('not.exist');
        cy.url().should('include', '/my-galleries');
    });
});
