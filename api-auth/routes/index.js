const express = require('express');
const router = express.Router();
const db = require('../ConnectionFactory');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { uid, suid } = require('rand-token');

const saltRounds = 10;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express', comment: 'Welcome to express' });
});

router.post('/', async (req, res, next) => {
    const {email, password} = req.body;
    let usr = await db('client').where({'mail_client': email});
    if (usr.length > 0) {
        bcrypt.compare(password, usr[0]['passwd'], async function (err, result) {
            if (result) {
                let data = {
                    id: usr[0]['id'],
                    email: usr[0]['mail_client'],
                    name: usr[0]['nom_client'],
                }
                let cert = await fs.readFileSync('private.key');

                jwt.sign(data, cert, {expiresIn: '1h'}).then(token => {
                    res.json({"access-token": token, "refresh-token": suid(16)});
                });
            } else {
                res.status(401).json({
                    "type": "error",
                    "error": 401,
                    "message": "no authorization header present"}
                );
            }

        });
    }
});

router.post('/signup', async (req, res, next) => {
   //new user
    const {email, password, name} = req.body;
    let usr = await db('client').where({'mail_client': email});
    if (usr.length > 0) {
        res.status(409).json({
            "type": "error",
            "error": 409,
            "message": "user already exists"}
        );
    }
    else {
        const salt = await bcrypt.genSalt(saltRounds);
        bcrypt.hash(password, salt, async function (err, hash) {
            await db('client').insert({
                'mail_client': email,
                'passwd': hash,
                'nom_client': name,
                'created_at': Date.now(),
            });
            res.json({message: 'user created'});
        });
    }
});

module.exports = router;
