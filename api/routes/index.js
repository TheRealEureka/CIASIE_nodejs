const express = require('express');
const router = express.Router();

const commande = "http://localhost:3333/";
const auth = "http://localhost:3030/";

/* GET home page. */
router.get('/orders', async function (req, res, next) {
    res.json(await fetch(commande + 'orders'));
});


module.exports = router;