/// <reference types="cypress" />

import { allGalleries } from "../page_objects/allGalleries";
import { myGalleries } from "../page_objects/myGalleries";
import { authLogin } from "../page_objects/authLogin";
import { createGallery } from "../page_objects/createGallery";
import { header } from "../page_objects/header";


describe('POM all galleries', () => {

    let allData = {
        email: 'dina1@test.com',
        password: 'dinatest1',
        galleryTitle: 'sunflower',
        galleryDesc: 'description',
        imageUrl: 'https://onlinejpgtools.com/images/examples-onlinejpgtools/sunflower.jpg'
    }
    before('Login and create gallery', () => {
        cy.visit('/login');
        authLogin.login(allData.email, allData.password);
        cy.url().should('not.include', '/login');
        header.createGalleryBtn.click();
        cy.url().should('contains', '/create');
        createGallery.createGalleryWithOneImg(allData.galleryTitle, allData.galleryDesc, allData.imageUrl);
    });

    it('Testing pagination', () => {
        allGalleries.allGalleriesPageHeading.should('be.visible').and('have.text', 'All Galleries');
        allGalleries.galleryCard.should('have.length', 10);
        allGalleries.loadMoreBtn.click();
        allGalleries.galleryCard.should('have.length', 20);
        allGalleries.loadMoreBtn.click();
        allGalleries.galleryCard.should('have.length', 30);
        allGalleries.loadMoreBtn.click();
        allGalleries.loadMoreBtn.click();
        allGalleries.galleryCard.should('have.length', 50);
    });

    it('Get gallery by clicking on the author', () => {
        allGalleries.allGalleriesPageHeading.should('be.visible').and('have.text', 'All Galleries');
        allGalleries.getGalleryAuthor('Dina Bolta').click();
        cy.url().should('include', '/authors');
        myGalleries.myGalleriesPageHeading.should('contain.text', 'Galleries of');
        allGalleries.inputField.should('exist');
        allGalleries.filterBtn.should('be.visible');
    });

    it('Get gallery by clicking on title', () => {
        header.allGalleriesBtn.should('be.visible');
        header.allGalleriesBtn.click();
        allGalleries.allGalleriesPageHeading.should('be.visible').and('have.text', 'All Galleries');
        allGalleries.getGalleryTitle(allData.galleryTitle).click();
        cy.url().should('contains', '/galleries');
        myGalleries.myGalleriesPageHeading.should('include.text', allData.galleryTitle);
        cy.get('h5').first().should('include.text', 'created by');
        cy.get('h5').last().should('contain.text', 'Comments');
    });
});
