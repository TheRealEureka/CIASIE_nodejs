const express = require('express');
const router = express.Router();
const request = require('../request');


router.post('/signup', async function (req, res) {
    res.json(await request.send(request.API_AUTH + 'signup', 'POST', req.body));
});

router.get('/validate', async function (req, res) {
    res.json(await request.send(request.API_AUTH + 'validate', 'GET', req.body, req.headers.authorization));
});
router.post('/token', async function (req, res) {
    res.json(await request.send(request.API_AUTH + 'token', 'POST', req.body));
});
router.post('/refresh', async function (req, res) {
    res.json(await request.send(request.API_AUTH + 'token', 'POST', req.body,  req.headers.authorization));
});


module.exports = router;