const express = require('express');
const router = express.Router();
const request = require('../request');
const auth = "http://api_auth:3000/";


router.post('/signup', async function (req, res, next) {
    res.json(await request.send(auth + 'signup', 'POST', req.body));
});

router.get('/validate', async function (req, res, next) {
    res.json(await request.send(auth + 'validate', 'GET', req.body, req.headers.authorization));
});
router.post('/token', async function (req, res, next) {
    res.json(await request.send(auth + 'token', 'POST', req.body));
});
router.post('/refresh', async function (req, res, next) {
    res.json(await request.send(auth + 'token', 'POST', req.body,  req.headers.authorization));
});


module.exports = router;