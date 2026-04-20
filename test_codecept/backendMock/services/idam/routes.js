const express = require('express');

const router = express.Router({ mergeParams: true });
const service = require('./index');

const userApiData = require('../userApiData');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { privateKey, publicKey } = require('./index');

const publicJwk = crypto.createPublicKey(publicKey).export({ format: 'jwk' });
const signingKid = 'local-idam-signing-key';
const authorizationCodeContext = new Map();

const mockUserDetails = {
  sub: 'xui_caseofficer@justice.gov.uk',
  uid: '12b6a360-7f19-4985-b065-94320a891eaa',
  id: '12b6a360-7f19-4985-b065-94320a891eaa',
  email: 'xui_caseofficer@justice.gov.uk',
  name: 'XUI Case Officer',
  forename: 'XUI',
  surname: 'Case Officer',
  given_name: 'XUI',
  family_name: 'Case Officer',
  roleCategory: 'LEGAL_OPERATIONS',
  roles: [
    'caseworker',
    'caseworker-ia',
    'caseworker-ia-caseofficer',
    'caseworker-ia-admofficer',
    'task-supervisor',
    'case-allocator',
  ],
};

router.get('/o/.well-known/openid-configuration', (req, res) => {
  const oidcConf = service.getOpenIdConfig();
  userApiData.sendResponse(req, res, 'openidConfig', () => oidcConf);
});

router.get('/o/userinfo', (req, res) => {
  res.send(mockUserDetails);
});

router.post('/o/userinfo', (req, res) => {
  res.send(mockUserDetails);
});

router.get('/details', (req, res) => {
  res.send(mockUserDetails);
});

router.get('/o/authrorize', (req, res) => {
  res.send();
});

const sendTokenResponse = (req, res) => {
  const authorizationContext = authorizationCodeContext.get(req.body?.code) ?? {};
  const tokenClaims = {
    ...mockUserDetails,
    ...req.body,
    iss: 'http://localhost:8080/o',
    sub: mockUserDetails.sub,
    aud: 'xuiwebapp',
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    nonce: authorizationContext.nonce ?? req.body?.nonce,
    uid: mockUserDetails.uid,
    identity: mockUserDetails.email,
  };

  if (req.body?.code) {
    authorizationCodeContext.delete(req.body.code);
  }

  res.send({
    access_token: jwt.sign(tokenClaims, privateKey, { algorithm: 'RS256', keyid: signingKid }),
    refresh_token: jwt.sign(tokenClaims, privateKey, { algorithm: 'RS256', keyid: signingKid }),
    scope: 'profile openid roles manage-user create-user search-user',
    id_token: jwt.sign(tokenClaims, privateKey, { algorithm: 'RS256', keyid: signingKid }),
    token_type: 'Bearer',
    expires_in: 3600,
  });
};

router.post('/o/token', sendTokenResponse);
router.post('/oauth2/token', sendTokenResponse);

router.get('/o/jwks', (req, res) => {
  res.send({
    keys: [
      {
        ...publicJwk,
        alg: 'RS256',
        use: 'sig',
        kid: signingKid,
      },
    ],
  });
});

router.post('/o/authrorize', (req, res) => {
  res.send();
});

router.post('/o/token', (req, res) => {
  res.send({
    access_token: 'string',
    refresh_token: 'string',
    scope: 'string',
    id_token: 'string',
    token_type: 'string',
    expires_in: 'string',
  });
});

router.post('/lease', (req, res) => {
  const token = jwt.sign(req.body, 'xui-webapp');
  // console.log(token)
  res.send(token);
});

router.get('/login', (req, res) => {
  const query = new URLSearchParams(req.query).toString();
  const target = query ? `/o/authorize?${query}` : '/o/authorize';
  res.redirect(target);
});

router.get('/o/authorize', (req, res) => {
  const code = crypto.randomUUID();
  authorizationCodeContext.set(code, {
    nonce: req.query.nonce,
  });
  res.set(
    'Location',
    `http://localhost:3000/oauth2/callback?code=${encodeURIComponent(code)}&state=${req.query.state}&client_id=xuiwebapp&iss=http%3A%2F%2Flocalhost%3A8080%2Fo`
  );
  res.cookie('Idam.Session', '*AAJTSQACMDIABHR5cGUAA0pXVAACUzEAAjAx*');
  res.status(302).send();
});

module.exports = router;
