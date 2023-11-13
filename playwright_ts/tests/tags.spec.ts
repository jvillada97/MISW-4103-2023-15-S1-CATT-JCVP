import { test, expect, Page } from '@playwright/test';
import { faker, ur } from '@faker-js/faker';


test('create tag and verify successful creation', async ({ page }) => {
    const url: string = 'http://localhost:2368/ghost/#/';
    await page.goto(url);

    await page.locator('[id="identification"]').fill('j.villadap@uniandes.edu.co');
    await page.locator('[id="password"]').fill('-9Js9QVhy:V_nmT');
    await page.locator('[data-test-button="sign-in"]').click();
    //Create tag
    await page.goto(`${url}tags`);   
    await page.goto(`${url}tags/new`)
    const fakeTitle : string = faker.lorem.word();
    await new Promise(r => setTimeout(r, 1000));
    await page.locator('input').first().fill(fakeTitle);
    //await page.locator('[data-test-input="tag-description"]').fill(fakeTitle);
    await page.locator('[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]').dispatchEvent('click');
    await page.goto(`${url}tags`);
    await new Promise(r => setTimeout(r, 1000));
    await expect(page.getByText(fakeTitle).first()).toBeVisible();
    console.log(`----------tag ${fakeTitle} created successfully----------`);
    await page.screenshot({path: `./screenshots/tags/tag${fakeTitle}-created.png`})

})