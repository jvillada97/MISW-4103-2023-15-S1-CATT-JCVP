import { test, expect, Page } from '@playwright/test';
import jsonData from './MOCK_DATA.json' assert { type: "json" };
import { faker } from '@faker-js/faker';


test('Login process with wrong email', async({ page }) =>{
    //Given
    const aPrioriData = jsonData
    const url: string = 'http://localhost:2368/ghost/#/';
    await page.goto(url);
    const password: string =  '-9Js9QVhy:V_nmT'; //your account password here
    //When
    await page.locator('[id="identification"]').fill(aPrioriData[0].email);
    //And
    await page.locator('[id="password"]').fill(password);
    await page.locator('[data-test-button="sign-in"]').click();
    await new Promise(r => setTimeout(r, 1000));
    //Then
    await expect(page.getByText('There is no user with that email address.')).toBeVisible();
    await page.screenshot({path: `./screenshots/A-priori/login/wrongEmail.png`})
})

test('Login process with correct email and wrong password', async({ page }) => {
    //Given
    const aPrioriData = jsonData
    const url: string = 'http://localhost:2368/ghost/#/';
    await page.goto(url);
    const user: string = 'j.villadap@uniandes.edu.co';//your email here
    //When
    await page.locator('[id="identification"]').fill(user);
    //And
    await page.locator('[id="password"]').fill(aPrioriData[1].password);
    console.log(`A priori password created is: ${aPrioriData[1].password}`)
    await page.locator('[data-test-button="sign-in"]').click();
    await new Promise(r => setTimeout(r, 1000));
    //Then
    await expect(page.getByText('Your password is incorrect.')).toBeVisible();
    await page.screenshot({path: `./screenshots/A-priori/login/wrongPassword.png`})
})


