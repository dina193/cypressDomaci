class Header {
    get loginBtn() {
        return cy.get("a[href='/login']");
    }

    get registerBtn() {
        return cy.get("a[href='/register']");
    }

    get createGalleryBtn() {
        return cy.get("a[href='/create']");
    }

    get allGalleriesBtn() {
        return cy.get("a[href='/']").eq(1);
    }

    get logoutBtn() {
        return cy.get("a[role='button ']");
    }
}

export const header = new Header();
