const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({ title: 'Express', comment: 'Welcome to express' , "links": {
            "orders": {
                "href": "/orders"
            },
        }});
});

module.exports = router;