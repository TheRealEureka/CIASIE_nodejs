const express = require('express');
const router = express.Router();
const request = require('../request');
const commande = "http://api_order:3000/";
const auth = "http://api_auth:3000/";


/* GET home page. */
router.get('/orders', async function (req, res, next) {

    if(req.headers.authorization !== undefined){
        let authentification = await checkAuthentification(req.headers.authorization);
        if(!authentification){
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        res.json(await request.send(commande + 'orders', 'GET'));
    }
});

checkAuthentification = async function (token) {
    let req = request.send(auth+'validate', 'POST', {}, token);
    return req.then((data) => {
        return data.iss !== undefined && data.iss === "auth";
    })
}

module.exports = router;