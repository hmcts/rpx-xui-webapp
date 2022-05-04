import * as puppeteer from 'puppeteer';

// const username = process.env.TEST_API_EMAIL_ADMIN || 'elvianixui@mailnesia.com';
// const password = process.env.TEST_API_PASSWORD_ADMIN || 'Monday01';
const username = 'sscs.superuser@mailinator.com';
const password = 'Testing123';
let xsrfCookie = '';
let xxsrfCookie = '';
let authCookie='';
let useridCookie ='';

const userNameCSSSelector = '#username';
const passwordCSSSelector = '#password';

let userCookie = '';
export async function  authenticateAndGetcookies(url)  {
  console.log( 'Getting Cookie details...');
  if (userCookie !== '')
  {
    return userCookie;
  }
  const browser = await puppeteer.launch(getPuppeteerLaunchOptions(url));

  const page = await browser.newPage();
  await page.goto(url);
  console.log( 'Loading...');

  // try {
  //   await page.waitForSelector('#username', { visible: true });
  //
  //   await page.type('#username', username);
  //   await page.type('#password', password);
  //
  //   await page.click('.button');
  //   await page.waitForSelector('.hmcts-header__navigation', { visible: true });
  // } catch (error) {
  //   await browser.close();
  //   throw error;
  // }

  let loginRetryCounter = 0;
  let isLoginSuccess = false;
  while (loginRetryCounter < 3 && !isLoginSuccess) {
    try {
      console.log(`login retry attempt : ' + ${loginRetryCounter}`);
      await page.waitForSelector(userNameCSSSelector, { visible: true, timeout: 20000 });
      await page.type(userNameCSSSelector, username);
      await page.type(passwordCSSSelector, password);
      await page.click('.button');
      // browser.sleep(10000);
      await page.waitForSelector('.hmcts-header__navigation', { visible: true, timeout: 30000 });
      isLoginSuccess = true;
    } catch (error) {
      const usernameInput = await page.$eval(userNameCSSSelector , element => element.value);
      if (usernameInput === '') {
        loginRetryCounter++;
        console.log(`Login error :  ${error.message}`);
      } else {
        await browser.close();
        throw error;
      }
    }
  }
  if (!isLoginSuccess) {
    throw new Error('Login not successful...');
  }

  const cookies: [] = await page.cookies();

  let roles = '';
  let webappCookie = '';

  cookies.forEach((cookie: any) => {
    if (cookie.name === 'XSRF-TOKEN') {
      xxsrfCookie = cookie.value;
      xsrfCookie = `XSRF-TOKEN= ${cookie.value}`;
    }
    if (cookie.name === '__auth__') {
      authCookie = `roles= ${cookie.value}`;
    }
    if (cookie.name === '__userid__') {
      useridCookie = `__userid__= ${cookie.value}`;
    }
    if (cookie.name === 'xui-webapp') {
      webappCookie = `xui-webapp= ${cookie.value}`;
    }

  });
  const finalCookie = `${authCookie};${webappCookie};${xsrfCookie};${useridCookie}`;
  await browser.close();
  userCookie = finalCookie;
  return finalCookie;
}

export async function xxsrftoken()  {
  return xxsrfCookie;
}

function getPuppeteerLaunchOptions(url) {
  const puppeteerOption = { ignoreHTTPSErrors: true, headless: true, args: [] };
  // if (!url.includes('administer-org.')) {
  //  puppeteerOption.args.push('--proxy-server=http://proxyout.reform.hmcts.net:8080');
  // }

  return puppeteerOption;
}
