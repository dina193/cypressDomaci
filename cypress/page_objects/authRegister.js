class AuthRegister {
    get firstNameInput() {
        return cy.get("#first-name");
    }

    get lastNameInput() {
        return cy.get("#last-name");
    }

    get emailInput() {
        return cy.get("#email");
    }

    get passwordInput() {
        return cy.get("#password");
    }

    get confirmedPasswordInput() {
        return cy.get("#password-confirmation");
    }

    get checkboxForTerms() {
        return cy.get(".form-check-input");
    }

    get submitBtn() {
        return cy.get("button[type='submit']");
    }

    get errorMessage() {
        return cy.get(".alert-danger");
    }

    get registerPageHeading() {
        return cy.get("h1");
    }

    register(firstName, lastName, email, password, confirmedPass) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.confirmedPasswordInput.type(confirmedPass);
        this.checkboxForTerms.check();
        this.submitBtn.click();
    }

    uncheckedTerms(firstName, lastName, email, pass, confirmedPass) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(pass);
        this.confirmedPasswordInput.type(confirmedPass);
        this.submitBtn.click();
    }
}

export const authRegister = new AuthRegister();
