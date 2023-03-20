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
    try {
        if(req.body.email !== undefined && req.body.password !== undefined){
        const {email, password} = req.body;
        let usr = await db('client').where({'mail_client': email});
        if (usr.length > 0) {

            bcrypt.compare(password, usr[0]['passwd'], async function (err, result) {
                if (result) {
                    let payload = {
                        email: usr[0]['mail_client'],
                        name: usr[0]['nom_client'],
                        level: "aled"
                    }

                    let sign = {
                        issuer:  "auth",
                        subject:  "user",
                        audience:  "http://localhost:3000",
                        expiresIn:  "1h",
                        algorithm:  "RS256"
                    }
                   let cert = await fs.readFileSync('./private.key');
                    jwt.sign(payload, cert, sign, function(err, token) {
                        if(err){
                            next(err);
                        }
                        else{
                        res.json({"access-token": token, "refresh-token": suid(16)});
                        }
                    });
                } else {
                    res.status(401).json({
                            "type": "error",
                            "error": 401,
                            "message": "no authorization header present"
                        }
                    );
                }

            });

        }else{
            //user not found
            res.status(401).json({
                    "type": "error",
                    "error": 401,
                    "message": "Wrong credentials"
                }
            );
        }
    }else{
        res.status(401).json({
                "type": "error",
                "error": 401,
                "message": "Missing data"
            }
        );
        }
    }catch (e) {
        next(e)
    }
});

router.post('/validate', async (req, res, next) => {
   try {
       if(req.body["Authorization"] !== undefined && req.body["Authorization"].split(" ")[0] === "Bearer"){
       let token = req.body["Authorization"].split(" ")[1];

       let sign = {
           issuer:  "auth",
           subject:  "user",
           audience:  "http://localhost:3000",
           expiresIn:  "1h",
           algorithm:  "RS256"
       }
         let cert = await fs.readFileSync('./public.key');
         jwt.verify(token, cert, sign, function(err, decoded) {
                if(err){
             console.log(err);
                    res.status(401).json({
                            "type": "error",
                            "error": 401,
                            "message": "Token not valid"
                        }
                    );
                }
                else{
                    delete decoded.iat;
                    delete decoded.exp;
                    res.json(decoded);
                }
         });
         }else{
           res.status(401).json({
                   "type": "error",
                   "error": 401,
                   "message": "no authorization header present"
               }
           );
       }
   } catch (e) {
       next(e)
    }
});

router.post('/refresh', async (req, res, next) => {
   try{

   } catch (e) {
       next(e)
   }
});
router.post('/signup', async (req, res, next) => {
   //new user
    try {
        if(req.body.email !== undefined && req.body.password !== undefined && req.body.name !== undefined)
        {
        const {email, password, name} = req.body;


        let usr = await db('client').where({'mail_client': email});
        if (usr.length > 0) {
            res.status(409).json({
                    "type": "error",
                    "error": 409,
                    "message": "user already exists"
                }
            );
        } else {
            const salt = await bcrypt.genSalt(saltRounds);
            bcrypt.hash(password, salt, async function (err, hash) {
                await db('client').insert({
                    'mail_client': email,
                    'passwd': hash,
                    'nom_client': name,
                    'created_at': new Date().toDateInputValue(),
                });
                res.json({message: 'user created'});
            });
        }
        }else{
            res.status(401).json({
                    "type": "error",
                    "error": 401,
                    "message": "Missing data"
                }
            );
        }
    }catch (e)
    {
        next(e)
    }
});

module.exports = router;
