import { test, expect, Page } from '@playwright/test';
import { faker, ur } from '@faker-js/faker';

test.describe.serial("Pages E2E Scenarios", () => {
    test.beforeEach(async ({ page }) =>{
        const user: string = 'j.villadap@uniandes.edu.co';
        const password: string =  '-9Js9QVhy:V_nmT';
        await page.goto('http://localhost:2368/ghost/#/');

        await page.locator('[id="identification"]').fill(user);
        await page.locator('[id="password"]').fill(password);
        await page.locator('[data-test-button="sign-in"]').click();
        
        // Expect the url "to contain" a substring.
        await expect(page.getByText('Welcome to your Dashboard')).toBeVisible();
        console.log("----------Login successful----------");
        await page.screenshot({path: './screenshots/page/login.png'})
    })

    test('creates page and verify successful creation', async ({ page }) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        //Create page
        await page.goto(`${url}pages`);
        await page.goto(`${url}editor/page`);
        const fakePage = faker.lorem.word();
        await page.getByPlaceholder('Page title').fill(fakePage);
        await page.locator('p[data-koenig-dnd-droppable="true"]').fill(fakePage);
        await page.getByRole('button', { name: 'Publish', exact: true }).click();
        await page.getByRole('button', { name: 'Continue, final review →', exact: true }).click();
        await new Promise(r => setTimeout(r, 1000));
        await page.locator('[data-test-button="confirm-publish"]').dispatchEvent('click');
        await new Promise(r => setTimeout(r, 1000));
        await expect(page.getByText(fakePage).first()).toBeVisible();
        await page.screenshot({path: `./screenshots/page/page${fakePage}-created.png`})        
        console.log(`----------page ${fakePage} created successfully----------`);
        
    })

    test('edits page recently created', async( { page }) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        
        await page.goto(`${url}pages`);
        await page.locator('h3.gh-content-entry-title').first().click();
        await new Promise(r => setTimeout(r, 2000));
        const initialFakeTitle : string = faker.lorem.word();
        await page.getByPlaceholder('Page title').fill(initialFakeTitle);
        await new Promise(r => setTimeout(r, 2000));
        await page.getByText('Update').first().click();
        await page.goto(`${url}pages`);
        expect(page.getByText(initialFakeTitle)).toBeVisible();
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({path: `./screenshots/page/page${initialFakeTitle}-edited.png`})        
        console.log(`----------page ${initialFakeTitle} edited successfully----------`);
        
    })

    test('deletes page recently edited', async( { page }) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        
        await page.goto(`${url}pages`);
        await page.locator('h3.gh-content-entry-title').first().click();
        await new Promise(r => setTimeout(r, 2000));
        await page.getByTitle('Settings').click();
        await page.getByRole('button', { name: 'Delete'}).click();
        await new Promise(r => setTimeout(r, 1000));
        await page.getByRole('button', { name: 'Delete', exact: true }).click();
        await new Promise(r => setTimeout(r, 1000));
        await expect(page.url()).toEqual(`${url}pages`);
        await page.screenshot({path: `./screenshots/page/page-deleted.png`})        
        console.log(`----------page deleted successfully----------`);
        

    })
})