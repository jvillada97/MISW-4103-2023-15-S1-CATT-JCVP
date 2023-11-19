const { Given, When, Then, AfterStep, BeforeStep } = require('@cucumber/cucumber');
const { expect } = require('chai')
const LoginPage = require('../../loginPage');
const PostPage = require('../../postPage')
const PagePage = require('../../pagePage')
const TagPage = require('../../tagPage')
const BlogPage = require('../../blogPage')
const MemberPage = require('../../memberPage')
const fs = require('fs');

let loginPage;
let postPage;
let pagePage;
let tagPage;
let blogPage;
let memberPage;
let sec = 1;


// EVENTOS DE LOGIN

When('I enter my email {kraken-string}', async function (user) {
    loginPage = new LoginPage(this.driver);
    await loginPage.usernameInput(user);

});

When('I enter my password {kraken-string}', async function (password) {
    loginPage = new LoginPage(this.driver);
    await loginPage.passwordInput(password);

});

When('I click enter', async function () {
    loginPage = new LoginPage(this.driver);
    await loginPage.loginButton();

});

Then('I expect to see {string}', async function (error) {
loginPage=new LoginPage(this.driver);
await loginPage.validateError(error);
  });

Then('I validate login fail', async function () {
    loginPage = new LoginPage(this.driver);
    expect(await loginPage.validateLogin(), 'Error, no debía permitir loguear', false);
});


Then('I validate login successful', async function () {
    loginPage = new LoginPage(this.driver);
    expect(await loginPage.validateLogin(), 'Error, debía permitir loguear', true);
});

//EVENTOS CREAR POST

When('I click post', async function () {
    postPage = new PostPage(this.driver);
    await postPage.postButton();

});

When('I validate that the post {kraken-string} not exists', async function (title) {
    postPage = new PostPage(this.driver);
    expect(await postPage.checkIfPostNotExists(title), 'El post ya existe').to.not.equal(false);
});

When('I click new post', async function () {
    postPage = new PostPage(this.driver);
    await postPage.newPostButton();

});

When('I enter title post {kraken-string}', async function (title) {
    postPage = new PostPage(this.driver);
    await postPage.titleInput(title);

});

When('I enter text in the post {kraken-string}', async function (text) {
    postPage = new PostPage(this.driver);
    await postPage.textInput(text);

});

When('I publish my post', async function () {
    postPage = new PostPage(this.driver);
    await postPage.publishPostButton();

});

When('I return post list', async function () {
    postPage = new PostPage(this.driver);
    await postPage.returnPostButton();

});

Then('I validate that the post {kraken-string} exists and select it', async function (title) {
    postPage = new PostPage(this.driver);
    expect(await postPage.checkIfPostExists(title), 'El post no existe').to.not.equal(false);
});

// EVENTOS ACTUALIZAR POST

When('I update my post', async function () {
    postPage = new PostPage(this.driver);
    await postPage.updatePostButton();

});

When('I enter new text in the post {kraken-string}', async function (text) {
    postPage = new PostPage(this.driver);
    await postPage.selectText();
    await postPage.titleInput(text);

});

//EVENTOS ELIMINAR POST

When('I activate sidebar', async function () {
    postPage = new PostPage(this.driver);
    await postPage.sidebarPostButton();

});

When('I delete post', async function () {
    postPage = new PostPage(this.driver);
    await postPage.scrollToBottom();
    await postPage.deletePostButton();
});

When('I confirm delete the post', async function () {
    postPage = new PostPage(this.driver);
    await postPage.confirmDeletePostButton();
});


//EVENTOS POST PUBLICADO

When('I validate that the post is publish', async function () {
    postPage = new PostPage(this.driver);
    expect(await postPage.validatePostPublish(), 'El post no esta publicado').to.equal(true);
});

When('I unpublish the post', async function () {
    postPage = new PostPage(this.driver);
    await postPage.unpublishPost();
});


