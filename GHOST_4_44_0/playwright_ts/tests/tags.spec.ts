import { test, expect, Page } from '@playwright/test';
import { faker, ur } from '@faker-js/faker';


test.describe.serial("Tags E2E Scenarios", () => {
    test.beforeEach(async ({ page }) =>{
        const user: string = 'j.villadap@uniandes.edu.co';
        const password: string =  'hola123456';
        //Given
        await page.goto('http://localhost:3002/ghost/#/');
        await page.screenshot({path: './screenshots/tags/login/step1.png'})
        //When 
        await page.getByPlaceholder('jamie@example.com').fill(user);
        await page.screenshot({path: './screenshots/tags/login/step2.png'})
        //And
        await page.getByPlaceholder('•••••••••••••••').fill(password);
        await page.screenshot({path: './screenshots/tags/login/step3.png'})
        await page.getByRole('button', { name: 'Sign in →', exact: true}).click();
        await page.screenshot({path: './screenshots/tags/login/step4.png'})
        //Then
        await expect(page.getByTitle('Dashboard')).toBeVisible();
        console.log("----------Login successful----------");
        await page.screenshot({path: './screenshots/tags/login/step5.png'})
    })
    
    test('create tag and verify successful creation', async ({ page }) => {
        const url: string = 'http://localhost:3002/ghost/#/';
        //Given
        await page.goto(`${url}tags`);   
        await page.screenshot({path: './screenshots/tags/creation/step1.png'})   
        //When
        await page.goto(`${url}tags/new`)
        await page.screenshot({path: './screenshots/tags/creation/step2.png'})   
        const fakeTitle : string = faker.lorem.word();
        //And
        await page.locator('input').first().fill(fakeTitle);
        await page.screenshot({path: './screenshots/tags/creation/step3.png'})   
        await page.getByRole('button', { name: 'Save', exact: true }).click();
        await page.screenshot({path: './screenshots/tags/creation/step4.png'})   
        await page.goto(`${url}tags`);
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({path: './screenshots/tags/creation/step5.png'})   
        //Then
        await expect(page.getByText(fakeTitle).first()).toBeVisible();
        console.log(`----------tag ${fakeTitle} created successfully----------`);
        
    
    })
    
    test('edit tag and confirms successful edition', async({ page }) => {
        const url: string = 'http://localhost:3002/ghost/#/';
        //Given
        await page.goto(`${url}tags`);
        await page.screenshot({path: './screenshots/tags/edition/step1.png'}) 
        //When
        await page.locator('h3.gh-tag-list-name').first().click();
        await page.screenshot({path: './screenshots/tags/edition/step2.png'}) 
        const fakeTitle : string = faker.lorem.word();
        //And
        await page.locator('input').first().fill(fakeTitle);
        await page.screenshot({path: './screenshots/tags/edition/step3.png'}) 
        await page.getByRole('button', { name: 'Save', exact: true }).click();
        await page.screenshot({path: './screenshots/tags/edition/step4.png'}) 
        await page.goto(`${url}tags`);
        await new Promise(r => setTimeout(r, 1000));
        //Then
        await expect(page.getByText(fakeTitle).first()).toBeVisible();
        console.log(`----------tag ${fakeTitle} edited successfully----------`);
        await page.screenshot({path: './screenshots/tags/edition/step5.png'}) 
    
        
    })
    


    test('deletes the tag recently edited and confirms correct removal', async({page}) => {
        const url: string = 'http://localhost:3002/ghost/#/';
        //Given
        await page.goto(`${url}tags`);
        await page.screenshot({path: './screenshots/tags/delition/step1.png'}) 
        //When
        await page.locator('h3.gh-tag-list-name').first().click();
        await page.screenshot({path: './screenshots/tags/delition/step2.png'}) 
        //And
        await page.getByRole('button', { name: 'Delete tag', exact: true}).click();
        await page.screenshot({path: './screenshots/tags/delition/step3.png'}) 
        await new Promise(r => setTimeout(r, 2000));
        await page.getByRole('button', { name: 'Delete', exact: true}).click();
        await page.screenshot({path: './screenshots/tags/delition/step4.png'}) 
        await new Promise(r => setTimeout(r, 2000));
        //then
        await expect(page.url()).toEqual(`${url}tags`);
        await page.screenshot({path: './screenshots/tags/delition/step5.png'}) 
        console.log(`----------tag deleted successfully----------`);
    })
    
})
