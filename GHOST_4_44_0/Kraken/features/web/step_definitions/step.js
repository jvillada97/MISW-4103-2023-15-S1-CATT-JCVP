const { Given, When, Then, AfterStep, Before, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai')
const { faker, ne } = require("@faker-js/faker");
const LoginPage = require('../../loginPage');
const PostPage = require('../../postPage')
const PagePage = require('../../pagePage')
const TagPage = require('../../tagPage')
const BlogPage = require('../../blogPage')
const MemberPage = require('../../memberPage')
const ProfilePage = require('../../profilesPage')
const fs = require('fs');
const axios = require("axios");
const csv = require("csv-parser");

setDefaultTimeout(200 * 1000);
let loginPage;
let postPage;
let pagePage;
let tagPage;
let blogPage;
let profilesPage;
let memberPage;
let sec = 1;
let name;
let title_post = '';
let text_post = '';
let data = [];
let data_csv = [];
let title_page = '';
let text_page = '';
let title_tag = '';
let text_tag = '';
let name_member = '';
let secuencial;
let sec_csv = 0;


// EVENTOS DE LOGIN
When("I load data from CSV {kraken-string}", async function (ruta) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(__dirname + ruta)
            .pipe(csv())
            .on("data", (row) => {
                data_csv.push(row);
            })
            .on("end", () => {
                resolve();
            })
            .on("error", (error) => {
                reject(error);
            });
    });
});

When("I enter my email CSV {string}", async function (email) {
    secuencial = sec_csv;
    user = data_csv[sec_csv].email;
    sec_csv = sec_csv + 1;
    loginPage = new LoginPage(this.driver);
    await loginPage.usernameInput(user);
});

When('I enter my email {kraken-string}', async function (user) {
    loginPage = new LoginPage(this.driver);
    await loginPage.usernameInput(user);

});

When('I enter my password {kraken-string}', { timeout: -1 }, async function (password) {
    loginPage = new LoginPage(this.driver);
    await loginPage.passwordInput(password);

});

When('I enter my password CSV {string}', { timeout: -1 }, async function (password) {
    password = data_csv[secuencial].password;
    loginPage = new LoginPage(this.driver);
    await loginPage.passwordInput(password);

});

When('I click enter', async function () {
    loginPage = new LoginPage(this.driver);
    await loginPage.loginButton();

});

Then('I expect to see CSV {string}', async function (error) {
    error = data_csv[secuencial].error;
    loginPage = new LoginPage(this.driver);
    await loginPage.validateError(error);
});

