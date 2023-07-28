const idamLogin = require("../../util/idamLogin");

const mockClient = require('../../../backendMock/client/index')
Given('I set MOCK browser cookies', async function () {

    let cookies = cookieString.replace(" ", "")
    cookies = cookies + ";xui-webapp=" + sessionToken;

    let cookiesList = cookies.split(";");
    cookiesList = cookiesList.map(cookie => {
        const kv = cookie.split('=')
        return { name: kv[0].trim(), value:kv[1].trim()}
    })

    browser.driver.manage().setCookies(cookiesList);
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

const cookieString = "exui-preferred-language=en; xui-webapp=s%3AEibG994JziltsqsRqLVHk7RYeDeOBr9h.5U0%2FMGgv%2FU%2F6eNHz3LCp%2FR8p3KewzkVdNRk37J7pV94; __userid__=52b5a4b0-a69f-41c5-a89f-84b884d7a04d; __auth__=eyJ0eXAiOiJKV1QiLCJraWQiOiIxZXIwV1J3Z0lPVEFGb2pFNHJDL2ZiZUt1M0k9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJDUkRfZnVuY190ZXN0X2FhdF9zdGN3QGp1c3RpY2UuZ292LnVrIiwiY3RzIjoiT0FVVEgyX1NUQVRFTEVTU19HUkFOVCIsImF1dGhfbGV2ZWwiOjAsImF1ZGl0VHJhY2tpbmdJZCI6IjljZDZhN2U0LTc3NmQtNDJjNC1hOWU1LTM2YmVhODdkNTM3Ny03NzI3MTU5OCIsInN1Ym5hbWUiOiJDUkRfZnVuY190ZXN0X2FhdF9zdGN3QGp1c3RpY2UuZ292LnVrIiwiaXNzIjoiaHR0cHM6Ly9mb3JnZXJvY2stYW0uc2VydmljZS5jb3JlLWNvbXB1dGUtaWRhbS1hYXQyLmludGVybmFsOjg0NDMvb3BlbmFtL29hdXRoMi9yZWFsbXMvcm9vdC9yZWFsbXMvaG1jdHMiLCJ0b2tlbk5hbWUiOiJhY2Nlc3NfdG9rZW4iLCJ0b2tlbl90eXBlIjoiQmVhcmVyIiwiYXV0aEdyYW50SWQiOiI0WUdyQ0FTVWxfRHQ1WGRoSzFSWmdLazBLUVUiLCJub25jZSI6IlVxNVZDZTdBaG9VaUw5clkyQjZOdEdfRWpva2ZKLVBHbzl3SnZQTXZpWWciLCJhdWQiOiJ4dWl3ZWJhcHAiLCJuYmYiOjE2OTA1NDU0MzEsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwicm9sZXMiLCJjcmVhdGUtdXNlciIsIm1hbmFnZS11c2VyIiwic2VhcmNoLXVzZXIiXSwiYXV0aF90aW1lIjoxNjkwNTQ1NDMxLCJyZWFsbSI6Ii9obWN0cyIsImV4cCI6MTY5MDU3NDIzMSwiaWF0IjoxNjkwNTQ1NDMxLCJleHBpcmVzX2luIjoyODgwMCwianRpIjoiWXJib0FJcDlVQWl2cEtwbzdDX3V6Ulp2T2cwIn0.IHXxQUVQ09qt6FhGPfieDa-3WnugbRj0v8j-sD573M2NAMybhaAQN9AGCVMjDms-7YG1Gnc9mBQxK89meSD0TPmZz5qYfQKriHWRKqbltGGsamsmPX1OcekJLeBk8dJzntIWq4XVJIr7RToZAuCASlZY6BFwj7005NqIBzbdyMXd4ZPmL2yFUoEuC1yxCGt8HSNwZkzFKVUqJpVT0-8j5q2fIWAP9ZLNkPXE43hMBkrHen9WmUpv6p1K8yKvy4-o8synSUImnF6487GUPDzvi6_qcwAOR0xmZp354AwYsKIZNK6jzd-WxLtMXk921BD1gk_xxHcscWnJaLLjTRyIMA; XSRF-TOKEN=kHk4s3wL-fvQc2Jpur93du7xIEJ6l4MQZswM"
const sessionToken = "s%3AEibG994JziltsqsRqLVHk7RYeDeOBr9h.5U0%2FMGgv%2FU%2F6eNHz3LCp%2FR8p3KewzkVdNRk37J7pV94"
