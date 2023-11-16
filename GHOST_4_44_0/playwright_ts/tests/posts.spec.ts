import { test, expect, Page } from '@playwright/test';
import { faker, ur } from '@faker-js/faker';



test.describe.serial("Posts E2E Scenarios", () => {
    test.beforeEach(async ({ page }) =>{
        const user: string = 'j.villadap@uniandes.edu.co';
        const password: string =  'hola123456';
        await page.goto('http://localhost:3002/ghost/#/');

        await page.getByPlaceholder('jamie@example.com').fill(user);
        await page.getByPlaceholder('•••••••••••••••').fill(password);
        await page.getByRole('button', { name: 'Sign in →', exact: true}).click();
        
        // Expect the url "to contain" a substring.
        await expect(page.getByTitle('Dashboard')).toBeVisible();
        console.log("----------Login successful----------");
        await page.screenshot({path: './screenshots/post/login.png'})
    })
    
    test('create post and verify successful creation', async ({ page }) => {
        const url: string = 'http://localhost:3002/ghost/#/';
        //Create post
        await page.goto(`${url}posts`);   
        await page.goto(`${url}editor/post`)
        const fakeTitle : string = faker.lorem.word();
        await page.getByPlaceholder('Post title').fill(fakeTitle);
        await page.locator('p[data-koenig-dnd-droppable="true"]').fill(fakeTitle);
        await page.getByRole('button', { name: 'Publish', exact: true }).click();
        await new Promise(r => setTimeout(r, 1000));
        await page.locator('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click();
        await new Promise(r => setTimeout(r, 1000));
        await page.locator('button.gh-btn.gh-btn-black.gh-btn-icon.ember-view').click();
        await new Promise(r => setTimeout(r, 1000));
        await expect(page.getByText(fakeTitle)).toBeVisible();
        await page.screenshot({path: `./screenshots/post/post${fakeTitle}-created.png`})
        console.log(`----------post ${fakeTitle} created successfully----------`);

    })
    
    test('edit existing post and verify changes done', async ({ page }) => {
        
        const url: string = 'http://localhost:3002/ghost/#/';
        await page.goto(`${url}posts`);   
        await page.locator('h3.gh-content-entry-title').first().click();
        await new Promise(r => setTimeout(r, 2000));
        const initialFakeTitle : string = faker.lorem.word();
        await page.getByPlaceholder('Post title').fill(initialFakeTitle);
        await new Promise(r => setTimeout(r, 2000));
        await page.getByText('Update').first().click();
        await new Promise(r => setTimeout(r, 2000));
        await page.locator('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click();
        await page.goto(`${url}posts`);   
        await new Promise(r => setTimeout(r, 1000));
        await expect(page.getByText(initialFakeTitle)).toBeVisible();
        await page.screenshot({path: `./screenshots/post/post${initialFakeTitle}-edited.png`})        
        console.log(`----------post ${initialFakeTitle} edited successfully----------`);
        
          
    })
   
   
    test('delete post and verify deletion', async ({ page }) => {
        const url: string = 'http://localhost:3002/ghost/#/';
        
        await page.goto(`${url}posts`);
        await page.locator('h3.gh-content-entry-title').first().click();
        await new Promise(r => setTimeout(r, 2000));
        await page.getByTitle('Settings').click();
        await page.getByRole('button', { name: 'Delete post'}).click();
        await new Promise(r => setTimeout(r, 1000));
        await page.getByRole('button', { name: 'Delete', exact: true }).click();
        await new Promise(r => setTimeout(r, 1000));
        await expect(page.url()).toEqual(`${url}posts`);
        await page.screenshot({path: `./screenshots/post/post-deleted.png`})
        console.log(`----------post deleted successfully----------`);
    })
    
})
