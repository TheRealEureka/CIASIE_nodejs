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
