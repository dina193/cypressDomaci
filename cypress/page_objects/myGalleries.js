class MyGalleries {
    get myGalleriesPageHeading() {
        return cy.get("h1");
    }

    get galleryCard() {
        return cy.get(".cell");
    }

    getGalleryTitle(title) {
        return this.galleryCard.find("h2").contains(title);
    }
}

export const myGalleries = new MyGalleries();
