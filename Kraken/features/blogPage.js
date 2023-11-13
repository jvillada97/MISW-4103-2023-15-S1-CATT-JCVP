class BlogPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'http://localhost:2368/ghost/';
  }

  async open() {
    await this.driver.get(this.url);
  }

  async configBlogButton() {
    let element = await this.driver.$('.settings_svg__a');
    return await element.click();
  }

  async generalBlogButton() {
    let element = await this.driver.$('a[data-test-nav="general"]');
    return await element.click();
  }

  async expandBlogButton() {
    let element = await this.driver.$('button[data-test-toggle-pub-info]');
    return await element.click();
  }

  async titleInput(title) {
    let element = await this.driver.$('input[data-test-title-input]');
    return await element.setValue(title);
  }

  async saveTitle() {
    let element = await this.driver.$('button[data-test-button="save"]');
    return await element.click();
  }

  async validateNewTitle(title) {
    let element = await this.driver.$('.gh-nav-menu-details-sitetitle').getText();
    if (element == title) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = BlogPage;