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
        let url = commande + 'orders';
        url = transformQuery(url, req.query);

        res.json(await request.send(url, 'GET'));

    }else{
        res.status(401).json({error: "Unauthorized"});
    }

});

router.get('/orders/:id', async function (req, res, next) {
    if(req.headers.authorization !== undefined && req.params.id !== undefined){
        let authentification = await checkAuthentification(req.headers.authorization);
        if(!authentification){
            res.status(401).json({error: "Unauthorized"});
            return;
        }
        let url = commande + 'orders/'+req.params.id;
            url = transformQuery(url, req.query);

        res.json(await request.send(url, 'GET'));
    }
    else{
        res.status(401).json({error: "Unauthorized"});
    }
});

router.get('/orders/:id/items', async function (req, res, next) {
    if(req.headers.authorization !== undefined && req.params.id !== undefined){
        let authentification = await checkAuthentification(req.headers.authorization);
        if(!authentification){
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        res.json(await request.send(url, 'GET'));
    }
    else{
        res.status(401).json({error: "Unauthorized"});
    }
});

checkAuthentification = async function (token) {
    let req = request.send(auth+'validate', 'GET', {}, token);
    return req.then((data) => {
        return data.iss !== undefined && data.iss === "auth";
    })
}

transformQuery = function (url, query) {
    let newUrl = url + "?";
    for (let key in query) {
        newUrl += key + "=" + query[key] + "&";
    }
    console.log(newUrl)
    return newUrl;
}

module.exports = router;