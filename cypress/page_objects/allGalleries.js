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

    get firstGallery() {
        return cy.get(".box-title").eq(0);
    }

    get secondGallery() {
        return cy.get(".box-title").eq(2);
    }

    get thirdGallery() {
        return cy.get(".box-title").eq(4);
    }

    get gallery4() {
        return cy.get(".box-title").eq(6);
    }

    get gallery5() {
        return cy.get(".box-title").eq(8);
    }

    get gallery6() {
        return cy.get(".box-title").eq(10);
    }

    get gallery7() {
        return cy.get(".box-title").eq(12);
    }

    get gallery8() {
        return cy.get(".box-title").eq(14);
    }

    get gallery9() {
        return cy.get(".box-title").eq(16);
    }

    get gallery10() {
        return cy.get(".box-title").eq(18);
    }

    get authorOfFirstGallery() {
        return cy.get(".box-title").eq(1);
    }

    get authorOfSecondGallery() {
        return cy.get(".box-title").eq(3);
    }

    get authorOfThirdGallery() {
        return cy.get(".box-title").eq(5);
    }

    get authorOfGallery4() {
        return cy.get(".box-title").eq(7);
    }

    get authorOfGallery5() {
        return cy.get(".box-title").eq(9);
    }

    get authorOfGallery6() {
        return cy.get(".box-title").eq(11);
    }

    get authorOfGallery7() {
        return cy.get(".box-title").eq(13);
    }

    get authorOfGallery8() {
        return cy.get(".box-title").eq(15);
    }

    get authorOfGallery9() {
        return cy.get(".box-title").eq(17);
    }

    get authorOfGallery10() {
        return cy.get(".box-title").eq(19);
    }

    filterGalleries(searchWord) {
        this.inputField.clear().type(searchWord);
        this.filterBtn.click();
    }
}

export const allGalleries = new AllGalleries();
