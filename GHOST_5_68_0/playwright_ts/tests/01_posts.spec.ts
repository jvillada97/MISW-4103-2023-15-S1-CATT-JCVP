import { test, expect, Page } from '@playwright/test';
import { faker, ur } from '@faker-js/faker';



test.describe.serial("Posts E2E Scenarios", () => {
    test.beforeEach(async ({ page }) =>{
        const user: string = 'j.villadap@uniandes.edu.co';
        const password: string =  '-9Js9QVhy:V_nmT';
        //Given
        await page.goto('http://localhost:2368/ghost/#/');
        await page.screenshot({path: './screenshots/post/login/step1.png'})
        //When
        await page.locator('[id="identification"]').fill(user);
        await page.screenshot({path: './screenshots/post/login/step2.png'})
        //And
        await page.locator('[id="password"]').fill(password);
        await page.screenshot({path: './screenshots/post/login/step3.png'})
        await page.locator('[data-test-button="sign-in"]').click();
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({path: './screenshots/post/login/step4.png'})
        
        // Then
        await expect(page.getByText('Dashboard').first()).toBeVisible();
        console.log("----------Login successful----------");
        await page.screenshot({path: './screenshots/post/login/step5.png'})
    })
    
    test('create post and verify successful creation', async ({ page }) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        await page.goto(`${url}posts`);
        await page.screenshot({path: './screenshots/post/creation/step1.png'})
        //Given
        await page.goto(`${url}editor/post`)
        await page.screenshot({path: './screenshots/post/creation/step2.png'})
        const fakeTitle : string = faker.lorem.word();
        //When
        await page.locator('[placeholder="Post title"]').fill(fakeTitle);
        await page.screenshot({path: './screenshots/post/creation/step3.png'})
        //And
        await page.locator('[data-koenig-dnd-droppable="true"]').fill(fakeTitle);
        await page.screenshot({path: './screenshots/post/creation/step4.png'})
        await page.locator('[data-test-button="publish-flow"]').click();
        await page.screenshot({path: './screenshots/post/creation/step5.png'})
        await page.locator('[data-test-button="continue"]').click();
        await page.screenshot({path: './screenshots/post/creation/step6.png'})
        await page.locator('button', {hasText: 'Publish post, right now'}).dispatchEvent('click');
        //Then
        await expect(page.locator('[class="gh-post-bookmark-title"]')).toBeVisible();
        await page.screenshot({path: './screenshots/post/creation/step7.png'})
        console.log(`----------post ${fakeTitle} created successfully----------`);
    })

    
    test('edit existing post and verify changes done', async ({ page }) => {
        
        const url: string = 'http://localhost:2368/ghost/#/';
        //Given
        await page.goto(`${url}posts`);
        await page.screenshot({path: './screenshots/post/edition/step1.png'})   
        //When
        await page.locator('h3.gh-content-entry-title').first().click();
        await page.screenshot({path: './screenshots/post/edition/step2.png'})   
        //And
        await new Promise(r => setTimeout(r, 2000));
        const initialFakeTitle : string = faker.lorem.word();
        await page.getByPlaceholder('Post title').fill(initialFakeTitle);
        await page.screenshot({path: './screenshots/post/edition/step3.png'})   
        await new Promise(r => setTimeout(r, 2000));
        await page.locator('[data-test-button="publish-save"]').click();
        await page.screenshot({path: './screenshots/post/edition/step4.png'})   
        await page.goto(`${url}posts`);
        await page.screenshot({path: './screenshots/post/edition/step5.png'})   
        //Then
        expect(page.getByText(initialFakeTitle)).toBeVisible();
        await new Promise(r => setTimeout(r, 2000));   
        console.log(`----------post ${initialFakeTitle} edited successfully----------`);  
    })
    
    test('delete post and verify deletion', async ({ page }) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        await page.goto(url);
        await page.screenshot({path: './screenshots/post/deletion/step1.png'})   
        //Given
        await page.goto(`${url}posts`);
        await page.screenshot({path: './screenshots/post/deletion/step2.png'})   
        //When
        await new Promise(r => setTimeout(r, 2000));
        //And
        await page.locator('h3.gh-content-entry-title').first().click();
        await page.screenshot({path: './screenshots/post/deletion/step3.png'})   
        await new Promise(r => setTimeout(r, 2000));
        await page.getByTitle('Settings').click();
        await page.screenshot({path: './screenshots/post/deletion/step4.png'})   
        await new Promise(r => setTimeout(r, 2000));
        await page.getByRole('button', { name: 'Delete'}).click();
        await page.screenshot({path: './screenshots/post/deletion/step5.png'})   
        await new Promise(r => setTimeout(r, 1000));
        await page.getByRole('button', { name: 'Delete', exact: true }).click();
        await page.screenshot({path: './screenshots/post/deletion/step6.png'})   
        await new Promise(r => setTimeout(r, 1000));
        //Then
        await expect(page.url()).toEqual(`${url}posts`);
        await page.screenshot({path: './screenshots/post/deletion/step7.png'})   
        console.log(`----------post deleted successfully----------`);
    })

})
