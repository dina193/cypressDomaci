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

    get createGalleryPageHeading() {
        return cy.get("h1").contains("Create Gallery");
    }

    get errorMessage() {
        return cy.get(".alert-danger");
    }

    createGalleryWithOneImg(title, description, imageUrl) {
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imageInput.type(imageUrl);
        this.submitBtn.click();
    }

    cancelCreatingGallery(title, description, imageUrl) {
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imageInput.type(imageUrl);
        this.cancelBtn.click();
    }
}

export const createGallery = new CreateGallery();
