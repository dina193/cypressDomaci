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

    get gallery() {
        return cy.get(".cell");
    }

    filterGalleries(searchWord) {
        this.inputField.clear().type(searchWord);
        this.filterBtn.click();
    }

    getGalleryTitle() {
        this.gallery.find(".box-title");
    }
}

export const allGalleries = new AllGalleries();
