class CreateGallery {
    get titleInput() {
        return cy.get("#title");
    }

    get descriptionInput() {
        return cy.get("#description");
    }

    get imageInput() {
        return cy.get("input[placeholder='image url']");
    }

    get addImageBtn() {
        return cy.get("button[type='button']").contains('Add image');
    }

    get upArrowBtn() {
        return cy.get(".input-buttons").eq(0);
    }

    get downArrowBtn() {
        return cy.get(".input-buttons").eq(1);
    }

    get submitBtn() {
        return cy.get("button[type='submit']").contains('Submit');
    }

    get cancelBtn() {
        return cy.get("button[type='submit']").contains('Cancel');
    }

    createGalleryWithOneImg(title, description, imageUrl) {
        this.titleInput.clear().type(title);
        this.descriptionInput.clear().type(description);
        this.imageInput.clear().type(imageUrl);
        this.submitBtn.click();
    }
}

export const createGallery = new CreateGallery();