When('I validate that the post is unpublish', async function () {
    postPage = new PostPage(this.driver);
    expect(await postPage.validatePostPublish(), 'El post sigue publicado').to.equal(false);
});

//EVENTOS CREAR PAGINA

When('I click page', async function () {
    pagePage = new PagePage(this.driver);
    await pagePage.pageButton();

});

Then('I validate that the page {kraken-string} not exists', async function (title) {
    pagePage = new PagePage(this.driver);
    expect(await pagePage.checkIfPageNotExists(title), 'La pagina ya existe').to.not.equal(false);
});

When('I click new page', async function () {
    pagePage = new PagePage(this.driver);
    await pagePage.newPageButton();

});

When('I enter title page {kraken-string}', async function (title) {
    pagePage = new PagePage(this.driver);
    await pagePage.titleInput(title);

});

When('I enter text in the page {kraken-string}', async function (text) {
    pagePage = new PagePage(this.driver);
    await pagePage.textInput(text);

});

When('I publish my page', async function () {
    pagePage = new PagePage(this.driver);
    await pagePage.publishPageButton();

});

When('I return page list', async function () {
    pagePage = new PagePage(this.driver);
    await pagePage.returnPageButton();

});

Then('I validate that the page {kraken-string} exists and select it', async function (title) {
    pagePage = new PagePage(this.driver);
    expect(await pagePage.checkIfPageExists(title), 'La pagina no existe').to.not.equal(false);
});

// EVENTOS ACTUALIZAR PAGINA

When('I update my page', async function () {
    pagePage = new PagePage(this.driver);
    await pagePage.updatePageButton();

});

When('I enter new text in the page {kraken-string}', async function (text) {
    pagePage = new PagePage(this.driver);
    await pagePage.selectText();
    await pagePage.titleInput(text);

});

//EVENTOS ELIMINAR PAGINA

When('I activate sidebar page', async function () {
    pagePage = new PagePage(this.driver);
    await pagePage.sidebarPageButton();

});

When('I delete page', async function () {
    pagePage = new PagePage(this.driver);
    await pagePage.scrollToBottom();
    await pagePage.deletePageButton();
});

When('I confirm delete the page', async function () {
    pagePage = new PagePage(this.driver);
    await pagePage.confirmDeletePageButton();
});

//EVENTOS PAGINA PUBLICADA

When('I validate that the page is publish', async function () {
    pagePage = new PagePage(this.driver);
    expect(await pagePage.validatePagePublish(), 'La pagina no esta publicada').to.equal(true);
});

When('I unpublish the page', async function () {
    pagePage = new PagePage(this.driver);
    await pagePage.unpublishPage();
});


When('I validate that the page is unpublish', async function () {
    pagePage = new PagePage(this.driver);
    expect(await pagePage.validatePagePublish(), 'La pagina sigue publicada').to.equal(false);
});


//EVENTOS CREAR TAG

When('I click tag', async function () {
    tagPage = new TagPage(this.driver);
    await tagPage.tagButton();
});

When('I validate that the tag {kraken-string} not exists', async function (title) {
    tagPage = new TagPage(this.driver);
    expect(await tagPage.checkIfTagNotExists(title), 'El tag ya existe').to.not.equal(false);
});

When('I click new tag', async function () {
    tagPage = new TagPage(this.driver);
    await tagPage.newTagButton();

});

When('I enter title tag {kraken-string}', async function (title) {
    tagPage = new TagPage(this.driver);
    await tagPage.titleInput(title);

});

When('I enter text in the tag {kraken-string}', async function (text) {
    tagPage = new TagPage(this.driver);
    await tagPage.textInput(text);

});

When('I publish my tag', async function () {
    tagPage = new TagPage(this.driver);
    await tagPage.publishTagButton();

});

When('I return tag list', async function () {
    tagPage = new TagPage(this.driver);
    await tagPage.returnTagButton();

});

