import { test, expect, Page } from '@playwright/test';
import { faker, ur } from '@faker-js/faker';

test('create page and verify successful creation', async ({ page }) => {
    const url: string = 'http://localhost:2368/ghost/#/';
    await page.goto(url);

    await page.locator('[id="identification"]').fill('j.villadap@uniandes.edu.co');
    await page.locator('[id="password"]').fill('-9Js9QVhy:V_nmT');
    await page.locator('[data-test-button="sign-in"]').click();
    //Create page
    await page.goto(`${url}pages`);   
    await page.goto(`${url}editor/page`)
    const fakeTitle : string = faker.lorem.word();
    await page.locator('[placeholder="Page title"]').fill(fakeTitle);
    await page.locator('[data-koenig-dnd-droppable="true"]').fill(fakeTitle);
    await page.locator('[data-test-button="publish-flow"]').click();
    await page.locator('[data-test-button="continue"]').click();
    await new Promise(r => setTimeout(r, 1000));
    await page.locator('[data-test-button="confirm-publish"]').dispatchEvent('click');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: `./screenshots/page/page${fakeTitle}-created.png`})
    await expect(page.locator('[class="gh-post-bookmark-title"]')).toBeVisible();
    console.log(`----------page ${fakeTitle} created successfully----------`);

})

test('create page, edit and verify successful edition', async ({ page }) => {
    const url: string = 'http://localhost:2368/ghost/#/';
    await page.goto(url);

    await page.locator('[id="identification"]').fill('j.villadap@uniandes.edu.co');
    await page.locator('[id="password"]').fill('-9Js9QVhy:V_nmT');
    await page.locator('[data-test-button="sign-in"]').click();
    //Create post
    await page.goto(`${url}pages`);   
    await page.goto(`${url}editor/page`)
    const initialFakeTitle : string = faker.lorem.word();
    await page.locator('[placeholder="Page title"]').fill(initialFakeTitle);
    await page.locator('[data-koenig-dnd-droppable="true"]').fill(initialFakeTitle);
    await page.locator('[data-test-button="publish-flow"]').click();
    await page.locator('[data-test-button="continue"]').click();
    await new Promise(r => setTimeout(r, 1000));
    await page.locator('[data-test-button="confirm-publish"]').dispatchEvent('click');
    await new Promise(r => setTimeout(r, 1000));
    await page.goto(`${url}pages`);   
    await new Promise(r => setTimeout(r, 1000));
    const postName = await page.locator('[class="gh-content-entry-title"]').first().innerText();
    await page.getByText(postName).click();
    await new Promise(r => setTimeout(r, 1000));
    
    const fakeTitle : string = faker.lorem.word();
    await page.locator('[placeholder="Page title"]').fill(fakeTitle);
    await page.locator('[data-koenig-dnd-droppable="true"]').fill(fakeTitle);
    await page.locator('[data-test-button="publish-save"]').click();
    await page.goto(`${url}pages`);
    await expect(page.getByText(fakeTitle)).toBeVisible();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: `./screenshots/page/page${fakeTitle}-edited.png`})
    console.log(`----------page ${fakeTitle} edited successfully----------`);

})

test('create page, delete and confirm successful deletion', async ({ page }) => {
    const url: string = 'http://localhost:2368/ghost/#/';
    await page.goto(url);

    await page.locator('[id="identification"]').fill('j.villadap@uniandes.edu.co');
    await page.locator('[id="password"]').fill('-9Js9QVhy:V_nmT');
    await page.locator('[data-test-button="sign-in"]').click();
    //Create post
    await page.goto(`${url}pages`);   
    await page.goto(`${url}editor/page`)
    const fakeTitle : string = faker.lorem.word();
    await page.locator('[placeholder="Page title"]').fill(fakeTitle);
    await page.locator('[data-koenig-dnd-droppable="true"]').fill(fakeTitle);
    await page.locator('[data-test-button="publish-flow"]').click();
    await page.locator('[data-test-button="continue"]').click();
    await new Promise(r => setTimeout(r, 1000));
    await page.locator('[data-test-button="confirm-publish"]').dispatchEvent('click');
    await new Promise(r => setTimeout(r, 1000));
    await page.goto(`${url}pages`);
    const postName = await page.locator('[class="gh-content-entry-title"]').first().innerText();
    await page.getByText(postName).click();

    await page.locator('[title="Settings"]').click();
    await page.getByText('Delete page').click();
    await new Promise(r => setTimeout(r, 1000));
    await page.getByText('Delete').last().click();
    await new Promise(r => setTimeout(r, 1000));
    const tablePages = await page.locator('[class="gh-content-entry-title"]').count();
    expect(tablePages).toEqual(2);
    await page.screenshot({path: `./screenshots/page/page${fakeTitle}-deleted.png`})
    console.log(`----------page ${fakeTitle} deleted successfully----------`);

})