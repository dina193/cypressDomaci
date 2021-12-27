/// <reference types="cypress" />

import { header } from "../page_objects/header";
import { viewGallery } from "../page_objects/viewGalleryPage";
import { myGalleries } from "../page_objects/myGalleries";

describe('Test view gallery page via backend', () => {
   let authToken = window.localStorage.getItem('token');
   let galleryId = '';
   let commentId = '';

   let allData = {
       title: 'Some title',
       description: 'Some description',
       imageUrl: 'https://tinypng.com/images/social/website-xmas.jpg',
       editedTitle: 'Edited title',
       editedDesc: 'Edited description',
       editedImgUrl: 'https://pbs.twimg.com/media/Dq_ImmxWwAAgKrW.jpg',
       commentGallery: 'comment from backend'
   }

    beforeEach(('Login via backend'), () => {
        cy.loginViaBackend();
        cy.visit('/');
        header.loginBtn.should('not.exist');
    });

    it('Create gallery via backend', () => {
        cy.request({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries',
            headers: {
                authorization: `Bearer ${authToken}`
            },
            body: {
                title: allData.title,
                description: allData.description,
                images: [allData.imageUrl]
            }
        }).its('body').then((response) => {
            galleryId = response.id;
        });

        cy.visit('/my-galleries');
        myGalleries.galleryCard.contains(allData.title).should('exist');
    });

    it('Edit gallery via backend', () => {
        cy.request({
            method: 'PUT',
            url: `https://gallery-api.vivifyideas.com/api/galleries/${galleryId}`,
            headers: {
                authorization: `Bearer ${authToken}`
            },
            body: {
                title: allData.editedTitle,
                description: allData.editedDesc,
                images: [allData.editedImgUrl]
            }
        });

        cy.visit(`galleries/${galleryId}`);
        viewGallery.viewGalleryPageHeading.should('have.text', allData.editedTitle);
    });

    it('Comment gallery via backend', () => {
        cy.request({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/comments',
            headers: {
                authorization: `Bearer ${authToken}`
            },
            body: {
                gallery_id: galleryId,
                body: allData.commentGallery
            }
        }).its('body').then((response) => {
            commentId = response[0].id;
        });

        cy.visit(`/galleries/${galleryId}`);
        viewGallery.findComment(allData.commentGallery).should('be.visible').and('include.text', allData.commentGallery);
    });

    it('Delete comment via backend', () => {
        cy.request({
            method: 'DELETE',
            url: `https://gallery-api.vivifyideas.com/api/comments/${commentId}`,
            headers: {
                authorization: `Bearer ${authToken}`
            }
        });

        cy.visit(`/galleries/${galleryId}`);
        viewGallery.commentList.should('not.exist');
    });

    it('Delete gallery via backend', () => {
        cy.request({
            method: 'DELETE',
            url: `https://gallery-api.vivifyideas.com/api/galleries/${galleryId}`,
            headers: {
                authorization: `Bearer ${authToken}`
            }
        });

        cy.visit('/my-galleries');
        myGalleries.galleryCard.contains(allData.editedTitle).should('not.exist');
    });
});
