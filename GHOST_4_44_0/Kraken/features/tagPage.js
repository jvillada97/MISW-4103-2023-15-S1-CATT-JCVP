const { assert, expect } = require('chai')
let text_title;

class TagPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://localhost:2368/ghost/';
    }

    async open() {
    }

    async tagButton() {
        let element = await this.driver.$('#ember29');
        return await element.click();
    }

    async checkIfTagExists(tituloTag) {
        const tagSelector = `//h3[contains(string(),"${tituloTag}")]`;
        const tagElements = await this.driver.$$(tagSelector);

        if (tagElements.length === 0) {
            return false;
        }
        for (let i = 0; i < tagElements.length; i++) {
            const tagElement = tagElements[i];
            const tagExists = await tagElement.isExisting();

            if (tagExists) {
                await tagElement.click();
                return tagElement; // Retorna el elemento si existe
            }
        }
        return false;
    }

    async checkIfTagNotExists(tituloTag) {
        const tagSelector = `//h3[contains(string(),"${tituloTag}")]`;
        const tagElements = await this.driver.$$(tagSelector);
        let variable = tagElements.length;
        if (tituloTag == "") {
            if (variable == text_title - 1) {
                variable = 0;
            }
        }
        return assert.equal(variable, 0);
    }

    async newTagButton() {
        let element = await this.driver.$('.gh-btn-primary');
        return await element.click();
    }

    async titleInput(title) {
        let element = await this.driver.$('#tag-name');
        return await element.setValue(title);
    }

    async textInput(text) {
        let element = await this.driver.$('#tag-description');;
        return await element.setValue(text);
    }

    async publishTagButton() {
        let element = await this.driver.$('.gh-btn-primary');
        return await element.click();
    }

    async returnTagButton() {
        let element = await this.driver.$('#ember29');
        return await element.click();
    }

    async updateTagButton() {
        let element = await this.driver.$('.gh-btn-primary');
        return await element.click();
    }

    async scrollToBottom() {
        const bottomElement = await this.driver.$('.gh-btn-red'); // Utiliza un selector que esté en la parte inferior de la página
        await bottomElement.scrollIntoView();
    }

    async deleteTagButton() {
        let element = await this.driver.$('button.gh-btn-red');
        return await element.click();
    }

    async confirmDeleteTagButton() {
        let element = await this.driver.$('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
        return await element.click();
    }
}

module.exports = TagPage;