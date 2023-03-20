

const express = require('express')

const router = express.Router({ mergeParams: true });
const service = require('./index')

const userApiData = require('../userApiData')

const jwt = require('jsonwebtoken');

const { privateKey, publicKey } = require('./index')


router.get('/o/.well-known/openid-configuration', (req, res) => {
    const oidcConf = service.getOpenIdConfig();
    userApiData.sendResponse(req, res, "openidConfig", () => oidcConf)
});



router.get('/o/userinfo', (req, res) => {

    res.send({
        sub: 'mock_framework_user@justice.gov.uk',
        uid: '7cfc118d-c753-4d6e-b89f-d56d4f8482f5',
        roles: [
            'caseworker-privatelaw-casecreator',
            'caseworker-privatelaw-cafcass',
            'caseworker-privatelaw',
            'payments-refund',
            'caseworker-privatelaw-bulkscan',
            'payments',
            'cwd-user',
            'caseworker',
            'caseworker-privatelaw-superuser',
            'caseworker-privatelaw-courtadmin',
            'caseworker-privatelaw-la'
        ],
        name: 'Prl CTSC Admin',
        given_name: 'Prl',
        family_name: 'CTSC Admin'
    });
});


router.post('/o/userinfo', (req, res) => {

    res.send({});
});


router.get('/o/authrorize', (req, res) => {
    
    res.send();
});


router.post('/o/token', (req, res) => {
    req.body.iss = "https://forgerock-am.service.core-compute-idam-demo.internal:8443/openam/oauth2/realms/root/realms/hmcts"
    req.body.sub = "mock_framework_user@justice.gov.uk";
    req.body.aud = "xuiwebapp";
    req.body.exp = Date.now()+60*60;
    res.send({
        "access_token": jwt.sign(req.body, 'xui-webapp'),
        "refresh_token": jwt.sign(req.body, privateKey, {algorithm:'RS256'}),
        "scope": "profile openid roles manage-user create-user search-user",
        "id_token": jwt.sign(req.body, privateKey, { algorithm: 'RS256' }),
        "token_type": "code",
        "expires_in": "string"
        
    });
});


