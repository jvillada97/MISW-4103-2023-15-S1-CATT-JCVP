import { test, expect, Page } from '@playwright/test';
import { faker, ur } from '@faker-js/faker';



test.describe.serial("Posts E2E Scenarios", () => {
    test.beforeEach(async ({ page }) =>{
        const user: string = 'j.villadap@uniandes.edu.co';
        const password: string =  'hola123456';
        //Given
        await page.goto('http://localhost:3002/ghost/#/');
        await page.screenshot({path: './screenshots/post/login/step1.png'})
        //When
        await page.getByPlaceholder('jamie@example.com').fill(user);
        await page.screenshot({path: './screenshots/post/login/step2.png'})
        //And
        await page.getByPlaceholder('•••••••••••••••').fill(password);
        await page.screenshot({path: './screenshots/post/login/step3.png'})
        await page.getByRole('button', { name: 'Sign in →', exact: true}).click();
        await page.screenshot({path: './screenshots/post/login/step4.png'})
        // Then
        await expect(page.getByTitle('Dashboard')).toBeVisible();
        console.log("----------Login successful----------");
        await page.screenshot({path: './screenshots/post/login/step5.png'})
    })
    
    test('create post and verify successful creation', async ({ page }) => {
        const url: string = 'http://localhost:3002/ghost/#/';
        //Given
        await page.goto(`${url}posts`); 
        //When
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({path: './screenshots/post/creation/step1.png'})  
        //And
        await page.goto(`${url}editor/post`)
        await page.screenshot({path: './screenshots/post/creation/step2.png'})
        const fakeTitle : string = faker.lorem.word();
        await page.getByPlaceholder('Post title').fill(fakeTitle);
        await page.screenshot({path: './screenshots/post/creation/step3.png'})
        await page.locator('p[data-koenig-dnd-droppable="true"]').fill(fakeTitle);
        await page.screenshot({path: './screenshots/post/creation/step4.png'})
        await page.getByRole('button', { name: 'Publish', exact: true }).click();
        await page.screenshot({path: './screenshots/post/creation/step5.png'})
        await new Promise(r => setTimeout(r, 1000));
        await page.locator('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click();
        await page.screenshot({path: './screenshots/post/creation/step6.png'})
        await new Promise(r => setTimeout(r, 1000));
        await page.locator('button.gh-btn.gh-btn-black.gh-btn-icon.ember-view').click();
        await page.screenshot({path: './screenshots/post/creation/step7.png'})
        await new Promise(r => setTimeout(r, 1000));
        //Then
        await expect(page.getByText(fakeTitle)).toBeVisible();
        await page.screenshot({path: './screenshots/post/creation/step8.png'})
        console.log(`----------post ${fakeTitle} created successfully----------`);

    })
    
    test('edit existing post and verify changes done', async ({ page }) => {
        
        const url: string = 'http://localhost:3002/ghost/#/';
        //Given
        await page.goto(`${url}posts`);
        //When
        await new Promise(r => setTimeout(r, 1000));   
        await page.screenshot({path: './screenshots/post/edition/step1.png'})
        //And
        await page.locator('h3.gh-content-entry-title').first().click();
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({path: './screenshots/post/edition/step2.png'})
        await new Promise(r => setTimeout(r, 2000));
        const initialFakeTitle : string = faker.lorem.word();
        await page.getByPlaceholder('Post title').fill(initialFakeTitle);
        await page.screenshot({path: './screenshots/post/edition/step3.png'})
        await new Promise(r => setTimeout(r, 2000));
        await page.getByText('Update').first().click();
        await page.screenshot({path: './screenshots/post/edition/step4.png'})
        await new Promise(r => setTimeout(r, 2000));
        await page.locator('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click();
        await page.screenshot({path: './screenshots/post/edition/step5.png'})
        await page.goto(`${url}posts`);
        await new Promise(r => setTimeout(r, 1000));
        //Then
        await expect(page.getByText(initialFakeTitle)).toBeVisible();
        await page.screenshot({path: './screenshots/post/edition/step6.png'})
        console.log(`----------post ${initialFakeTitle} edited successfully----------`);
        
          
    })
   
   
    test('delete post and verify deletion', async ({ page }) => {
        const url: string = 'http://localhost:3002/ghost/#/';
        
        await page.goto(`${url}posts`);
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({path: './screenshots/post/deletion/step1.png'})
        await page.locator('h3.gh-content-entry-title').first().click();
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({path: './screenshots/post/deletion/step2.png'})
        await new Promise(r => setTimeout(r, 2000));
        await page.getByTitle('Settings').click();
        await page.screenshot({path: './screenshots/post/deletion/step3.png'})
        await page.getByRole('button', { name: 'Delete post'}).click();
        await page.screenshot({path: './screenshots/post/deletion/step4.png'})
        await new Promise(r => setTimeout(r, 1000));
        await page.getByRole('button', { name: 'Delete', exact: true }).click();
        await page.screenshot({path: './screenshots/post/deletion/step5.png'})
        await new Promise(r => setTimeout(r, 1000));
        await expect(page.url()).toEqual(`${url}posts`);
        await page.screenshot({path: './screenshots/post/deletion/step6.png'})
        console.log(`----------post deleted successfully----------`);
    })
    
})
