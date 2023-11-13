class MemberPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'http://localhost:2368/ghost/';
  }

  async open() {
    await this.driver.get(this.url);
  }

  async memberButton() {
    let element = await this.driver.$('a[data-test-nav="members"]');
    return await element.click();
  }

  async newMemberButton() {
    let element = await this.driver.$('.gh-btn-primary');
    return await element.click();
  }

  async nameInput(title) {
    let element = await this.driver.$('#member-name');
    return await element.setValue(title);
  }

  async emailInput(title) {
    let element = await this.driver.$('#member-email');
    return await element.setValue(title);
  }

  async textInput(title) {
    let element = await this.driver.$('#member-note');
    return await element.setValue(title);
  }

  async saveMember() {
    let element = await this.driver.$('button[data-test-button="save"]');
    return await element.click();
  }

  async checkIfMemberExists(name) {
    const postSelector = `//h3[contains(string(),"${name}")]`;
    const postElements = await this.driver.$$(postSelector);

    if (postElements.length === 0) {
      return false;
    }
    for (let i = 0; i < postElements.length; i++) {
      const postElement = postElements[i];
      const postExists = await postElement.isExisting();

      if (postExists) {
        await postElement.click();
        return postElement; // Retorna el elemento si existe
      }
    }
    return false;
  }

  async deleteMember() {
    let element = await this.driver.$('button[data-test-button]');
    await element.click();
    element = await this.driver.$('button[data-test-button="delete-member"]');
    return await element.click();
  }

  async confirmDeleteMemberButton() {
    let element = await this.driver.$('button[data-test-button="confirm"]');
    return await element.click();
  }

  async checkIfMemberNotExists(titulo) {
    const memberSelector = `//h3[contains(string(),"${titulo}")]`;
    const memberElements = await this.driver.$$(memberSelector);
    if (memberElements.length == 0) {
      return true;
    } else {
      return false;
    }
  }

}

module.exports = MemberPage;