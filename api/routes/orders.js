const express = require('express');
const router = express.Router();
const db = require('../ConnectionFactory');


/**
 * Get all orders
 */
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


/**
 * Change an order by id, only the "livraison", "nom", "mail" and "updated_at" can be changed
 */
router.put('/:id', async (req, res, next) => {
    try {
        let params = {"livraison" : req.query.livraison, "nom": req.query.nom, "mail": req.query.mail, updated_at: new Date().toDateInputValue()};
        let order = await db('commande').where({id: req.params.id}).update(params);
        if (order>0) {
            res.status(204).json({});
        }
        else{
            next();
        }
    }
    catch (err) {
        next(err);
    }
});


/**
 * Get an order by his id
 */
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