router.get('/o/jwks', (req, res) => {

    res.send({
        "keys": [
            {
                "kty": "RSA",
                "use": "sig",
                "kid": "1er0WRwgIOTAFojE4rC/fbeKu3I=",
                "n": "01uAHoJeLguETwCkjNocgjmDwstRtJAJEcZbMH-m8InvZxWUEJl7Icjgb_gx_NCLkkjo7HEs0XaBTiwZyxxVN8gKym2HKEdiP3z9c2W-H0Uu7mD3a0o366mUWrgi1cg8V6X7jwex2C7j7NJV4gxqWQBlXNHRBeLjmxWe-KRHSrRO_-713jieib0r3LbZ_AoXshxYw7zo5mcvkKYv9M5QduLXEcJI6UT1YfXYUogVARIkMvjHO2cA5St1NGdBZtB4u8vvJwZSfp2aNlGCgZ4NxL9t-C6oDgNYYLJVgwh79wgwrz1i9uNRHaNal109-9sr2LJuHkw2AIPMH6bfhlgJUQ",
                "e": "AQAB",
                "x5c": [
                    "MIIDQjCCAiqgAwIBAgIQOSqCVPAiSuaO1bN0vnIhtDANBgkqhkiG9w0BAQsFADAeMRwwGgYDVQQDExNDTElHZXREZWZhdWx0UG9saWN5MB4XDTIyMDYwNzEwMzAyNFoXDTIzMDYwNzEwNDAyNFowHjEcMBoGA1UEAxMTQ0xJR2V0RGVmYXVsdFBvbGljeTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANNbgB6CXi4LhE8ApIzaHII5g8LLUbSQCRHGWzB/pvCJ72cVlBCZeyHI4G/4MfzQi5JI6OxxLNF2gU4sGcscVTfICspthyhHYj98/XNlvh9FLu5g92tKN+uplFq4ItXIPFel+48Hsdgu4+zSVeIMalkAZVzR0QXi45sVnvikR0q0Tv/u9d44nom9K9y22fwKF7IcWMO86OZnL5CmL/TOUHbi1xHCSOlE9WH12FKIFQESJDL4xztnAOUrdTRnQWbQeLvL7ycGUn6dmjZRgoGeDcS/bfguqA4DWGCyVYMIe/cIMK89YvbjUR2jWpddPfvbK9iybh5MNgCDzB+m34ZYCVECAwEAAaN8MHowDgYDVR0PAQH/BAQDAgG+MAkGA1UdEwQCMAAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMB8GA1UdIwQYMBaAFL09leR2dfva6lyZO4Ph75zD2wkrMB0GA1UdDgQWBBS9PZXkdnX72upcmTuD4e+cw9sJKzANBgkqhkiG9w0BAQsFAAOCAQEAZrJK2IOtyLP87mr40MfRvXvDCWyj4En4ZHET3wB3vSeINkHpeiVRBVpGifAEFXJP2E07qUmEdDwFtv8GvAf8/PF5ePac8jBnlzxGmeV+WbB2ZKXlvNalrWgQumLuDObqAE7RJXJO5v78Dx+DNHrhwGG1rfs/WF1DrdAhAKfWPhnnMat/g1A99rhYA8vEpx9r+hUQw4SXCIAW0yMfin/m/DluhX94j58mDpsFbi7Wlc2vsHvfFI368gPN8QEnIsnwWMLgS30Tv/0h7AnsO4T/1eSYH/NQeCYhWmw3xoCWE+IVI54Hmza4FXygnjBUqkItrOndgyaKbBl0zdKAiNgMzA=="
                ],
                "x5t": "V8NaZ7P_dxeHkc6ry2Sf2TEvA9w"
            },
            {
                "kty": "RSA",
                "use": "enc",
                "kid": "2EjpucCCmIfA2D8Tx+9JL3KbCLM=",
                "n": "zGx6j_tZBwXd67WeJ1n-UNX9mRbxPGtVLhUxPLK_pUfp-WUmRfkcKf3tPPrdgSRRUDXdnoGR_Cricies74yBXiVnotWC41SYVVPbQtGPnf5AjZm5wPm63OfMZnDlfaMwgbA3BuGhEHZjm_XtQBw6oKIFLEDo53_JPxnCtsMJIROK8Ya_fmqH--8W9RsUMrj9iFhC5Ts02RHyXeqny-A49XiKHi-DHMirSwwakPUQpab7uYW1ltK2Esjbn_6wJXHufV8obhlTR10hw981wceo0a2j1tR0z6qZcUj6e4B6K5ktLDb7xjJrFmm0qqnrOBn80LbpmnV1H0JLldT22leFtw",
                "e": "AQAB",
                "x5c": [
                    "MIIDQjCCAiqgAwIBAgIQW/IDZcXlQY2kilNYMWDXvjANBgkqhkiG9w0BAQsFADAeMRwwGgYDVQQDExNDTElHZXREZWZhdWx0UG9saWN5MB4XDTIyMDYwNzE2NTIwMloXDTIzMDYwNzE3MDIwMlowHjEcMBoGA1UEAxMTQ0xJR2V0RGVmYXVsdFBvbGljeTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMxseo/7WQcF3eu1nidZ/lDV/ZkW8TxrVS4VMTyyv6VH6fllJkX5HCn97Tz63YEkUVA13Z6Bkfwq4nInrO+MgV4lZ6LVguNUmFVT20LRj53+QI2ZucD5utznzGZw5X2jMIGwNwbhoRB2Y5v17UAcOqCiBSxA6Od/yT8ZwrbDCSETivGGv35qh/vvFvUbFDK4/YhYQuU7NNkR8l3qp8vgOPV4ih4vgxzIq0sMGpD1EKWm+7mFtZbSthLI25/+sCVx7n1fKG4ZU0ddIcPfNcHHqNGto9bUdM+qmXFI+nuAeiuZLSw2+8YyaxZptKqp6zgZ/NC26Zp1dR9CS5XU9tpXhbcCAwEAAaN8MHowDgYDVR0PAQH/BAQDAgG+MAkGA1UdEwQCMAAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMB8GA1UdIwQYMBaAFOvy9thOMHVRyBIfGBdRgs4oOxIkMB0GA1UdDgQWBBTr8vbYTjB1UcgSHxgXUYLOKDsSJDANBgkqhkiG9w0BAQsFAAOCAQEAed9hOPYit2njBhbXb8DdNiFcA0XGki9NWi1Et6iu9EzYm4WNJXSbxHDjeQDsv2Xz7S1WdsvOSVtMQ4uQx1qFYFmM+rTskZwwI3xFRfDExGIfp3wt3IJwQdlRy/wapdwo9o7JzoHq/YfAXBqa4iyDkanXZ5yyWJc1g2spuEG0ZVdVzowkN4O2EDaMglzYX8+gepTqIshD1ci1DcGzNk4AKkSzeYnpixcpV9r4zxttLCNxeFLl/wfl+5qNe8N/ZLnPgB9BIo0/9wK278H4hpkTrB8spOS7wO2zDb8G3yi6ousA1C/ZdGR9ifeFgc7T8SPxO9AVfv7sb4L/iQ9toUftxw=="
                ],
                "x5t": "ULnjSR-_Tgf7xIFuUAg1XlWu6p8"
            }
        ]
    });
});


router.post('/o/authrorize', (req, res) => {

    res.send();
});


// router.get('/oauth2/callback', (req, res) => {
//     res.set('Location', 'http://localhost:3000/');
//     res.cookie('XSRF-TOKEN','WEOO1ETc-SkONrAXBUyecjjjp13jVhcJFpiA')
//     res.cookie('__userid__', '41a90c39-d756-4eba-8e85-5b5bf56b31f5')
//     res.cookie('__auth__', '41a90c39-d756-4eba-8e85-5b5bf56b31f5')
//     res.cookie('xui-webapp', 's%3AW9lK_bl38LqrPZqQWg_-nYn9buWbJAS0.LShMQ2AkUvRcXzkFVx4zXdIS7W377O4OQbsSGrlR%2F6w')


//     res.status(302).send();
// });

router.post('/o/token', (req, res) => {

    res.send({
        "access_token": "string",
        "refresh_token": "string",
        "scope": "string",
        "id_token": "string",
        "token_type": "string",
        "expires_in": "string"
    });
});


router.post('/lease', (req,res) => {
    const token = jwt.sign(req.body, 'xui-webapp')
    // console.log(token)
    res.send(token)
})

router.get('/o/authorize', (req, res) => {
    res.set('Location', `http://localhost:3000/oauth2/callback?code=YUP4Q2vUXmFZdpckVlRYFN_4g4w&state=${req.query.state}&client_id=xuiwebapp&iss=https%3A%2F%2Fidam-web-public.aat.platform.hmcts.net%2Fo`);
    res.cookie('Idam.Session', '*AAJTSQACMDIABHR5cGUAA0pXVAACUzEAAjAx*')
    res.status(302).send();
})

module.exports =  router;