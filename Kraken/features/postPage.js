const { assert, expect } = require('chai')
class PostPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://localhost:2368/ghost/';
    }

    async open() {
    }

    async postButton() {
        let element = await this.driver.$('#ember19');
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
                return postElement; // Retorna el elemento si existe
            }
        }
        return false;
    }

    async checkIfPostNotExists(tituloPost) {
        const postSelector = `//h3[contains(string(),"${tituloPost}")]`;
        const postElements = await this.driver.$$(postSelector);

        return assert.equal(postElements.length, 0);
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
        let element = await this.driver.$('div.kg-prose');;
        return await element.setValue(text);
    }

    async selectText() {
        let element = await this.driver.$('div.kg-prose');
        await element.click();
    }
    async publishPostButton() {
        let element = await this.driver.$('.gh-publish-trigger');
        await element.click();
        element = await this.driver.$('.gh-btn-large');
        await element.click();
        element = await this.driver.$('.gh-btn-pulse');
        await element.click();
        element = await this.driver.$('.gh-publish-back-button');
        return await element.click();
    }

    async returnPostButton() {

        let element = await this.driver.$('.gh-btn-editor');
        return await element.click();
    }

    async updatePostButton() {
        let element = await this.driver.$('.gh-editor-save-trigger');
        return await element.click();
    }

    async sidebarPostButton() {
        let element = await this.driver.$('.gh-btn-action-icon');
        return await element.click();
    }

    async scrollToBottom() {
        const bottomElement = await this.driver.$('.gh-btn-fullwidth'); // Utiliza un selector que esté en la parte inferior de la página
        await bottomElement.scrollIntoView();
    }

    async deletePostButton() {
        let element = await this.driver.$('.gh-btn-fullwidth');
        return await element.click();
    }

    async confirmDeletePostButton() {
        let element = await this.driver.$('.gh-btn-red');
        return await element.click();
    }

    async validatePostPublish() {
        let element = await this.driver.$('a.view-post');
        const postExists = await element.isExisting();
        if (postExists) {
            return true;
        }
        return false;
    }

    async unpublishPost() {
        let element = await this.driver.$('.gh-unpublish-trigger');
        await element.click();
        element = await this.driver.$('.gh-revert-to-draft');
        return await element.click();
    }
}

module.exports = PostPage;