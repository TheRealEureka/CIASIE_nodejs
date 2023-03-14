const express = require('express');
const router = express.Router();
const db = require('../ConnectionFactory');
const commandeSchema = require('../validatorJoi/validatorOrders.js');
const itemSchema = require('../validatorJoi/validatorItem.js');
//const updateOrderSchema = require('../validatorJoi/validatorOrders.js');
const uuid = require('uuid');
/**
 * Get all orders
 */
router.get('/', async (req, res, next) => {
    try {
            let orders;
            if(req.query['c']){
                orders = await db('commande').where({mail:req.query['c']});
            }
            else{
                orders = await db('commande');
            }
            if (orders) {
                if (req.query['sort'] === 'date') {
                    orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // tri par date décroissante
                } else if (req.query['sort'] === 'amount') {
                    orders.sort((a, b) => b.montant - a.montant); // tri par montant total décroissant
                } else if (req.query['page'] !== null && req.query['page'] !== undefined) {




                    /**let page = parseInt(req.query['page']);
                    let start = (page - 1) * 10;
                    let end = page * 10;
                    orders = orders.slice(start, end);*/
                }

                res.json({type: "collection", count: orders.length, orders: orders});
            } else {
                next();
            }

    } catch (err) {
        next(err)
    }
})
/**
 * Return all orders with items
 */
router.get('/all', async (req, res, next) => {
    try{
        let orders = await db('commande').select({'id': 'id', 'livraison': 'livraison', 'client_name': 'nom', 'mail': 'mail', 'order_date': 'created_at', 'delivery_date': 'remise', 'statut': 'status'});
        if (orders) {
            let ord = [];
           for(let i = 0; i < orders.length; i++){
               ord[i] ={order : orders[i]};
               ord[i].links = {
                    self: {
                        href: "/orders/" + orders[i].id
                    }
                };
           }
            res.json({type: "collection", count: orders.length, orders: ord});
        } else {
            next();
        }
    }catch (err) {
        next(err)
    }
});

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
        let id = uuid.v4();
        if (items !== undefined) {
            items.map(async item => {
                console.log('item')
                const {erroritem} = itemSchema.validate(item);
                if (!erroritem) {
                    console.log('inset item')
                    amount += item.price * item.q;
                    let data = {
                        'uri': item.uri,
                        'libelle': item.name,
                        'tarif': item.price,
                        'quantite': item.q,
                        'command_id': id
                    }
                    await db('item').insert(data);
                }
            })
        }

        let params = {
            "nom": req.body.client_name,
            "mail": req.body.client_mail,
            "livraison": new Date(req.body.delivery.date+" "+req.body.delivery.time),
            "id": id,
            "montant": amount,
            "created_at": new Date().toDateInputValue()
        };

        await db('commande').insert(params);
        res.json({type: "resource", order: params});

    } catch (err) {
        next(err);
    }
})


module.exports = router;
