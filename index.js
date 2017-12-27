const CREDS = require('./creds');

// Dependancies
const puppeteer = require('puppeteer');


const USERNAME_SELECTOR = '<input autocapitalize="off" autocorrect="off" autofocus="autofocus" class="form-control input-block" id="login_field" name="login" tabindex="1" type="text">'
const PASSWORD_SELECTOR = '<input class="form-control form-control input-block" id="password" name="password" tabindex="2" type="password">';
const BUTTON_SELECTOR = '<input class="btn btn-primary btn-block" data-disable-with="Signing in…" name="commit" tabindex="3" value="Sign in" type="submit">'

async function run() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://github.com/login');
    await page.screenshot({ path: 'screenshots/github.png'});

    browser.close();
}

run();