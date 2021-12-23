class AllGalleries {
    get inputField() {
        return cy.get(".form-control");
    }

    get filterBtn() {
        return cy.get(".input-button");
    }

    get loadMoreBtn() {
        return cy.get(".btn-custom");
    }

    get galleryCard() {
        return cy.get(".cell");
    }

    get allGalleriesPageHeading() {
        return cy.get("h1");
    }

    filterGalleries(searchWord) {
        this.inputField.clear().type(searchWord);
        this.filterBtn.click();
    }

    getGalleryTitle(title) {
       return this.galleryCard.find("h2").contains(title);
    }

    getGalleryAuthor(author) {
        return this.galleryCard.find("p").contains(author);
    }
}

export const allGalleries = new AllGalleries();
