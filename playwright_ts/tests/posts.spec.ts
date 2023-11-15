import { test, expect, Page } from '@playwright/test';
import { faker, ur } from '@faker-js/faker';



test.describe.serial("Posts E2E Scenarios", () => {
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
        await page.screenshot({path: './screenshots/post/login.png'})
    })
    
    test('create post and verify successful creation', async ({ page }) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        //Create post
        await page.goto(`${url}posts`);   
        await page.goto(`${url}editor/post`)
        const fakeTitle : string = faker.lorem.word();
        await page.locator('[placeholder="Post title"]').fill(fakeTitle);
        await page.locator('[data-koenig-dnd-droppable="true"]').fill(fakeTitle);
        await page.locator('[data-test-button="publish-flow"]').click();
        await page.locator('[data-test-button="continue"]').click();
        await page.locator('button', {hasText: 'Publish post, right now'}).dispatchEvent('click');

        await page.screenshot({path: `./screenshots/post/post${fakeTitle}-created.png`})
        await expect(page.locator('[class="gh-post-bookmark-title"]')).toBeVisible();
        console.log(`----------post ${fakeTitle} created successfully----------`);

    })

    
    test('edit existing post and verify changes done', async ({ page }) => {
        
        const url: string = 'http://localhost:2368/ghost/#/';
        await page.goto(`${url}posts`);   
        await page.locator('h3.gh-content-entry-title').first().click();
        await new Promise(r => setTimeout(r, 2000));
        const initialFakeTitle : string = faker.lorem.word();
        await page.getByPlaceholder('Post title').fill(initialFakeTitle);
        await new Promise(r => setTimeout(r, 2000));
        await page.locator('[data-test-button="publish-save"]').click();
        await page.goto(`${url}posts`);
        expect(page.getByText(initialFakeTitle)).toBeVisible();
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({path: `./screenshots/post/post${initialFakeTitle}-edited.png`})        
        console.log(`----------post ${initialFakeTitle} edited successfully----------`);
        
          
    })
    
    test('delete post and verify deletion', async ({ page }) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        await page.goto(url);
        await page.goto(`${url}posts`);
        await new Promise(r => setTimeout(r, 2000));
        await page.locator('h3.gh-content-entry-title').first().click();
        await new Promise(r => setTimeout(r, 2000));
        await page.getByTitle('Settings').click();
        await new Promise(r => setTimeout(r, 2000));
        await page.getByRole('button', { name: 'Delete'}).click();
        await new Promise(r => setTimeout(r, 1000));
        await page.getByRole('button', { name: 'Delete', exact: true }).click();
        await new Promise(r => setTimeout(r, 1000));
        await expect(page.url()).toEqual(`${url}posts`);
        await page.screenshot({path: `./screenshots/post/post-deleted.png`})
        console.log(`----------post deleted successfully----------`);
    })

})
