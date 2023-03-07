

const express = require('express')

const router = express.Router({ mergeParams: true });
const sessionService = require('./index')


router.get('/files', (req, res) => {
    res.send(sessionService.getSessionFiles())
});


router.get('/default', (req, res) => {
    res.send(sessionService.setDefaultSession(req.query.session))
});


router.get('/updateroles',async (req,res) =>{

});

router.get('/new', async (req, res) => {

    const sessionCookies =  await sessionService.setUserSession(req.query.session)
    // sessionCookies.forEach(cookie => {
    //     const cookieKyValue = cookie.split(';')[0].split("=")
    //     res.cookie(cookieKyValue[0], cookieKyValue[1])

    // });
    res.set('Location', `http://localhost:3000/`);
    res.status(302).send();

    // res.send(await sessionService.setUserSession())
});


router.post('/userRoles',async (req,res) => {
    await sessionService.updateAuthSessionWithRoles(req.body.auth, req.body.roles)
    res.send({status: 'success'})
})



module.exports = router;