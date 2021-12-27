class ViewGallery {
    get viewGalleryPageSubheadings() {
        return cy.get("h5");
    }

    get viewGalleryPageHeading() {
        return cy.get("h1");
    }

    get commentInput() {
        return cy.get("textarea");
    }

    get submitBtn() {
        return cy.get("button").contains("Submit");
    }

    get deleteBtn() {
        return cy.get("button").contains("Delete Gallery");
    }

    get editGalleryBtn() {
        return cy.get("a").contains("Edit Gallery");
    }

    get deleteCommentBtn() {
        return cy.get("button").eq(1);
    }

    get commentList() {
        return cy.get("ul[class='list-group']");
    }

    commentGallery(comment) {
        this.commentInput.type(comment);
        this.submitBtn.click();
    }

    findComment(comment) {
        return this.commentList.find("li").contains(comment);
    }
}

export const viewGallery = new ViewGallery();
