/// <reference types="cypress" />

import { header } from "../page_objects/header";
import { createGallery } from "../page_objects/createGallery";
import { viewGallery } from "../page_objects/viewGalleryPage";
import { editGallery } from "../page_objects/editGalleryPage";
import { allGalleries } from "../page_objects/allGalleries";

describe('Test view gallery page', () => {
    let galleryId = '';
    let commentId = '';
    
    let allData = {
        title: 'Title',
        description: 'gallery description',
        imageUrl: 'https://tinypng.com/images/social/developer-api.jpg',
        galleryComment: 'great',
        editedTitle: 'Another title',
        editedDescription: 'new description',
        newImgUrl: 'https://tinypng.com/images/social/website-xmas.jpg'
    }

    beforeEach('Login and visit create gallery page', () => {
        cy.loginViaBackend();
        cy.visit('/');
        header.loginBtn.should('not.exist');
        header.createGalleryBtn.click();
        cy.url().should('include', '/create');
    });

    it('Create gallery with valid data', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGallery');

        createGallery.createGalleryPageHeading.should('be.visible');
        createGallery.createGalleryWithOneImg(allData.title, allData.description, allData.imageUrl);

        cy.wait('@createGallery').then((interception) => {
            expect(interception.response.statusCode).eq(201);
            galleryId = interception.response.body.id;
        });

        cy.url().should('not.contains', '/create');
        createGallery.createGalleryPageHeading.should('not.exist');
    });

    it('Visit and comment on specific gallery', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/comments'
        }).as('commentGallery');

        cy.visit(`/galleries/${galleryId}`);
        cy.url(`/galleries/${galleryId}`);

        viewGallery.commentGallery(allData.galleryComment);

        cy.wait('@commentGallery').then((interception) => {
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.body[0].body).to.have.string(allData.galleryComment);
            commentId = interception.response.body[0].id;
        });

        viewGallery.findComment(allData.galleryComment).should('be.visible').and('include.text', allData.galleryComment);
    });

    it('Delete comment', () => {
        cy.intercept({
            method: 'DELETE',
            url: `https://gallery-api.vivifyideas.com/api/comments/${commentId}`
        }).as('deleteComment');

        cy.visit(`/galleries/${galleryId}`);
        cy.url(`/galleries/${galleryId}`);

        viewGallery.deleteCommentBtn.click();

        cy.wait('@deleteComment').then((interception) => {
            expect(interception.response.statusCode).eq(200);
        });
    });

    it('Edit gallery', () => {
        cy.intercept({
            method: 'PUT',
            url: `https://gallery-api.vivifyideas.com/api/galleries/${galleryId}`
        }).as('editGallery');

        cy.visit(`/edit-gallery/${galleryId}`);
        cy.url(`/edit-gallery/${galleryId}`);
        
        editGallery.editSpecificGallery(allData.editedTitle, allData.editedDescription, allData.newImgUrl);

        cy.wait('@editGallery').then((interception) => {
            expect(interception.response.statusCode).eq(200);
        });

        viewGallery.viewGalleryPageHeading.should('be.visible').and('include.text', allData.editedTitle);
    });

    it('Delete gallery', () => {
        cy.intercept({
            method: 'DELETE',
            url: `https://gallery-api.vivifyideas.com/api/galleries/${galleryId}`
        }).as('deleteGallery');

        cy.visit(`/galleries/${galleryId}`);
        cy.url(`/galleries/${galleryId}`);

        viewGallery.deleteBtn.click();

        cy.wait('@deleteGallery').then((interception) => {
            expect(interception.response.statusCode).eq(200);
        });
        allGalleries.allGalleriesPageHeading.should('be.visible').and('include.text', 'All Galleries')
    });
});
