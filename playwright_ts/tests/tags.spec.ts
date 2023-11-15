import { test, expect, Page } from '@playwright/test';
import { faker, ur } from '@faker-js/faker';


test.describe.serial("Tags E2E Scenarios", () => {
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
        await page.screenshot({path: './screenshots/tags/login.png'})
    })

    test('create tag and verify successful creation', async ({ page }) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        await page.goto(`${url}tags`);   
        await page.goto(`${url}tags/new`)
        const fakeTitle : string = faker.lorem.word();
        await page.locator('input').first().fill(fakeTitle);
        await page.getByRole('button', { name: 'Save', exact: true }).click();
        await page.goto(`${url}tags`);
        await new Promise(r => setTimeout(r, 1000));
        await expect(page.getByText(fakeTitle).first()).toBeVisible();
        console.log(`----------tag ${fakeTitle} created successfully----------`);
        await page.screenshot({path: `./screenshots/tags/tag${fakeTitle}-created.png`})
    
    })

    test('edit tag and confirms successful edition', async({ page }) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        await page.goto(`${url}tags`);
        await page.locator('h3.gh-tag-list-name').first().click();
        const fakeTitle : string = faker.lorem.word();
        await page.locator('input').first().fill(fakeTitle);
        await page.getByRole('button', { name: 'Save', exact: true }).click();
        await page.goto(`${url}tags`);
        await new Promise(r => setTimeout(r, 1000));
        await expect(page.getByText(fakeTitle).first()).toBeVisible();
        console.log(`----------tag ${fakeTitle} edited successfully----------`);
        await page.screenshot({path: `./screenshots/tags/tag${fakeTitle}-edited.png`})
    

    })

    test('deletes the tag recently edited and confirms correct removal', async({page}) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        await page.goto(`${url}tags`);
        await page.locator('h3.gh-tag-list-name').first().click();
        await page.getByRole('button', { name: 'Delete tag', exact: true}).click();
        await new Promise(r => setTimeout(r, 2000));
        await page.getByRole('button', { name: 'Delete', exact: true}).click();
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({path: `./screenshots/tags/tag-deleted.png`})
        
    })
})
