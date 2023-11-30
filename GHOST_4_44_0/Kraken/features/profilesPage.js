const { faker } = require("@faker-js/faker");
const fs = require('fs');

class ProfilesPage {

    constructor(driver) {
        this.driver = driver;
        this.url = 'http://localhost:2368/ghost/';
    }

    async selectAvatar() {
        let element = await this.driver.$("div.gh-user-avatar.relative");
        return await element.click();
    }

    async selectProfile() {
        let element = await this.driver.$("ul.dropdown-menu.dropdown-triangle-top >  li:nth-child(4)");
        return await element.click();
    }

    async signout() {
        let element = await this.driver.$("ul.dropdown-menu.dropdown-triangle-top >  li:nth-child(9)");
        return await element.click();
    }

    async oldPassword(passwordNew) {
        let element = await this.driver.$("input#user-password-old");
        return await element.setValue(passwordNew);
    }

    async selectButton() {
        let element = await this.driver.$("button.gh-btn.gh-btn-icon.button-change-password.gh-btn-red.ember-view"
        );
        return await element.click();
    }

    async newPassword(caracteres) {
        const pass = faker.random.alpha(parseInt(caracteres));
        let element = await this.driver.$("input#user-password-new");
        let elementRepeat = await this.driver.$("input#user-new-password-verification");
        if (caracteres > 9) {
            await this.updatePasswordInPropertiesFile(pass);
        }
        return await element.setValue(pass), await elementRepeat.setValue(pass);
    }

    async checkIfUpdatedPassword() {
        let element = await this.driver.$(".error p.response").getText();
        if (element == "Password must be at least 10 characters long.") {
            return true;
        } else {
            return false;
        }
    }

    async checkIfUpdatedPasswordOk() {
        let element = await this.driver.$(".gh-btn-green").getText();

        if (element == "Saved") {
            return true;
        } else {
            return false;
        }
    }

    async enterMandatory() {
        let elementUserName = await this.driver.$("#user-name");
        await elementUserName.setValue(['Shift', 'Home']);

        await elementUserName.setValue(' ');
        await elementUserName.keys('Tab');

        let elementUserEmail = await this.driver.$("#user-email");
        await elementUserEmail.setValue(['Shift', 'Home']);
        await elementUserEmail.setValue([' ']);

    }

    async enterOther() {
        let elementUserLocation = await this.driver.$("#user-location");
        await elementUserLocation.setValue(faker.location.country());

        let elementUserWebsite = await this.driver.$("#user-website");
        await elementUserWebsite.setValue(faker.internet.url());

        let elementUserFacebook = await this.driver.$("#user-facebook");
        await elementUserFacebook.setValue(faker.internet.userName());

        let elementUserTwitter = await this.driver.$("#user-twitter");
        await elementUserTwitter.setValue(faker.internet.userName());

        let elementUserBio = await this.driver.$("#user-bio");
        return await elementUserBio.setValue(faker.person.bio());
    }

    async selectButtonProfile() {
        let element = await this.driver.$("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view"
        );
        return await element.click();
    }

    async checkIfUpdatedProfile() {
        var responseElements = await this.driver.$$('.form-group p.response');
        console.log(responseElements);
        let element = await responseElements[0].getText();
        let element2 = await responseElements[1].getText();

        if (element == "Please enter a name." && element2 == "Please supply a valid email address") {
            return true;
        }
    }

    async enterMandatoryMax() {
        let elementUserName = await this.driver.$("#user-name");
        await elementUserName.setValue(['Shift', 'Home']);

        await elementUserName.setValue(faker.random.alpha(192));
        await elementUserName.keys('Tab');

        let elementUserEmail = await this.driver.$("#user-email");
        await elementUserEmail.setValue(['Shift', 'Home']);
        await elementUserEmail.setValue(faker.random.alpha(64) + '@' + faker.random.alpha(127));

        let elementUserBio = await this.driver.$("#user-bio");
        return await elementUserBio.setValue(faker.random.alpha(201));
    }

    async checkIfUpdatedProfileMax() {
        let element = await this.driver.$("p[data-test-error='user-name']").getText();
        let element2 = await this.driver.$("p[data-test-error='user-email']").getText();
        let element3 = await this.driver.$("p[data-test-error='user-bio']").getText();

        if (element == "Name is too long" && element2 == "Email is too long" && element3 == "Bio is too long") {
            return true;
        }
    }


    async checkIfUpdatedProfileOk() {
        let element = await this.driver.$(".gh-btn-green").getText();

        if (element == "Saved") {
            return true;
        } else {
            return false;
        }
    }

    async enterMandatoryOk() {
        let elementUserName = await this.driver.$("#user-name");
        await elementUserName.setValue(['Shift', 'Home']);

        await elementUserName.setValue(faker.person.fullName());
        await elementUserName.keys('Tab');

        let elementUserEmail = await this.driver.$("#user-email");
        await elementUserEmail.setValue(['Shift', 'Home']);
        let userEmail = faker.internet.userName() + '@' + faker.internet.domainName();
        await elementUserEmail.setValue(userEmail);
        await this.updateEmailInPropertiesFile(userEmail);

        let elementUserBio = await this.driver.$("#user-bio");
        return await elementUserBio.setValue(faker.person.bio());
    }

    async updateEmailInPropertiesFile(email) {
        let properties = JSON.parse(fs.readFileSync('properties.json', 'utf8'));
        properties.EMAIL = email;
        fs.writeFileSync('properties.json', JSON.stringify(properties, null, 2));
    }


    async updatePasswordInPropertiesFile(password) {
        let properties = JSON.parse(fs.readFileSync('properties.json', 'utf8'));
        properties.PASSWORD = password;
        fs.writeFileSync('properties.json', JSON.stringify(properties, null, 2));
    }
}
module.exports = ProfilesPage;