class ViewGallery {
    get viewGalleryPageSubheadings() {
        return cy.get("h5");
    }

    get viewGalleryPageHeading() {
        return cy.get("h1");
    }
}

export const viewGallery = new ViewGallery();
