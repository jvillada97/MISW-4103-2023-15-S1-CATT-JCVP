import { test, expect, Page } from '@playwright/test';
import fetch from 'node-fetch';


test.describe.serial('pseudo-random scenarios', () =>{
    test.beforeEach(async ({ page }) =>{
        //This does not count as a test, is just done to reduce quantity of code lines
        const url: string = 'http://localhost:2368/ghost/#/';
        await page.goto(url);
        const user: string = 'j.villadap@uniandes.edu.co'
        const password: string =  '-9Js9QVhy:V_nmT';
        await page.locator('[id="identification"]').fill(user);
        await page.locator('[id="password"]').fill(password);
        await page.locator('[data-test-button="sign-in"]').click();
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({path: `./screenshots/pseudo-random/tag/login.png`})
        await expect(page.getByText('Dashboard').first()).toBeVisible();
    })
    test('adding tag description with more than 500 chars', async({ page }) => {
        //Given
        const response = (await fetch('https://my.api.mockaroo.com/text.json?key=20041390'))
        const data = await response.json();
        const apiData: Array<{ email: string; password: string; text: string; url: string }> = data as Array<{ email: string; password: string; text: string; url: string }>
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}tags`);
        //And
        await page.locator('h3.gh-tag-list-name').first().click();
        const tagDescription: string = apiData[1].text.slice(0, 501);
        await page.locator('textarea[id="tag-description"]').clear();
        await page.locator('textarea[id="tag-description"]').fill(tagDescription);
        await page.locator('div.gh-main-section-content.grey.columns-2').click();
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({path: `./screenshots/pseudo-random/tag/tagDescription+500Chars_2.png`})
        //Then
        await expect(page.getByText('Description cannot be longer than 500 characters.')).toBeVisible();
        await page.screenshot({path: `./screenshots/pseudo-random/tag/tagDescription+500Chars.png`})
    })
    test('adding tag description with 500 chars', async({ page }) => {
        //Given
        const response = (await fetch('https://my.api.mockaroo.com/text.json?key=20041390'))
        const data = await response.json();
        const apiData: Array<{ email: string; password: string; text: string; url: string }> = data as Array<{ email: string; password: string; text: string; url: string }>
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}tags`);
        //And
        await page.locator('h3.gh-tag-list-name').first().click();
        const tagDescription: string = apiData[1].text.slice(0, 500);
        await page.locator('textarea[id="tag-description"]').fill(tagDescription);
        await page.getByRole('button', {name: 'Save', exact: true }).click();
        //Then
        await expect(page.getByText('Saved')).toBeVisible();
        await page.screenshot({path: `./screenshots/pseudo-random/tag/tagDescription=500Chars.png`})
    })
    test('changing tag meta data with more than 300 chars', async({ page }) => {
        //Given
        const response = (await fetch('https://my.api.mockaroo.com/text.json?key=20041390'))
        const data = await response.json();
        const apiData: Array<{ email: string; password: string; text: string; url: string }> = data as Array<{ email: string; password: string; text: string; url: string }>
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}tags`);
        //And
        await page.locator('h3.gh-tag-list-name').first().click();
        const tagMetaData: string = apiData[2].text.slice(0, 301);
        await page.getByRole('button', {name: 'Expand', exact: true }).first().click();
        await page.locator('input[id="meta-title"]').fill(tagMetaData);
        await page.locator('div.gh-main-section-content.grey.columns-2').click();

        //Then
        await expect(page.getByText('Meta Title cannot be longer than 300 characters.')).toBeVisible();
        await page.screenshot({path: `./screenshots/pseudo-random/tag/tagMetaData+300Chars.png`})
    })
    test('changing tag meta data with 300 chars', async({ page }) => {
        //Given
        const response = (await fetch('https://my.api.mockaroo.com/text.json?key=20041390'))
        const data = await response.json();
        const apiData: Array<{ email: string; password: string; text: string; url: string }> = data as Array<{ email: string; password: string; text: string; url: string }>
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}tags`);
        //And
        await page.locator('h3.gh-tag-list-name').first().click();
        const tagMetaData: string = apiData[3].text.slice(0, 300);
        await page.getByRole('button', {name: 'Expand', exact: true }).first().click();
        await page.locator('input[id="meta-title"]').fill(tagMetaData);
        await page.locator('div.gh-main-section-content.grey.columns-2').click();
        await page.getByRole('button', {name: 'Save', exact: true }).click();
        //Then
        await expect(page.getByText('Saved')).toBeVisible();
        await page.screenshot({path: `./screenshots/pseudo-random/tag/tagMetaData=300Chars.png`})
    })  
    test('changing tag meta data description with more than 500 chars', async({ page }) => {
        //Given
        const response = (await fetch('https://my.api.mockaroo.com/text.json?key=20041390'))
        const data = await response.json();
        const apiData: Array<{ email: string; password: string; text: string; url: string }> = data as Array<{ email: string; password: string; text: string; url: string }>
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}tags`);
        //And
        await page.locator('h3.gh-tag-list-name').first().click();
        const tagMetaData: string = apiData[4].text.slice(0, 501);
        await page.getByRole('button', {name: 'Expand', exact: true }).first().click();
        await page.locator('textarea[name="metaDescription"]').fill(tagMetaData);
        await page.locator('div.gh-main-section-content.grey.columns-2').click();
        //Then
        await expect(page.getByText('Meta Description cannot be longer than 500 characters.')).toBeVisible();
        await page.screenshot({path: `./screenshots/pseudo-random/tag/tagMetaDescription+500Chars.png`})
    })
    test('changing tag meta data description with 500 chars', async({ page }) => {
        //Given
        const response = (await fetch('https://my.api.mockaroo.com/text.json?key=20041390'))
        const data = await response.json();
        const apiData: Array<{ email: string; password: string; text: string; url: string }> = data as Array<{ email: string; password: string; text: string; url: string }>
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}tags`);
        //And
        await page.locator('h3.gh-tag-list-name').first().click();
        const tagMetaData: string = apiData[5].text.slice(0, 500);
        await page.getByRole('button', {name: 'Expand', exact: true }).first().click();
        await page.locator('textarea[name="metaDescription"]').fill(tagMetaData);
        await page.getByRole('button', {name: 'Save', exact: true }).click();
        //Then
        await expect(page.getByText('Saved')).toBeVisible();
        await page.screenshot({path: `./screenshots/pseudo-random/tag/tagMetaData+300Chars.png`})
    })    
    test('changing canonical url from meta data with non url', async({ page }) => {
        //Given
        const response = (await fetch('https://my.api.mockaroo.com/text.json?key=20041390'))
        const data = await response.json();
        const apiData: Array<{ email: string; password: string; text: string; url: string }> = data as Array<{ email: string; password: string; text: string; url: string }>
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}tags`);
        //And
        await page.locator('h3.gh-tag-list-name').first().click();
        await page.getByRole('button', {name: 'Expand', exact: true }).first().click();
        const nonUrl: string = apiData[6].password;
        await page.locator('input[name="canonicalUrl"]').fill(nonUrl);
        await page.locator('div.gh-main-section-content.grey.columns-2').click();
        //Then
        await expect(page.getByText('The url should be a valid url')).toBeVisible();
        await page.screenshot({path: `./screenshots/pseudo-random/tag/canonicalNonUrl.png`})
    })    
    test('changing canonical url from meta data with valid url', async({ page }) => {
        //Given
        const response = (await fetch('https://my.api.mockaroo.com/text.json?key=20041390'))
        const data = await response.json();
        const apiData: Array<{ email: string; password: string; text: string; url: string }> = data as Array<{ email: string; password: string; text: string; url: string }>
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}tags`);
        //And
        await page.locator('h3.gh-tag-list-name').first().click();
        await page.getByRole('button', {name: 'Expand', exact: true }).first().click();
        const urlApi: string = apiData[7].url;
        await page.locator('input[name="canonicalUrl"]').fill(urlApi);
        await page.getByRole('button', {name: 'Save', exact: true }).click();
        //Then
        await expect(page.getByText('Saved')).toBeVisible();
        await page.screenshot({path: `./screenshots/pseudo-random/tag/canonicalValidUrl.png`})
    })
    test('creating a new member with note with more than 500 chars', async({ page }) => {
        //Given
        const response = (await fetch('https://my.api.mockaroo.com/text.json?key=20041390'))
        const data = await response.json();
        const apiData: Array<{ email: string; password: string; text: string; url: string }> = data as Array<{ email: string; password: string; text: string; url: string }>
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}members`);
        //And
        await page.goto(`${url}members/new`);
        const memberEmail: string = apiData[8].email;
        await page.locator('input[name="email"]').fill(memberEmail);
        const note: string = apiData[8].text.slice(0, 501);
        await page.locator('textarea[name="note"]').fill(note);
        await page.getByRole('button', {name: 'Save', exact: true }).click();
        //Then
        await expect(page.getByText('Note is too long.')).toBeVisible();
        await page.screenshot({path: `./screenshots/pseudo-random/tag/memberNote+500chars.png`})
    })
    test('creating new member with note with 500 chars', async({ page }) => {
        //Given
        const response = (await fetch('https://my.api.mockaroo.com/text.json?key=20041390'))
        const data = await response.json();
        const apiData: Array<{ email: string; password: string; text: string; url: string }> = data as Array<{ email: string; password: string; text: string; url: string }>
        const url: string = 'http://localhost:2368/ghost/#/';
        //When
        await page.goto(`${url}members`);
        //And
        await page.goto(`${url}members/new`);
        const memberEmail: string = apiData[9].email;
        await page.locator('input[name="email"]').fill(memberEmail);
        const note: string = apiData[9].text.slice(0, 500);
        await page.locator('textarea[name="note"]').fill(note);
        await page.getByRole('button', {name: 'Save', exact: true }).click();
        //Then
        await expect(page.getByText('Saved')).toBeVisible();
        await page.screenshot({path: `./screenshots/pseudo-random/tag/memberNote=500chars.png`})
    })        
})

/*
test('', async({ page }) => {})
*/