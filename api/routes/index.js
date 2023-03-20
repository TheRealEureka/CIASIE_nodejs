const express = require('express');
const router = express.Router();
const db = require('../ConnectionFactory');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { suid } = require('rand-token');

const saltRounds = 10;

const sign = {
    issuer:  "auth",
    subject:  "user",
    audience:  "http://localhost:3333",
    expiresIn:  "1h",
    algorithm:  "RS256"
}
router.get('/', function(req, res) {
  res.json({ title: 'Express', comment: 'Welcome to express' });
});

router.post('/token', async (req, res, next) => {
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

                   let cert = await fs.readFileSync('./private.key');
                    jwt.sign(payload, cert, sign, async function(err, token) {
                        if(err){
                            next(err);
                        }
                        else{
                            let refresh = suid(16);
                            await db('tokens_data').where({'client_id': usr[0]['id']}).del();
                            await db('tokens_data').insert({
                                'token': token,
                                'refresh_token': refresh,
                                'client_id': usr[0]['id']
                            });
                            res.json({"access-token": token, "refresh-token": refresh});
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
       if(req.headers.authorization !== undefined && req.headers.authorization.split(" ")[0] === "Bearer"){
       let token = req.headers.authorization.split(" ")[1];
        let verif = await verifyToken(token);
        if(verif){
            delete verif.iat;
            delete verif.exp;
            res.json(verif);
        }else {
            res.status(401).json({
                    "type": "error",
                    "error": 401,
                    "message": "Token not valid"
                }
            );
        }

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
       if(req.headers.authorization !== undefined && req.body["refresh-token"] !== undefined && req.headers.authorization.split(" ")[0] === "Bearer"){
           let verif = await verifyToken(req.headers.authorization.split(" ")[1]);
              if(verif){
                  let refresh = await db('tokens_data').where({'refresh_token': req.body["refresh-token"]});
                    if(refresh.length > 0){
                        let payload = {
                            email: verif.email,
                            name: verif.name,
                            level: verif.level
                        }

                        let cert = await fs.readFileSync('./private.key');
                        jwt.sign(payload, cert, sign, async function(err, token) {
                            if(err){
                               res.status(401).json({
                                        "type": "error",
                                        "error": 401,
                                        "message": "Token not valid"
                               });
                            }
                            else{
                                let refresh = suid(16);
                                await db('tokens_data').update({"token": token, "refresh_token": refresh}).where({'refresh_token': req.body["refresh-token"]} );
                                res.json({"access-token": token, "refresh-token": refresh});
                            }
                        });
                    }
              }else{
                    res.status(401).json({
                            "type": "error",
                            "error": 401,
                            "message": "Token not valid"
                        }
                    );
              }
       }
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


async function verifyToken(token) {

    let cert = await fs.readFileSync('./public.key');
    let verify;
    try {
      verify = await jwt.verify(token, cert, sign);
    }catch (e) {
         verify = false;
    }
    if(!verify){
        await db('tokens_data').where({'token': token}).del();
        return false;
    }
    let dbToken = await db('tokens_data').where({'token': token});
    if(dbToken.length === 0){
        return false;
    }
    return verify;
}

module.exports = router;
