const assert = require('assert');

class PagePage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://localhost:2368/ghost/';
    }

    async open() {
    }

    async pageButton() {
        let element = await this.driver.$('#ember24');
        return await element.click();
    }

    async checkIfPageExists(titulopage) {
        const pageSelector = `//h3[contains(string(),"${titulopage}")]`;
        const pageElements = await this.driver.$$(pageSelector);

        if (pageElements.length === 0) {
            return false;
        }
        for (let i = 0; i < pageElements.length; i++) {
            const pageElement = pageElements[i];
            const pageExists = await pageElement.isExisting();

            if (pageExists) {
                await pageElement.click();
                return pageElement; // Retorna el elemento si existe
            }
        }
        return false;
    }

    async checkIfPageNotExists(tituloPage) {
        const pageSelector = `//h3[contains(string(),"${tituloPage}")]`;
        const pageElements = await this.driver.$$(pageSelector);
        if (pageElements.length == 0){
            return true;
        } else{
            return false;
        }

         
    }

    async newPageButton() {
        let element = await this.driver.$('.gh-btn-primary');
        return await element.click();
    }

    async titleInput(title) {
        let element = await this.driver.$('.gh-editor-title');
        return await element.setValue(title);
    }

    async textInput(text) {
        let element = await this.driver.$('div.kg-prose');;
        return await element.setValue(text);
    }

    async selectText() {
        let element = await this.driver.$('div.kg-prose');
        await element.click();
    }
    async publishPageButton() {
        let element = await this.driver.$('.gh-publish-trigger');
        await element.click();
        element = await this.driver.$('.gh-btn-large');
        await element.click();
        element = await this.driver.$('.gh-btn-pulse');
        await element.click();
        element = await this.driver.$('.gh-publish-back-button');
        return await element.click();
    }

    async returnPageButton() {

        let element = await this.driver.$('.gh-btn-editor');
        return await element.click();
    }

    async updatePageButton() {
        let element = await this.driver.$('.gh-editor-save-trigger');
        return await element.click();
    }

    async sidebarPageButton() {
        let element = await this.driver.$('.gh-btn-action-icon');
        return await element.click();
    }

    async scrollToBottom() {
        const bottomElement = await this.driver.$('.gh-btn-fullwidth'); // Utiliza un selector que esté en la parte inferior de la página
        await bottomElement.scrollIntoView();
    }

    async deletePageButton() {
        let element = await this.driver.$('.gh-btn-fullwidth');
        return await element.click();
    }

    async confirmDeletePageButton() {
        let element = await this.driver.$('.gh-btn-red');
        return await element.click();
    }

    async validatePagePublish() {
        let element = await this.driver.$('a.view-post');
        const pageExists = await element.isExisting();
        if (pageExists) {
            return true;
        }
        return false;
    }

    async unpublishPage() {
        let element = await this.driver.$('.gh-unpublish-trigger');
        await element.click();
        element = await this.driver.$('.gh-revert-to-draft');
        return await element.click();
    }
}

module.exports = PagePage;