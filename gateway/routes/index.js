const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', async function (req, res) {
    res.json({message: "Welcome to the gateway !"});
});


module.exports = router;