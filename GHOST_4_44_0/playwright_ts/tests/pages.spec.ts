import { test, expect, Page } from '@playwright/test';
import { faker, ur } from '@faker-js/faker';

test.describe.serial("Pages E2E Scenarios", () => {
    test.beforeEach(async ({ page }) =>{
        const user: string = 'j.villadap@uniandes.edu.co';
        const password: string =  'hola123456';
        //Given
        await page.goto('http://localhost:3002/ghost/#/');
        //When
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({path: `./screenshots/page/login/step1.png`})
        //And
        await page.getByPlaceholder('jamie@example.com').fill(user);
        await page.screenshot({path: `./screenshots/page/login/step2.png`})
        await page.getByPlaceholder('•••••••••••••••').fill(password);
        await page.screenshot({path: `./screenshots/page/login/step3.png`})
        await page.getByRole('button', { name: 'Sign in →', exact: true}).click();
        await page.screenshot({path: `./screenshots/page/login/step4.png`})
        // Then
        await expect(page.getByTitle('Dashboard')).toBeVisible();
        console.log("----------Login successful----------");
        await page.screenshot({path: `./screenshots/page/login/step5.png`})
    })

    
    
    test('creates page and verify successful creation', async ({ page }) => {
        const url: string = 'http://localhost:3002/ghost/#/';
        //Given
        await page.goto(`${url}pages`);
        //When
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({path: `./screenshots/page/creation/step1.png`})
        //And
        await page.goto(`${url}editor/page`);
        await page.screenshot({path: `./screenshots/page/creation/step2.png`})
        const fakePage = faker.lorem.word();
        await page.getByPlaceholder('Page title').fill(fakePage);
        await page.screenshot({path: `./screenshots/page/creation/step3.png`})
        await page.locator('p[data-koenig-dnd-droppable="true"]').fill(fakePage);
        await page.screenshot({path: `./screenshots/page/creation/step4.png`})
        await page.getByRole('button', { name: 'Publish', exact: true }).click();
        await page.screenshot({path: `./screenshots/page/creation/step5.png`})
        await new Promise(r => setTimeout(r, 1000));
        await page.locator('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click();
        await page.screenshot({path: `./screenshots/page/creation/step6.png`})
        await new Promise(r => setTimeout(r, 1000));
        //Then
        await expect(page.getByText(fakePage).first()).toBeVisible();
        await page.screenshot({path: `./screenshots/page/creation/step7.png`})
        console.log(`----------page ${fakePage} created successfully----------`);
        
        
    })
    
    test('edits page recently created', async( { page }) => {
        const url: string = 'http://localhost:3002/ghost/#/';
        //Given
        await page.goto(`${url}pages`);
        await page.screenshot({path: `./screenshots/page/edition/step1.png`})
        //When
        await page.locator('h3.gh-content-entry-title').first().click();
        //And
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({path: `./screenshots/page/edition/step2.png`})
        await new Promise(r => setTimeout(r, 2000));
        const initialFakeTitle : string = faker.lorem.word();
        await page.getByPlaceholder('Page title').fill(initialFakeTitle);
        await page.screenshot({path: `./screenshots/page/edition/step3.png`})
        await new Promise(r => setTimeout(r, 2000));
        await page.getByText('Update').first().click();
        await page.screenshot({path: `./screenshots/page/edition/step4.png`})
        await new Promise(r => setTimeout(r, 2000));
        await page.locator('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').click();
        await page.screenshot({path: `./screenshots/page/edition/step5.png`})
        await page.goto(`${url}pages`);
        //Then
        expect(page.getByText(initialFakeTitle)).toBeVisible();
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({path: `./screenshots/page/edition/step6.png`})
        console.log(`----------page ${initialFakeTitle} edited successfully----------`);
        
    })
    
   
    test('deletes page recently edited', async( { page }) => {
        const url: string = 'http://localhost:3002/ghost/#/';
        //Given
        await page.goto(`${url}pages`);
        await page.screenshot({path: `./screenshots/page/deletion/step1.png`}) 
        //When
        await page.locator('h3.gh-content-entry-title').first().click();
        //And
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({path: `./screenshots/page/deletion/step2.png`}) 
        await new Promise(r => setTimeout(r, 2000));
        await page.getByTitle('Settings').click();
        await page.screenshot({path: `./screenshots/page/deletion/step3.png`}) 
        await page.getByRole('button', { name: 'Delete page'}).click();
        await page.screenshot({path: `./screenshots/page/deletion/step4.png`}) 
        await new Promise(r => setTimeout(r, 1000));
        await page.getByRole('button', { name: 'Delete', exact: true }).click();
        await page.screenshot({path: `./screenshots/page/deletion/step5.png`}) 
        await new Promise(r => setTimeout(r, 1000));
        //Then
        await expect(page.url()).toEqual(`${url}pages`);
        console.log(`----------page deleted successfully----------`);
        

    })
    
})