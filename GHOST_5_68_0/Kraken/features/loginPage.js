var { expect } = require('chai');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'http://localhost:2368/ghost/';
  }

  async open() {
    await this.driver.get(this.url);
  }

  async usernameInput(username) {
    let element = await this.driver.$('#identification');
    return await element.setValue(username);
  }

  async passwordInput(password) {
    let element = await this.driver.$('#password');
    return await element.setValue(password);
  }

  async validateError(error) {
    if (await this.driver.$('.main-error').isExisting()) {
      var alertText = await this.driver.$('.main-error').getText();
      expect(alertText).to.include(error);
    }
  }
  

  async loginButton() {
    let element = await this.driver.$('#ember5');
    return await element.click();
  }

  async validateLogin() {
    let element = await this.driver.$('.gh-nav-menu-details-sitetitle')
    const loginExists = await element.isExisting();

    if (loginExists) {
      return true
    } else {
      return false
    }
  }
}
module.exports = LoginPage;