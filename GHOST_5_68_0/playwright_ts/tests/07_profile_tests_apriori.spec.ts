import { test, expect, Page } from '@playwright/test';
import jsonData from './WEEK8_DATA.json' assert { type: "json" }

test.describe.serial('Random scenarios using faker in profile section ', () =>{
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
    test('Text too long on full name field', async({ page }) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        const ghostSlug: string = 'juanc_villada'
        const aPrioriData = jsonData
        //Given
        await page.goto(`${url}settings/staff/${ghostSlug}`);
        const fakeTitle : string = aPrioriData[0].text.slice(0, 500);
        //When 
        await page.locator('input[id="user-name"]').fill(fakeTitle);
        //And
        await page.locator('div.pa5').first().click();
        //Then
        await expect(page.getByText('Name is too long')).toBeVisible();
        await page.screenshot({path: './screenshots/profile/apriori/FullName.png'})   
    })
    test('Valid email address', async({ page }) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        const ghostSlug: string = 'juanc_villada'
        const aPrioriData = jsonData
        //Given
        await page.goto(`${url}settings/staff/${ghostSlug}`);
        const fakeTitle : string = aPrioriData[1].text;
        //When 
        await page.getByPlaceholder('jamie@example.com').fill(fakeTitle);
        //And
        await page.locator('div.pa5').first().click();
        await page.screenshot({path: './screenshots/profile/random/validEmail.png'})   
        //Then
        try {
            await expect(page.getByText('Please supply a valid email address')).toBeVisible();    
        } catch (error) {
            await expect(page.getByText('Email is too long')).toBeVisible();
        }  
        await page.screenshot({path: './screenshots/profile/apriori/validEmail.png'})   
    })
    test('location is too long', async({ page }) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        const ghostSlug: string = 'juanc_villada'
        const aPrioriData = jsonData
        //Given
        await page.goto(`${url}settings/staff/${ghostSlug}`);
        const fakeTitle : string = aPrioriData[2].text;
        //When 
        await page.locator('input[id="user-location"]').fill(fakeTitle);
        //And
        await page.locator('div.pa5').first().click();
        //Then
        await expect(page.getByText('Location is too long')).toBeVisible();
        await page.screenshot({path: './screenshots/profile/apriori/longLocation.png'})   
    })
    test('website is not a valid url', async({ page }) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        const ghostSlug: string = 'juanc_villada'
        const aPrioriData = jsonData
        //Given
        await page.goto(`${url}settings/staff/${ghostSlug}`);
        const fakeTitle : string = aPrioriData[3].text;
        //When
        await page.locator('input[id="user-website"]').fill(fakeTitle); 
        //And
        await page.locator('div.pa5').first().click();
        //Then
        await expect(page.getByText('Website is not a valid url')).toBeVisible();
        await page.screenshot({path: './screenshots/profile/apriori/validWebsite.png'})   
    })
    test('valid twitter user', async({ page }) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        const ghostSlug: string = 'juanc_villada'
        const aPrioriData = jsonData
        //Given
        await page.goto(`${url}settings/staff/${ghostSlug}`);
        const fakeTitle : string = aPrioriData[4].text;
        //When
        await page.locator('input[id="user-twitter"]').fill(fakeTitle);
        //And
        await page.locator('div.pa5').first().click();
        //Then
        await expect(page.getByText('Your Username is not a valid Twitter Username')).toBeVisible();
        await page.screenshot({path: './screenshots/profile/apriori/validTwitter.png'})   
    })
    test('200 chars in bio', async({ page }) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        const ghostSlug: string = 'juanc_villada'
        const aPrioriData = jsonData
        //Given
        await page.goto(`${url}settings/staff/${ghostSlug}`);
        const fakeTitle : string = aPrioriData[5].text.slice(0, 200);
        //When
        await page.locator('textarea[id="user-bio"]').fill(fakeTitle);
        await page.locator('div.pa5').first().click();
        //Then
        await expect(page.getByText(`You've used ${fakeTitle.length}`)).toBeVisible();
        await page.screenshot({path: './screenshots/profile/apriori/200charsBio.png'})   
    })
    test('+200 chars in bio', async({ page }) => {
        const url: string = 'http://localhost:2368/ghost/#/';
        const ghostSlug: string = 'juanc_villada'
        const aPrioriData = jsonData
        //Given
        await page.goto(`${url}settings/staff/${ghostSlug}`);
        const fakeTitle : string = aPrioriData[6].text.slice(0, 201);
        //When
        await page.locator('textarea[id="user-bio"]').fill(fakeTitle);
        await page.locator('div.pa5').first().click();
        //Then
        await expect(page.getByText(`You've used ${fakeTitle.length}`)).toBeVisible();
        await page.screenshot({path: './screenshots/profile/apriori/+200charsBio.png'})   
    })
})