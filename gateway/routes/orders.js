const express = require('express');
const router = express.Router();
const request = require('../request');



/* GET home page. */
router.get('/', async function (req, res) {

    if(req.headers.authorization !== undefined){
        let authentification = await request.checkAuthentification(req.headers.authorization);
        if(!authentification){
            res.status(401).json({error: "Unauthorized"});
            return;
        }
        let url = request.API_ORDER + 'orders';
        url = request.transformQuery(url, req.query);

        res.json(await request.send(url, 'GET'));

    }else{
        res.status(401).json({error: "Unauthorized"});
    }

});

router.post('/', async function (req, res) {
    if(req.headers.authorization !== undefined){
        let authentification = await request.checkAuthentification(req.headers.authorization);
        if(!authentification){
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        res.json(await request.send( request.API_ORDER + 'orders', 'POST', req.body));

    }else{
        res.status(401).json({error: "Unauthorized"});
    }
});

router.get('/:id', async function (req, res) {
    if(req.headers.authorization !== undefined && req.params.id !== undefined){
        let authentification = await request.checkAuthentification(req.headers.authorization);
        if(!authentification){
            res.status(401).json({error: "Unauthorized"});
            return;
        }
        let url = request.API_ORDER + 'orders/'+req.params.id;
            url = request.transformQuery(url, req.query);

        res.json(await request.send(url, 'GET'));
    }
    else{
        res.status(401).json({error: "Unauthorized"});
    }
});

router.get('/:id/items', async function (req, res) {
    if(req.headers.authorization !== undefined && req.params.id !== undefined){
        let authentification = await request.checkAuthentification(req.headers.authorization);
        if(!authentification){
            res.status(401).json({error: "Unauthorized"});
            return;
        }

        res.json(await request.send(request.API_ORDER+'/orders'+req.params.id+'/items', 'GET'));
    }
    else{
        res.status(401).json({error: "Unauthorized"});
    }
});

router.patch('/:id', async function (req, res) {
    if(req.headers.authorization !== undefined && req.params.id !== undefined){
        let authentification = await request.checkAuthentification(req.headers.authorization);
        if(!authentification){
            res.status(401).json({error: "Unauthorized"});
            return;
        }
        res.json(await request.send(request.API_ORDER+'/'+req.params.id, 'PATCH', req.body));
    }
    else{
        res.status(401).json({error: "Unauthorized"});
    }
});


module.exports = router;