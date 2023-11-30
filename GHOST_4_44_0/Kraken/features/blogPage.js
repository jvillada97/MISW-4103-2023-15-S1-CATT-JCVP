const { faker } = require("@faker-js/faker");
let title_blog = '';
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
    let element = await this.driver.$('a[href="#/settings/general/"]');
    return await element.click();
  }

  async expandBlogButton() {
    let element = await this.driver.$('button[class="gh-btn"]');
    return await element.click();
  }

  async titleInput() {
    title_blog = faker.company.name();
    let element = await this.driver.$('.ember-text-field');
    return await element.setValue(title_blog);
  }

  async saveTitle() {
    let element = await this.driver.$('.gh-btn-primary');
    return await element.click();
  }

  async validateNewTitle() {
    let element = await this.driver.$('.gh-nav-menu-details-sitetitle').getText();
    if (element == title_blog) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = BlogPage;