Then('I expect to see {string}', async function (error) {
    loginPage = new LoginPage(this.driver);
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

When("I load data", async function () {
    const response = await axios.get(
        "https://my.api.mockaroo.com/post.json?key=20041390"
    );
    const row = faker.number.int(min = 1, max = 10);
    data = response.data;
    title_post = data[row].title_post;
    text_post = data[row].text_post;

    this.scenarioContext.title_post = title_post;


});

When('I validate that the post not exists', async function () {
    const title_post = this.scenarioContext.title_post;
    postPage = new PostPage(this.driver);
    expect(await postPage.checkIfPostNotExists(title_post), 'El post ya existe').to.not.equal(false);
});

When('I click new post', async function () {
    postPage = new PostPage(this.driver);
    await postPage.newPostButton();

});

When('I enter title post', async function () {
    postPage = new PostPage(this.driver);
    await postPage.titleInput(title_post);

});

When('I enter text in the post', async function () {
    postPage = new PostPage(this.driver);
    await postPage.textInput(text_post);

});

When('I publish my post', async function () {
    postPage = new PostPage(this.driver);
    await postPage.publishPostButton();

});

When('I return post list', async function () {
    postPage = new PostPage(this.driver);
    await postPage.returnPostButton();

});

Then('I validate that the post exists and select it', async function () {
    const storedTitlePost = this.scenarioContext.title_post;
    postPage = new PostPage(this.driver);
    expect(await postPage.checkIfPostExists(storedTitlePost), 'El post no existe').to.not.equal(false);
});

// EVENTOS ACTUALIZAR POST

When('I update my post', async function () {
    postPage = new PostPage(this.driver);
    await postPage.updatePostButton();

});

When('I enter new text in the post', async function () {
    const response = await axios.get(
        "https://my.api.mockaroo.com/post.json?key=20041390"
    );
    const row = faker.number.int(min = 1, max = 10);
    data = response.data;
    title_post = data[row].title_post;

    this.scenarioContext.title_post = title_post;

    postPage = new PostPage(this.driver);
    await postPage.selectText();
    await postPage.titleInput(title_post);


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

When("I load data Page", async function () {
    const response = await axios.get(
        "https://my.api.mockaroo.com/page.json?key=20041390"
    );
    const row = faker.number.int(min = 1, max = 10);
    data = response.data;
    title_page = data[row].title_page;
    text_page = data[row].text_page;

    this.scenarioContext.title_page = title_page;

});


When('I click page', async function () {
    pagePage = new PagePage(this.driver);
    await pagePage.pageButton();

});

Then('I validate that the page not exists', async function () {
    const title_page = this.scenarioContext.title_page;
    pagePage = new PagePage(this.driver);
    expect(await pagePage.checkIfPageNotExists(title_page), 'La pagina ya existe').to.not.equal(false);
});

When('I click new page', async function () {
    pagePage = new PagePage(this.driver);
    await pagePage.newPageButton();

});

When('I enter title page', async function () {
    const title_page = this.scenarioContext.title_page;
    pagePage = new PagePage(this.driver);
    await pagePage.titleInput(title_page);

});

When('I enter text in the page', async function () {
    pagePage = new PagePage(this.driver);
    await pagePage.textInput(text_page);

});

When('I publish my page', async function () {
    pagePage = new PagePage(this.driver);
    await pagePage.publishPageButton();

});

When('I return page list', async function () {
    pagePage = new PagePage(this.driver);
    await pagePage.returnPageButton();

});

Then('I validate that the page exists and select it', async function () {
    const storedTitlePage = this.scenarioContext.title_page;
    pagePage = new PagePage(this.driver);
    expect(await pagePage.checkIfPageExists(storedTitlePage), 'La pagina no existe').to.not.equal(false);
});

// EVENTOS ACTUALIZAR PAGINA

When('I update my page', async function () {
    pagePage = new PagePage(this.driver);
    await pagePage.updatePageButton();

});

When('I enter new text in the page', async function () {

    const response = await axios.get(
        "https://my.api.mockaroo.com/page.json?key=20041390"
    );
    const row = faker.number.int(min = 1, max = 5);
    data = response.data;
    title_page = data[row].title_page;

    this.scenarioContext.title_page = title_page;

    pagePage = new PagePage(this.driver);
    await pagePage.selectText();
    await pagePage.titleInput(title_page);

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

When("I load data Tag", async function () {
    const response = await axios.get(
        "https://my.api.mockaroo.com/tag.json?key=20041390"
    );
    const row = faker.number.int(min = 1, max = 10);
    data = response.data;
    title_tag = data[row].title_tag;
    text_tag = data[row].text_tag;

    this.scenarioContext.title_tag = title_tag;


});

When('I click tag', async function () {
    tagPage = new TagPage(this.driver);
    await tagPage.tagButton();
});

When('I validate that the tag not exists', async function () {
    const title_tag = this.scenarioContext.title_tag;
    tagPage = new TagPage(this.driver);
    expect(await tagPage.checkIfTagNotExists(title_tag), 'El tag ya existe').to.not.equal(false);
});

When('I click new tag', async function () {
    tagPage = new TagPage(this.driver);
    await tagPage.newTagButton();

});

When('I enter title tag', async function () {
    const title_tag = this.scenarioContext.title_tag;
    tagPage = new TagPage(this.driver);
    await tagPage.titleInput(title_tag);
});

When('I enter text in the tag', async function () {
    tagPage = new TagPage(this.driver);
    await tagPage.textInput(text_tag);

});

When('I publish my tag', async function () {
    tagPage = new TagPage(this.driver);
    await tagPage.publishTagButton();

});

When('I return tag list', async function () {
    tagPage = new TagPage(this.driver);
    await tagPage.returnTagButton();

});

Then('I validate that the tag exists and select it', async function () {
    const title_tag = this.scenarioContext.title_tag;
    tagPage = new TagPage(this.driver);
    expect(await tagPage.checkIfTagExists(title_tag), 'El tag no existe').to.not.equal(false);
});

// EVENTOS ACTUALIZAR TAG

When('I update my tag', async function () {
    tagPage = new TagPage(this.driver);
    await tagPage.updateTagButton();

});

When('I enter new text in the tag', async function () {

    const response = await axios.get(
        "https://my.api.mockaroo.com/tag.json?key=20041390"
    );
    const row = faker.number.int(min = 1, max = 10);
    data = response.data;
    title_tag = data[row].title_tag;

    this.scenarioContext.title_tag = title_tag;

    tagPage = new TagPage(this.driver);
    await tagPage.titleInput(title_tag);
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

When('I enter title blog', async function () {
    blogPage = new BlogPage(this.driver);
    await blogPage.titleInput();
});

When('I click save', async function () {
    blogPage = new BlogPage(this.driver);
    await blogPage.saveTitle();
});

Then('I validate new title', async function () {
    blogPage = new BlogPage(this.driver);
    expect(await blogPage.validateNewTitle(), 'Error, nombre no actualizado', true);
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

When('I enter name member', async function () {
    firts_name = faker.person.firstName();
    last_name = faker.person.lastName();
    name = firts_name + ' ' + last_name;
    name_member = name;
    memberPage = new MemberPage(this.driver);
    await memberPage.nameInput(name);
});

When('I enter email member', async function () {
    let email = faker.internet.email();
    memberPage = new MemberPage(this.driver);
    await memberPage.emailInput(email);
});

When('I enter text member', async function () {
    let texto = faker.random.alpha(500);
    memberPage = new MemberPage(this.driver);
    await memberPage.textInput(texto);
});

When('I enter name member character {kraken-string}', async function (caracteres) {
    name = faker.random.alpha(parseInt(caracteres));
    memberPage = new MemberPage(this.driver);
    await memberPage.nameInput(name);
});

When('I enter email member character {kraken-string}', async function (caracteres) {
    let email = faker.random.alpha(parseInt(64)) + '@' + faker.random.alpha((parseInt(60)));
    sec = caracteres - email.length;
    for (i = 0; i < (sec / 4) - 1; i++) {
        email = email + '.' + faker.random.alpha(3);
    }

    sec = caracteres - email.length;
    if (sec > 0) {
        email = email + faker.random.alpha(parseInt(sec));
    }
    memberPage = new MemberPage(this.driver);
    await memberPage.emailInput(email);
});

When('I enter text member character {kraken-string}', async function (caracteres) {
    let texto = faker.random.alpha(parseInt(caracteres));
    memberPage = new MemberPage(this.driver);
    await memberPage.textInput(texto);
});

When('I click save member', async function () {
    memberPage = new MemberPage(this.driver);
    await memberPage.saveMember();
});

Then('I validate that the member exists and select it', async function () {
    const name_member = this.scenarioContext.name_member;
    memberPage = new MemberPage(this.driver);
    expect(await memberPage.checkIfMemberExists(name_member), 'El miembro no existe').to.not.equal(false);
});


Then("I validate that the member failed", async function () {
    memberPage = new MemberPage(this.driver);
    expect(await memberPage.checkIfMemberMax(), 'Miembro se creó').to.not.equal(false);
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

When('I validate that the member not exists', async function () {
    const name_member = this.scenarioContext.name_member;
    memberPage = new MemberPage(this.driver);
    expect(await memberPage.checkIfMemberNotExists(name_member), 'El miembro ya existe').to.not.equal(false);
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


// EVENTOS CAMBIAR PASSWORD

When("I enter new password {kraken-string}", { timeout: -1 }, async function (caracteres) {
    profilesPage = new ProfilePage(this.driver);
    await profilesPage.newPassword(caracteres);
});

When("I clic avatar", async function () {
    profilesPage = new ProfilePage(this.driver);
    await profilesPage.selectAvatar();
});

When("I clic profile", async function () {
    profilesPage = new ProfilePage(this.driver);
    await profilesPage.selectProfile();
});

When("I clic signout", async function () {
    profilesPage = new ProfilePage(this.driver);
    await profilesPage.signout();
});

When("I enter old password {kraken-string}", { timeout: -1 }, async function (passwordNew) {
    profilesPage = new ProfilePage(this.driver);
    await profilesPage.oldPassword(passwordNew);
});

When("I clic save password", async function () {
    profilesPage = new ProfilePage(this.driver);
    await profilesPage.selectButton();
});

Then("I validate that it failed", async function () {
    profilesPage = new ProfilePage(this.driver);
    expect(await profilesPage.checkIfUpdatedPassword(), 'Contraseña se actualizó').to.not.equal(false);
});

Then("I validate that it ok", async function () {
    profilesPage = new ProfilePage(this.driver);
    expect(await profilesPage.checkIfUpdatedPasswordOk(), 'Contraseña se actualizó').to.not.equal(false);
});

When("I enter mandatory data", async function () {
    profilesPage = new ProfilePage(this.driver);
    expect(await profilesPage.enterMandatory(), 'Contraseña se actualizó').to.not.equal(false);
});

When("I clic save profile", async function () {
    profilesPage = new ProfilePage(this.driver);
    await profilesPage.selectButtonProfile();
});

Then("I validate that profile failed", async function () {
    profilesPage = new ProfilePage(this.driver);
    expect(await profilesPage.checkIfUpdatedProfile(), 'Perfil se actualizó').to.not.equal(false);
});


Then("I validate that profile failed max", async function () {
    profilesPage = new ProfilePage(this.driver);
    expect(await profilesPage.checkIfUpdatedProfileMax(), 'Perfil se actualizó').to.not.equal(false);
});


Then("I validate that profile ok", async function () {
    profilesPage = new ProfilePage(this.driver);
    expect(await profilesPage.checkIfUpdatedProfileOk(), 'Error al actualizar perfil').to.equal(true);
});



When("I enter other data", async function () {
    profilesPage = new ProfilePage(this.driver);
    return await profilesPage.enterOther();
});

When("I enter mandatory data max", async function () {
    profilesPage = new ProfilePage(this.driver);
    return await profilesPage.enterMandatoryMax();
})


When("I enter mandatory data ok", async function () {
    profilesPage = new ProfilePage(this.driver);
    return await profilesPage.enterMandatoryOk();
})

Before(function () {
    this.scenarioContext = { title_post: "", title_page: "", title_tag: "", name_member: "" };
});