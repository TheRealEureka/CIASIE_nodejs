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
    ///!\ ajouter bibiliotheque JOI pour valider les requetes

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
            let resJson = {type: "resource", order: order[0]};
            if(req.query['embed'] !== undefined && req.query['embed'] === "items"){
                let items = await db('item').select().where({command_id: req.params.id});
                items.map(item => {
                    delete item.command_id;
                })
                if (items) {
                    resJson.order.items = items;
                }
            }
            resJson.links =  {
                items : {
                    href: `/orders/${req.params.id}/items/`
                },
                self: {
                    href: `/orders/${req.params.id}`
                }
            };
            res.json(resJson);
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
})

router.get('/:id/items', async (req, res, next) => {
    try {
        let items = await db('item').select().where({command_id: req.params.id});
        items.map(item => {
            delete item.command_id;
        })
        if (items) {
            res.json({type: "collection",count: items.length, order: items});
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
})


/**
 * Create a new order
 */

router.put('/', async (req, res, next) => {
    try {
        let params = {"client_name" : req.query.client_name, "client_mail": req.query.client_mail, "delivery_date": { "date" : req.query.delivery.date, "time" : req.query.delivery.time}, "id": req.query.id, "total_amount": req.query.total_amount};
        let order = await db('commande').insert(params);
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
})

module.exports = router;
