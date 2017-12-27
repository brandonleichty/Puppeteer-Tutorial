const CREDS = require('./creds');

// Dependancies
const puppeteer = require('puppeteer');


const USERNAME_SELECTOR = '#login_field'
const PASSWORD_SELECTOR = '#password';
const BUTTON_SELECTOR = 'input.btn'

async function run() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://github.com/login');
    await page.screenshot({ path: 'screenshots/github.png'});

    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.username);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.password);

    await page.click(BUTTON_SELECTOR);

    await page.waitForNavigation();

    const userToSearch = 'brandon';
    const searchUrl = `https://github.com/search?q=${userToSearch}&type=Users&utf8=%E2%9C%93`;

    await page.goto(searchUrl);
    await page.waitFor(2*1000);

    // const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(1) > div.d-flex > div > a';
const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > a';
// const LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(2) > div.d-flex > div > ul > li:nth-child(2) > a';
const LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > ul > li:nth-child(2) > a';

    
    const LENGTH_SELECTOR_CLASS = 'user-list-item';

    let listLength = await page.evaluate((sel) => {
        return document.getElementsByClassName(sel).length;
    }, LENGTH_SELECTOR_CLASS);

    for (let i = 1; i <= listLength; i++) {
    // change the index to the next child
    let usernameSelector = LIST_USERNAME_SELECTOR.replace("INDEX", i);
    let emailSelector = LIST_EMAIL_SELECTOR.replace("INDEX", i);

    let username = await page.evaluate((sel) => {
        return document.querySelector(sel).getAttribute('href').replace('/', '');
      }, usernameSelector);

    let email = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.innerHTML: null;
      }, emailSelector);

    // not all users have emails visible
    if (!email)
      continue;

    console.log(username, ' -> ', email);

    // TODO save this user
}

    browser.close();
}

run();