Then('I validate that the tag {kraken-string} exists and select it', async function (title) {
    tagPage = new TagPage(this.driver);
    expect(await tagPage.checkIfTagExists(title), 'El tag no existe').to.not.equal(false);
});

// EVENTOS ACTUALIZAR TAG

When('I update my tag', async function () {
    tagPage = new TagPage(this.driver);
    await tagPage.updateTagButton();

});

When('I enter new text in the tag {kraken-string}', async function (text) {
    tagPage = new TagPage(this.driver);
    await tagPage.titleInput(text);

});

//EVENTOS ELIMINAR TAG

When('I delete tag', async function () {
    tagPage = new TagPage(this.driver);
    await tagPage.scrollToBottom();
    await tagPage.deleteTagButton();
});

When('I confirm delete the tag', async function () {
    tagPage = new TagPage(this.driver);
    await tagPage.confirmDeleteTagButton();
});

// EVENTOS CONFIGURAR BLOG

When('I click config', async function () {
    blogPage = new BlogPage(this.driver);
    await blogPage.configBlogButton();
});

When('I click general', async function () {
    blogPage = new BlogPage(this.driver);
    await blogPage.generalBlogButton();
});

When('I click expand', async function () {
    blogPage = new BlogPage(this.driver);
    await blogPage.expandBlogButton();
});

When('I enter title blog {kraken-string}', async function (title) {
    blogPage = new BlogPage(this.driver);
    await blogPage.titleInput(title);
});

When('I click save', async function () {
    blogPage = new BlogPage(this.driver);
    await blogPage.saveTitle();
});

Then('I validate new title {kraken-string}', async function (title) {
    blogPage = new BlogPage(this.driver);
    expect(await blogPage.validateNewTitle(title), 'Error, nombre no actualizado', true);
});

// EVENTOS MEMBER

When('I click members1', async function () {
    memberPage = new MemberPage(this.driver);
    await memberPage.member1Button();
});

When('I click members', async function () {
    memberPage = new MemberPage(this.driver);
    await memberPage.memberButton();
});

When('I click new member', async function () {
    memberPage = new MemberPage(this.driver);
    await memberPage.newMemberButton();
});

When('I enter name member {kraken-string}', async function (name) {
    memberPage = new MemberPage(this.driver);
    await memberPage.nameInput(name);

});

When('I enter email member {kraken-string}', async function (name) {
    memberPage = new MemberPage(this.driver);
    await memberPage.emailInput(name);

});

When('I enter text member {kraken-string}', async function (name) {
    memberPage = new MemberPage(this.driver);
    await memberPage.textInput(name);

});

When('I click save member', async function () {
    memberPage = new MemberPage(this.driver);
    await memberPage.saveMember();
});

Then('I validate that the member {kraken-string} exists and select it', async function (name) {
    memberPage = new MemberPage(this.driver);
    expect(await memberPage.checkIfMemberExists(name), 'El miembro no existe').to.not.equal(false);
});

// EVENTOS MIEMBRO ELIMINAR
When('I delete member', async function () {
    memberPage = new MemberPage(this.driver);
    await memberPage.deleteMember();
});

When('I confirm delete the member', async function () {
    memberPage = new MemberPage(this.driver);
    await memberPage.confirmDeleteMemberButton();
});

When('I validate that the member {kraken-string} not exists', async function (title) {
    memberPage = new MemberPage(this.driver);
    expect(await memberPage.checkIfMemberNotExists(title), 'El miembro ya existe').to.not.equal(false);
});

AfterStep(async function (step) {
    let dirName = step.pickle.name;
    const stepText = step.pickle.name;
    let fileName = `${stepText}${sec}.png`;
  
    dirName = dirName.replace(/\s+/g, '_');
    fileName = fileName.replace(/\s+/g, '_');

    const reportsDir = `./reports/${dirName}`;
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
  
    let screenshot = await this.driver.saveScreenshot(
      `./reports/${dirName}/${fileName}`
    );
    this.attach(screenshot, 'image/png');
    sec = sec + 1;
    return;
  });