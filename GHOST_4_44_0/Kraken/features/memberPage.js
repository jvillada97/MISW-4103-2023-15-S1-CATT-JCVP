let text_member;
class MemberPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'http://localhost:2368/ghost/';
  }

  async open() {
    await this.driver.get(this.url);
  }

  async member1Button() {
    let element = await this.driver.$('#ember30');
    return await element.click();
  }

  async memberButton() {
    let element = await this.driver.$('#members_svg__Regular');
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
    let element = await this.driver.$('.gh-btn-primary');
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
        text_member = postElements.length;
        return postElement; // Retorna el elemento si existe
      }
    }
    return false;
  }

  async deleteMember() {
    let element = await this.driver.$('.gh-btn-action-icon');
    await element.click();
    element = await this.driver.$('.red');
    return await element.click();
  }

  async confirmDeleteMemberButton() {
    let element = await this.driver.$('.gh-btn-red');
    return await element.click();
  }

  async checkIfMemberNotExists(titulo) {
    const memberSelector = `//h3[contains(string(),"${titulo}")]`;
    const memberElements = await this.driver.$$(memberSelector);
    let variable = memberElements.length;

    if (variable == text_member - 1) {
      return true;
    } else {
      return false;
    }
  }

  async checkIfMemberMax() {
    let element = await this.driver.$("div.max-width p.response").getText();
    let element2 = await this.driver.$("div.max-width.error p.response").getText();
    let element3 = await this.driver.$("div.gh-member-note p.response").getText();

    if (element == "Name cannot be longer than 191 characters." && element2 == "Email cannot be longer than 191 characters." && element3 == "Note is too long.") {
      return true;
    }
    return false;
  }
}

module.exports = MemberPage;