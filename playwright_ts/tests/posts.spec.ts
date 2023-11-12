import { test, expect, Page } from '@playwright/test';
import { faker, ur } from '@faker-js/faker';



test('check login', async ({ page }) => {
    const user: string = 'j.villadap@uniandes.edu.co';
    const password: string =  '-9Js9QVhy:V_nmT';
    await page.goto('http://localhost:2368/ghost/#/');

    await page.locator('[id="identification"]').fill(user);
    await page.locator('[id="password"]').fill(password);
    await page.locator('[data-test-button="sign-in"]').click();
    
    // Expect the url "to contain" a substring.
    await expect(page).toHaveURL(/.*dashboard/);
    console.log("----------Login successful----------");
    await page.screenshot({path: './screenshots/post/login.png'})
});


test('create post and verify successful creation', async ({ page }) => {
    const url: string = 'http://localhost:2368/ghost/#/';
    await page.goto(url);

    await page.locator('[id="identification"]').fill('j.villadap@uniandes.edu.co');
    await page.locator('[id="password"]').fill('-9Js9QVhy:V_nmT');
    await page.locator('[data-test-button="sign-in"]').click();
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
    let postName: string = '';
    const url: string = 'http://localhost:2368/ghost/#/';
    await page.goto(url);

    await page.locator('[id="identification"]').fill('j.villadap@uniandes.edu.co');
    await page.locator('[id="password"]').fill('-9Js9QVhy:V_nmT');
    await page.locator('[data-test-button="sign-in"]').click();
    await page.goto(`${url}posts`);   
    await page.goto(`${url}editor/post`)
    const initialFakeTitle : string = faker.lorem.word();
    await page.locator('[placeholder="Post title"]').fill(initialFakeTitle);
    await page.locator('[data-koenig-dnd-droppable="true"]').fill(initialFakeTitle);
    await page.locator('[data-test-button="publish-flow"]').click();
    await page.locator('[data-test-button="continue"]').click();
    await page.locator('button', {hasText: 'Publish post, right now'}).dispatchEvent('click');
    await new Promise(r => setTimeout(r, 1000));
    await page.goto(`${url}posts`);   
    await new Promise(r => setTimeout(r, 1000));
    // This line gets the title of the first post
    postName = await page.locator('[class="gh-content-entry-title"]').first().innerText();
    await page.getByText(postName).click();
    const fakeTitle : string = faker.lorem.word();
    await page.locator('[placeholder="Post title"]').fill(fakeTitle);
    await page.locator('[data-koenig-dnd-droppable="true"]').fill(fakeTitle);
    await page.locator('[data-test-button="publish-save"]').click();
    await page.goto(`${url}posts`);
    
    await expect(page.getByText(fakeTitle)).toBeVisible();
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({path: `./screenshots/post/post${fakeTitle}-edited.png`})
    console.log(`----------post ${fakeTitle} edited successfully----------`);  
})

test('delete post and verify deletion', async ({ page }) => {
    const url: string = 'http://localhost:2368/ghost/#/';
    await page.goto(url);

    await page.locator('[id="identification"]').fill('j.villadap@uniandes.edu.co');
    await page.locator('[id="password"]').fill('-9Js9QVhy:V_nmT');
    await page.locator('[data-test-button="sign-in"]').click();
    
    await page.goto(`${url}posts`);
    
    await page.goto(`${url}editor/post`)
    const initialFakeTitle : string = faker.lorem.word();
    await page.locator('[placeholder="Post title"]').fill(initialFakeTitle);
    await page.locator('[data-koenig-dnd-droppable="true"]').fill(initialFakeTitle);
    await page.locator('[data-test-button="publish-flow"]').click();
    await page.locator('[data-test-button="continue"]').click();
    await page.locator('button', {hasText: 'Publish post, right now'}).dispatchEvent('click');
    await new Promise(r => setTimeout(r, 1000));
    await page.goto(`${url}posts`);   
    await new Promise(r => setTimeout(r, 1000));
    //go to first post
    const postName = await page.locator('[class="gh-content-entry-title"]').first().innerText();
    await page.getByText(postName).click();
    await page.locator('[title="Settings"]').click();
    await page.getByText('Delete post').click();
    await new Promise(r => setTimeout(r, 1000));
    await page.getByText('Delete').last().click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: `./screenshots/post/post${postName}-deleted.png`})
    console.log(`----------post ${postName} deleted successfully----------`);

})
