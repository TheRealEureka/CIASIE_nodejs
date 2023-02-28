const express = require('express');
const router = express.Router();
const db = require('../ConnectionFactory');


router.get('/', async (req, res, next) => {
    try{
        let client = await db('client');
        if (client) {
            res.json({type: "collection", count: client.length, orders: client});
        } else {
            next();
        }
    }catch(err){
        next(err)
    }
})




module.exports = router;
