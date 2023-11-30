const assert = require('assert');
let text_title;

class PagePage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://localhost:2368/ghost/';
    }

    async open() {
    }

    async pageButton() {
        let element = await this.driver.$('#ember28');
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
                text_title = pageElements.length;
                return pageElement; // Retorna el elemento si existe
            }
        }
        return false;
    }

    async checkIfPageNotExists(tituloPage) {
        const pageSelector = `//h3[contains(string(),"${tituloPage}")]`;
        const pageElements = await this.driver.$$(pageSelector);
        let variable = pageElements.length;

        if (tituloPage == "") {
            if (variable == text_title - 1) {
                variable = 0;
            }
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
        let element = await this.driver.$('div[data-kg="editor"');
        await element.setValue('\t');
        element = await this.driver.$('div.koenig-editor__editor-wrapper');;
        return await element.setValue(text);
    }

    async selectText() {
        let element = await this.driver.$('.gh-editor-title');
        await element.click();
    }
    async publishPageButton() {
        let element = await this.driver.$('.gh-publishmenu-trigger');
        await element.click();
        element = await this.driver.$('.gh-publishmenu-button');
        await element.click();
        element = await this.driver.$('.gh-btn-black');
        return await element.click();
    }

    async returnPageButton() {

        let element = await this.driver.$('.gh-editor-back-button');
        return await element.click();
    }

    async updatePageButton() {
        let element = await this.driver.$('.gh-publishmenu-trigger');
        await element.click();
        element = await this.driver.$('.gh-btn-black');
        return await element.click();
    }

    async sidebarPageButton() {
        let element = await this.driver.$('.gh-btn-action-icon');
        return await element.click();
    }

    async scrollToBottom() {
        const bottomElement = await this.driver.$('.gh-btn-hover-red'); // Utiliza un selector que esté en la parte inferior de la página
        await bottomElement.scrollIntoView();
    }

    async deletePageButton() {
        let element = await this.driver.$('.gh-btn-hover-red');
        return await element.click();
    }

    async confirmDeletePageButton() {
        let element = await this.driver.$('.gh-btn-red');
        return await element.click();
    }

    async validatePagePublish() {
        let element = await this.driver.$('.gh-editor-post-status').getText();
        if (element == 'Published') {
            return true;
        }
        return false;
    }

    async unpublishPage() {
        let element = await this.driver.$('.gh-publishmenu-trigger');
        await element.click();
        element = await this.driver.$('.gh-publishmenu-radio-label');
        await element.click();
        element = await this.driver.$('.gh-btn-black');
        return await element.click();
    }
}

module.exports = PagePage;