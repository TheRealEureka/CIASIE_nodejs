const express = require('express');
const router = express.Router();
const request = require('../request');
const commande = "http://api_order:3000/";
const auth = "http://api_auth:3000/";

/* GET home page. */
router.get('/orders', async function (req, res, next) {
    res.json(await request.send(commande + 'orders'));
});

router.post('/signup', async function (req, res, next) {
    res.json(await request.send(auth + 'signup', 'POST', req.body));
});

router.post('/validate', async function (req, res, next) {
    res.json(await request.send(auth + 'validate', 'POST', {}, req.headers));
});

module.exports = router;