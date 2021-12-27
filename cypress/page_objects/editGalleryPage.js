class EditGallery {
    get titleInput() {
        return cy.get("#title");
    }

    get descInput() {
        return cy.get("#description");
    }

    get imgInput() {
        return cy.get("input[placeholder='image url']");
    }

    get submitButton() {
        return cy.get("button").contains("Submit");
    }

    editSpecificGallery(title, desc, imgUrl) {
        this.titleInput.clear().type(title);
        this.descInput.clear().type(desc);
        this.imgInput.clear().type(imgUrl);
        this.submitButton.click();
    }
}

export const editGallery = new EditGallery();
