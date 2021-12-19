class AuthLogin {
    get emailInput() {
        return cy.get("#email");
    }

    get passwordInput() {
        return cy.get("#password");
    }

    get submitBtn() {
        return cy.get("button[type='submit']");
    }

    get logoutBtn() {
        return cy.get("a[role='button ']");
    }

    login(email, password) {
        this.emailInput.clear().type(email);
        this.passwordInput.clear().type(password);
        this.submitBtn.click();
    }
}

export const authLogin = new AuthLogin();
