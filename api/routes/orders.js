const express = require('express');
const router = express.Router();
const db = require('../ConnectionFactory');
const commandeSchema = require('../validatorJoi/validatorOrders.js');
const updateOrderSchema = require('../validatorJoi/validatorOrders.js');
const uuid = require('uuid');
/**
 * Get all orders
 */
router.get('/', async (req, res, next) => {
    try {
        let orders = await db('commande');
        if (orders) {
            res.json({type: "collection", count: orders.length, orders: orders});
        } else {
            next();
        }
    } catch (err) {
        next(err)
    }
})


router.put('/:id', async (req, res, next) => {
    try {
        const {error} = commandeSchema.validate(req.query);
        if (error) {
            return res.status(400).json({error: error.details[0].message});
        }
        let params = {
            "livraison": req.query.livraison,
            "nom": req.query.nom,
            "mail": req.query.mail,
            updated_at: new Date().toDateInputValue()
        };
        let order = await db('commande').where({id: req.params.id}).update(params);
        if (order > 0) {
            res.status(204).json({});
        } else {
            next();
        }
    } catch (err) {
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
            if (req.query['embed'] !== undefined && req.query['embed'] === "items") {
                let items = await db('item').select().where({command_id: req.params.id});
                items.map(item => {
                    delete item.command_id;
                })
                if (items) {
                    resJson.order.items = items;
                }
            }
            resJson.links = {
                items: {
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


/**
 * Get all items of an order
 */
router.get('/:id/items', async (req, res, next) => {
    try {
        let items = await db('item').select().where({command_id: req.params.id});
        items.map(item => {
            delete item.command_id;
        })
        if (items) {
            res.json({type: "collection", count: items.length, order: items});
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
        const {error} = commandeSchema.validate(req.query);
        if (error) {
            return res.status(400).json({error: error.details[0].message});
        }
        let params = {
            "id": uuid.v4(),
            "nom": req.query.client_name,
            "mail": req.query.client_mail,
            "livraison": new Date().toDateInputValue(),
            "created_at": new Date().toDateInputValue(),
        };

        let order = await db('commande').insert(params);
        if (order > 0) {
            res.status(204).json({});
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
})


router.post('/', async (req, res, next) => {
    try {
        const {error} = commandeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({error: error.details[0].message});
        }

        let amount = 0;

        let items = req.body.items;
        if (items !== undefined) {
            items.map(item => {
                amount += item.price * item.q;
            })
        }

        let params = {
            "nom": req.body.client_name,
            "mail": req.body.client_mail,
            "livraison": new Date(req.body.delivery.date),
            "id": uuid.v4(),
            "montant": amount,
            "created_at": new Date().toDateInputValue()
        };

        let order = await db('commande').insert(params);
        res.json({type: "resource", order: order[0]});

    } catch (err) {
        next(err);
    }
})


module.exports = router;
