const express = require('express');
const router = express.Router();
const db = require('../ConnectionFactory');


/**
 * Get all users
 */
router.get('/', async (req, res, next) => {
    try{
        let client = await db('client');
        if (client) {
            res.json({type: "collection", count: client.length, users: client});
        } else {
            next();
        }
    }catch(err){
        next(err)
    }
})

/**
 * Create a new user
 */
router.post('/', async (req, res, next) => {
    //JOI
    try {
        let params = {"id": req.query.id, "nom_client": req.query.nom_client, "mail_client": req.query.mail_client, "passwd": req.query.passwd , "created_at": new Date().toDateInputValue(), "updated_at": new Date().toDateInputValue()};
        let user = await db('client').insert(params);
        if (user>0) {
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
