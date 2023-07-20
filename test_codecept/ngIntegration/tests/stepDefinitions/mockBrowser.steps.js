const idamLogin = require("../../util/idamLogin");

const mockClient = require('../../../backendMock/client/index')
Given('I set MOCK browser cookies', async function () {

    let cookies = cookieString.replace(" ", "")
    cookies = cookies + ";xui-webapp=" + sessionToken;

    let cookiesList = cookies.split(";");
    cookiesList = cookiesList.map(cookie => {
        const kv = cookie.split('=')
        return { name: kv[0], value:kv[1]}
    })

    browser.driver.manage().getCookies = () => {
        return cookiesList;
    }
});


Given('I set debug browser user details', async function (datatable) {
    const rowsHash = datatable.parse().rowsHash()
    let cookies = cookieString.replace(" ","")
    cookies = cookies + ";xui-webapp=" + sessionToken
    const userDetails = await idamLogin.getUserDetailsWithCookieString(cookies)
    const properties = rowsHash;
    for (const key of Object.keys(properties)) {
        if (key === 'roles') {
            userDetails.userInfo[key] = properties[key].split(',').map(v => v.trim())
        } else {
            userDetails.userInfo[key] = properties[key]
        }

    }
    const auth = await browser.driver.manage().getCookie('__auth__')
    await mockClient.updateAuthSessionWithUserInfo(auth.value, userDetails.userInfo);
});

const cookieString = "__userid__=***REMOVED***; __auth__=eyJ0eXAiOiJKV1QiLCJraWQiOiIxZXIwV1J3Z0lPVEFGb2pFNHJDL2ZiZUt1M0k9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJsdWtlc3VwZXJ1c2VyeHVpQG1haWxuZXNpYS5jb20iLCJjdHMiOiJPQVVUSDJfU1RBVEVMRVNTX0dSQU5UIiwiYXV0aF9sZXZlbCI6MCwiYXVkaXRUcmFja2luZ0lkIjoiNzczOTUwMGMtNmRhMS00ZTk3LWEzZDctNDYxYjZjODc1NDJkLTQ2MTc1MjIwIiwic3VibmFtZSI6Imx1a2VzdXBlcnVzZXJ4dWlAbWFpbG5lc2lhLmNvbSIsImlzcyI6Imh0dHBzOi8vZm9yZ2Vyb2NrLWFtLnNlcnZpY2UuY29yZS1jb21wdXRlLWlkYW0tYWF0Mi5pbnRlcm5hbDo4NDQzL29wZW5hbS9vYXV0aDIvcmVhbG1zL3Jvb3QvcmVhbG1zL2htY3RzIiwidG9rZW5OYW1lIjoiYWNjZXNzX3Rva2VuIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImF1dGhHcmFudElkIjoiRmR5VldvQWVMTDNtR1RDT0FlcG9OY2hTT0JRIiwibm9uY2UiOiI0VUhzZkptNi1IYTNlc3hyOFFyM0dPbkNkOUk5U3o0NDJjOXJBLXRmUVBVIiwiYXVkIjoieHVpd2ViYXBwIiwibmJmIjoxNjg5MTkzODY3LCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiY3JlYXRlLXVzZXIiLCJtYW5hZ2UtdXNlciIsInNlYXJjaC11c2VyIl0sImF1dGhfdGltZSI6MTY4OTE5Mzg2NiwicmVhbG0iOiIvaG1jdHMiLCJleHAiOjE2ODkyMjI2NjcsImlhdCI6MTY4OTE5Mzg2NywiZXhwaXJlc19pbiI6Mjg4MDAsImp0aSI6InVkbnVpaW5QZ1EzZFJuYlF2b1lucHZ0VUh4OCJ9.dVZ_RiWpXWaYPxe70sMyHNFd-6kruh6H1ZWJhhuQaXZN2fli0yMfHsNhLDnIgcHZHFjnGcc52Bicl4mlSJmNc4x-OoMmYhg5QaAoXdO0J0NbAtSdr7iPxzWmogO4sYzGegzaQBA7R5BSrLGDAcm7tU8PdTAiYa2aPm7jxyR9cYlwP8eYGBD5FbMpssuQqkr7vWmDKinZuqub4gEc-gqjKsztKbXGCFsEZQWCc-SxhdZVljyoE8mMLXFyI718fCh362LkxF1yMbQx42bcM-qkb6K3rol5WoyZra6gaB1boZoJqV3QiHSMezkK4LnIOUEgkBlPPCloY_CdSwHXmDN5UQ; XSRF-TOKEN=xGPc5Eku-_rnN-GcUr8PrNg7DEXt_1I9Ctmg"

const sessionToken = "s%3AhP5yuQBR_i3w7vdeNZNppo7mGym0GLsX.v9lLwukbJw93vaF4kJ%2F3v%2FNc%2FnYMiunVUMAPaXE3Qiw"