test.describe.serial('Apriori scenarios using correct login', () =>{
    test.beforeEach(async ({ page }) => {
        //This does not count as a test, is just done to reduce quantity of code lines
        const url: string = 'http://localhost:2368/ghost/#/';
        await page.goto(url);
        const user: string = 'j.villadap@uniandes.edu.co'
        const password: string =  '-9Js9QVhy:V_nmT';
        await page.locator('[id="identification"]').fill(user);
        await page.locator('[id="password"]').fill(password);
        await page.locator('[data-test-button="sign-in"]').click();
        await new Promise(r => setTimeout(r, 1000));
        await expect(page.getByText('Dashboard').first()).toBeVisible();
    })

    test('When editing an existing post and updating a title with more than 255 characters', async({ page }) => {
        //Given
        const aPrioriData = jsonData
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}posts`);
        //and
        await page.locator('h3.gh-content-entry-title').first().click();
        const postTitle: string = aPrioriData[0].text.slice(0, 256);
        console.log(postTitle);
        await page.getByPlaceholder('Post title').fill(postTitle);
        await new Promise(r => setTimeout(r, 1000));
        await page.getByRole('button', { name: 'Update', exact: true}).click();
        await new Promise(r => setTimeout(r, 1000));
        //Then
        await expect(page.getByText('Update failed: Title cannot be longer than 255 characters.')).toBeVisible();
        await page.screenshot({path: `./screenshots/A-priori/login/postTitle+255Chars.png`})
        
    })
    /*
    test('edits first post with random title as next test could be done', async({ page }) => {
        //This test does not count just has to be done to test don't fail
        const url: string = 'http://localhost:2368/ghost/#/';
        await page.goto(`${url}posts`);
        await page.locator('h3.gh-content-entry-title').first().click();
        const postTitle: string = faker.lorem.word();
        await page.getByPlaceholder('Post title').fill(postTitle);
        await new Promise(r => setTimeout(r, 1000));
        await page.getByRole('button', { name: 'Update', exact: true}).click();
        await page.screenshot({path: `./screenshots/A-priori/login/changingTitle_3.png`})
        await page.goto(`${url}posts`);
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({path: `./screenshots/A-priori/login/changingTitle_2.png`})
        await expect(page.locator('h3.gh-content-entry-title').first()).toBeVisible();
        await page.screenshot({path: `./screenshots/A-priori/login/changingTitle.png`})
    })
    */
    test('When editing an existing post and adding a title with 255 characters update action should work normally', async({ page }) => {
        //Given
        const aPrioriData = jsonData
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}posts`);
        //and
        await page.locator('h3.gh-content-entry-title').first().click();
        const postTitle: string = aPrioriData[1].text.slice(0, 255);
        console.log(postTitle);
        await page.getByPlaceholder('Post title').fill(postTitle);
        await new Promise(r => setTimeout(r, 1000));
        await page.locator('[data-test-button="publish-save"]').click();
        await new Promise(r => setTimeout(r, 1000));
        //Then
        await expect(page.getByText('Updated').last()).toBeVisible();
        await page.screenshot({path: `./screenshots/A-priori/login/postTitle=255Chars.png`})
        
    })
    test('trying to create a new page is not possible with more than 255 chars', async({ page }) => {
        //Given
        const aPrioriData = jsonData
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}pages`);
        //And
        await page.goto(`${url}editor/page`);
        await page.getByPlaceholder('Page title').fill('a');
        await page.locator('[data-koenig-dnd-droppable="true"]').fill('a');
        await page.screenshot({path: `./screenshots/A-priori/login/pageTitle+255Chars_5.png`})
        const pageTitle: string = aPrioriData[2].text.slice(0, 256);
        await page.screenshot({path: `./screenshots/A-priori/login/pageTitle+255Chars_4.png`})
        await page.getByPlaceholder('Page title').fill(pageTitle);
        await page.screenshot({path: `./screenshots/A-priori/login/pageTitle+255Chars_3.png`})
        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({path: `./screenshots/A-priori/login/pageTitle+255Chars_2.png`})
        await page.getByRole('button', { name: 'Publish', exact: true }).click();
        await new Promise(r => setTimeout(r, 500));
        //Then
        await expect(page.getByText('Validation failed: Title cannot be longer than 255 characters.')).toBeVisible();
        await page.screenshot({path: `./screenshots/A-priori/login/pageTitle+255Chars.png`})
    })
    test('creating a page with a title that has 255 chars should work normally', async({ page }) => {
        //Given
        const aPrioriData = jsonData
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}pages`);
        //And
        await page.goto(`${url}editor/page`);
        const pageTitle: string = aPrioriData[3].text.slice(0, 255);
        await page.getByPlaceholder('Page title').fill(pageTitle);
        await page.locator('p[data-koenig-dnd-droppable="true"]').fill(pageTitle);
        await page.getByRole('button', { name: 'Publish', exact: true }).click();
        await page.locator('[data-test-button="continue"]').click();
        await page.locator('[data-test-button="confirm-publish"]').dispatchEvent('click');
        //Then
        await expect(page.locator('[class="gh-post-bookmark-title"]')).toBeVisible();
        await page.screenshot({path: `./screenshots/A-priori/login/pageTitle=255Chars.png`})
    }) 
    
    test('Trying to update of a existing tag title can not have more than 191 chars', async({ page }) => {
        //Given
        const aPrioriData = jsonData
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}tags`);
        //And
        await page.locator('h3.gh-tag-list-name').first().click();
        const tagTitle: string = aPrioriData[4].text.slice(0, 192);
        await page.locator('input').first().fill(tagTitle);
        await page.locator('div.gh-main-section-content.grey.columns-2').click();
        //Then
        await expect(page.getByText('Tag names cannot be longer than 191 characters.')).toBeVisible();
        await page.screenshot({path: `./screenshots/A-priori/login/tagTitle+191Chars.png`})
    })
    test('updating an existing tag title with 191 chars', async({ page }) => {
        //Given
        const aPrioriData = jsonData
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}tags`);
        //And
        await page.locator('h3.gh-tag-list-name').first().click();
        const tagTitle: string = aPrioriData[5].text.slice(0, 191);
        await page.locator('input').first().fill(tagTitle);
        //Then
        await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeVisible(); //Bug found in tags
        await page.screenshot({path: `./screenshots/A-priori/login/tagTitle=191Chars.png`})
    })    
    test('trying to update tag slug with more than 191 chars', async({ page }) => {
        //Given
        const aPrioriData = jsonData
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}tags`);
        //And
        await page.locator('h3.gh-tag-list-name').first().click();
        const tagSlug: string = aPrioriData[4].text.slice(0, 192);
        await page.locator('input[id="tag-slug"]').fill(tagSlug);
        await page.locator('div.gh-main-section-content.grey.columns-2').click();
        //Then
        await expect(page.getByText('URL cannot be longer than 191 characters.')).toBeVisible();
        await page.screenshot({path: `./screenshots/A-priori/login/tagSlug+191Chars.png`})
    })    
    test('updating a tag slug with 191 chars', async({ page }) => {
        //Given
        const aPrioriData = jsonData
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}tags`);
        //And
        await page.locator('h3.gh-tag-list-name').first().click();
        const tagSlug: string = aPrioriData[4].text.slice(0, 191);
        await page.locator('input[id="tag-slug"]').fill(tagSlug);
        await page.getByRole('button', {name: 'Save', exact: true }).click();
        //Then
        await expect(page.getByText('Saved')).toBeVisible();
        await page.screenshot({path: `./screenshots/A-priori/login/tagSlug=191Chars.png`})
    })


})
    
/*
test('', async({ page }) => {})
*/