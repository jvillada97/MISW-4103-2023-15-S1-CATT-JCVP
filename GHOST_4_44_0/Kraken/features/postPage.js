let text_title;
const { assert, expect } = require('chai')
class PostPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://localhost:2368/ghost/';
    }

    async open() {
    }

    async postButton() {
        let element = await this.driver.$('#ember26');
        return await element.click();
    }

    async checkIfPostExists(tituloPost) {
        const postSelector = `//h3[contains(string(),"${tituloPost}")]`;
        const postElements = await this.driver.$$(postSelector);

        if (postElements.length === 0) {
            return false;
        }
        for (let i = 0; i < postElements.length; i++) {
            const postElement = postElements[i];
            const postExists = await postElement.isExisting();

            if (postExists) {
                await postElement.click();
                text_title = postElements.length;
                return postElement; // Retorna el elemento si existe
            }
        }
        return false;
    }

    async checkIfPostNotExists(tituloPost) {
        const postSelector = `//h3[contains(string(),"${tituloPost}")]`;
        const postElements = await this.driver.$$(postSelector);

        let variable = postElements.length;
        if (tituloPost == "") {
            if (variable == text_title - 1) {
                variable = 0;
            }
        }
        return assert.equal(variable, 0);
    }

    async newPostButton() {
        let element = await this.driver.$('.gh-nav-new-post');
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
    async publishPostButton() {
        let element = await this.driver.$('.gh-publishmenu-trigger');
        await element.click();
        element = await this.driver.$('.gh-publishmenu-button');
        await element.click();
        element = await this.driver.$('.gh-btn-black');
        return await element.click();
    }

    async returnPostButton() {

        let element = await this.driver.$('.gh-editor-back-button');
        return await element.click();
    }

    async updatePostButton() {
        let element = await this.driver.$('.gh-publishmenu-trigger');
        await element.click();
        element = await this.driver.$('.gh-btn-black');
        return await element.click();
    }

    async sidebarPostButton() {
        let element = await this.driver.$('.gh-btn-action-icon');
        return await element.click();
    }

    async scrollToBottom() {
        const bottomElement = await this.driver.$('.gh-btn-hover-red'); // Utiliza un selector que esté en la parte inferior de la página
        await bottomElement.scrollIntoView();
    }

    async deletePostButton() {
        let element = await this.driver.$('.gh-btn-hover-red');
        return await element.click();
    }

    async confirmDeletePostButton() {
        let element = await this.driver.$('.gh-btn-red');
        return await element.click();
    }

    async validatePostPublish() {
        let element = await this.driver.$('.gh-editor-post-status').getText();
        if (element == 'Published') {
            return true;
        }
        return false;
    }

    async unpublishPost() {
        let element = await this.driver.$('.gh-publishmenu-trigger');
        await element.click();
        element = await this.driver.$('.gh-publishmenu-radio-label');
        await element.click();
        element = await this.driver.$('.gh-btn-black');
        return await element.click();
    }
}

module.exports = PostPage;