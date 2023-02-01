const express = require('express');
const router = express.Router();
const db = require('../ConnectionFactory');



router.get('/', async (req, res, next) => {
    try{
        let orders = await db('commande');
        if (orders) {
            res.json({type: "collection", count: orders.length, orders: orders});
        } else {
            next();
        }
    }catch(err){
        next(err)
    }


})
router.get('/:id', async (req, res, next) => {
    try {
        let order = await db('commande').where({id: req.params.id});
        if (order.length === 1) {
            res.json({type: "resource", order: order[0]});
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }

})

module.exports = router;
