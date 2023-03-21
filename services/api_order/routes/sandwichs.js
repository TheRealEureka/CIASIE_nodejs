const express = require('express');
const router = express.Router();
const db = require('../ConnectionFactory');

router.get('/', async (req, res, next) => {
    try {
        let sandwichs = await db('item');
        if(sandwichs)
        {
            sandwichs.map(sandwich => {
               sandwich.links = {
                     self: {
                        href: sandwich.uri
                     }
               };
                delete sandwich.uri;
            });
        res.json({type: "collection", count: sandwichs.length, orders: sandwichs});
        }
        else{
            next()
        }
    } catch (err) {
        next(err);
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        let sandwichs = await db('item').where({uri: `/sandwichs/${req.params.id}`});
        if(sandwichs[0] !== undefined)
        {
            let link = {
                self: {
                    href: sandwichs[0].uri
                },
                order : {
                    href: `/orders/${sandwichs[0].command_id}`
                }
            }
            delete sandwichs[0].uri;
            res.json({type: "collection", count: sandwichs.length, sandwichs: sandwichs[0], links : link});
        }
        else{
            next()
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;
