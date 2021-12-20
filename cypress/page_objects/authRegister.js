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

    register(firstName, lastName, email, password, confirmedPass) {
        this.firstNameInput.clear().type(firstName);
        this.lastNameInput.clear().type(lastName);
        this.emailInput.clear().type(email);
        this.passwordInput.clear().type(password);
        this.confirmedPasswordInput.clear().type(confirmedPass);
        this.checkboxForTerms.uncheck().click();
        this.submitBtn.click();
    }

    registerWithoutName(lastName, email, pass, confirmedPass) {
        this.lastNameInput.clear().type(lastName);
        this.emailInput.clear().type(email);
        this.passwordInput.clear().type(pass);
        this.confirmedPasswordInput.clear().type(confirmedPass);
        this.checkboxForTerms.uncheck().click();
        this.submitBtn.click();
    }

    registerWithoutLastName(firstName, email, pass, confirmedPass) {
        this.firstNameInput.clear().type(firstName);
        this.lastNameInput.clear();
        this.emailInput.clear().type(email);
        this.passwordInput.clear().type(pass);
        this.confirmedPasswordInput.clear().type(confirmedPass);
        this.checkboxForTerms.uncheck().click();
        this.submitBtn.click();
    }

    registerWithoutEmail(firstName, lastName, pass, confirmedPass) {
        this.firstNameInput.clear().type(firstName);
        this.lastNameInput.clear().type(lastName);
        this.emailInput.clear();
        this.passwordInput.clear().type(pass);
        this.confirmedPasswordInput.clear().type(confirmedPass);
        this.checkboxForTerms.uncheck().click();
        this.submitBtn.click();
    }

    registerWithoutPassAndPassConf(firstName, lastName, email) {
        this.firstNameInput.clear().type(firstName);
        this.lastNameInput.clear().type(lastName);
        this.emailInput.clear().type(email);
        this.passwordInput.clear();
        this.confirmedPasswordInput.clear();
        this.checkboxForTerms.uncheck().click();
        this.submitBtn.click();
    }

    registerWithoutPassConf(firstName, lastName, email, pass) {
        this.firstNameInput.clear().type(firstName);
        this.lastNameInput.clear().type(lastName);
        this.emailInput.clear().type(email);
        this.passwordInput.clear().type(pass);
        this.confirmedPasswordInput.clear();
        this.checkboxForTerms.uncheck().click();
        this.submitBtn.click();
    }

    uncheckedTerms(firstName, lastName, email, pass, confirmedPass) {
        this.firstNameInput.clear().type(firstName);
        this.lastNameInput.clear().type(lastName);
        this.emailInput.clear().type(email);
        this.passwordInput.clear().type(pass);
        this.confirmedPasswordInput.clear().type(confirmedPass);
        this.checkboxForTerms.uncheck();
        this.submitBtn.click();
    }
}

export const authRegister = new AuthRegister();
