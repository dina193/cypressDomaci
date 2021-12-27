/// <reference types="cypress" />

import { header } from "../page_objects/header";
import { createGallery } from "../page_objects/createGallery";
import { validationMessages } from '../fixtures/validationMessages.json';
import { allGalleries } from "../page_objects/allGalleries";
import { myGalleries } from "../page_objects/myGalleries";

const faker = require("faker");

describe('POM create gallery', () => {
    let galleryId = '';
    let authToken = window.localStorage.getItem('token');

    let galleryData = {
        randomValidTitle: faker.random.word(),
        randomValidDescription: faker.random.words(),
        validImg: `${faker.image.imageUrl()}.jpg`,
        shortTitle: faker.lorem.word(1),
        longTitle: faker.lorem.sentences(10),
        longDescription: faker.lorem.words(155),
        invalidImg: faker.image.imageUrl(),
        realImgUrl: 'https://tinypng.com/images/social/developer-api.jpg'
    }

    beforeEach('Login and open create gallery page', () => {
        cy.loginViaBackend();
        cy.visit('/');
        header.loginBtn.should('not.exist');
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
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGalleryWithShortTitle');

        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.createGalleryWithOneImg(galleryData.shortTitle, galleryData.randomValidDescription, galleryData.validImg);
        
        cy.wait('@createGalleryWithShortTitle').then((interception) => {
            expect(interception.response.statusCode).eq(422);
        });
        createGallery.titleInput.should('have.value', galleryData.shortTitle);
        createGallery.errorMessage.should('be.visible');
        createGallery.errorMessage.should('have.text', validationMessages.shortTitle);
        createGallery.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
    });

    it('Create gallery with invalid title-more than 255 characters', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGalleryWithLongTitle');

        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.createGalleryWithOneImg(galleryData.longTitle, galleryData.randomValidDescription, galleryData.validImg);
        
        cy.wait('@createGalleryWithLongTitle').then((interception) => {
            expect(interception.response.statusCode).eq(422);
        });
        createGallery.errorMessage.should('be.visible');
        createGallery.errorMessage.should('have.text', validationMessages.longTitle);
        createGallery.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
    });

    it('Create gallery with invalid description-more than 1000 characters', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGalleryWithLongDesc');

        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.createGalleryWithOneImg(galleryData.randomValidTitle, galleryData.longDescription, galleryData.validImg);
        
        cy.wait('@createGalleryWithLongDesc').then((interception) => {
            expect(interception.response.statusCode).eq(422);
        });
        createGallery.errorMessage.should('be.visible');
        createGallery.errorMessage.should('have.text', validationMessages.longDescription);
        createGallery.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
    });

    it('Create gallery with invalid image format', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGalleryWithInvalidImg');

        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.createGalleryWithOneImg(galleryData.randomValidTitle, galleryData.randomValidDescription, galleryData.invalidImg);
        
        cy.wait('@createGalleryWithInvalidImg').then((interception) => {
            expect(interception.response.statusCode).eq(422);
        });
        createGallery.titleInput.should('have.value', galleryData.randomValidTitle);
        createGallery.descriptionInput.should('have.value', galleryData.randomValidDescription);
        createGallery.errorMessage.should('be.visible');
        createGallery.errorMessage.should('have.text', validationMessages.invalidImgFormat);
        createGallery.errorMessage.should('have.css', 'background-color', 'rgb(248, 215, 218)');
    });

    it('Create gallery without description', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGalleryWithoutDesc');

        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.createGalleryWithOneImg(galleryData.randomValidTitle, '{selectall}{backspace}', galleryData.validImg);
        
        cy.wait('@createGalleryWithoutDesc').then((interception) => {
            expect(interception.response.statusCode).eq(201);
        });
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
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGallery');

        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.createGalleryWithOneImg(galleryData.randomValidTitle, galleryData.randomValidDescription, galleryData.validImg);
        
        cy.wait('@createGallery').then((interception) => {
            expect(interception.response.statusCode).eq(201);
            galleryId = interception.response.body.id;
        });
        createGallery.titleInput.should('have.value', galleryData.randomValidTitle);
        createGallery.descriptionInput.should('have.value', galleryData.randomValidDescription);
        createGallery.imageInput.should('have.value', galleryData.validImg);
        cy.url().should('not.contains', '/create');
        createGallery.createGalleryPageHeading.should('not.exist');
        cy.url().should('include', '/my-galleries');
    });

    it('Create gallery via backend', () => {
        cy.request({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries',
            headers: {
                authorization: `Bearer ${authToken}`
            },
            body: {
                title: galleryData.randomValidTitle,
                description: galleryData.randomValidDescription,
                images: [galleryData.realImgUrl]
            }
        });

        cy.visit('/');
        allGalleries.getGalleryTitle(galleryData.randomValidTitle).should('be.visible');
    });
});
