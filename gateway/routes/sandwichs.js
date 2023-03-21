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
        let url = request.API_SANDWICH + 'sandwichs';
       // url = transformQuery(url, req.query);

        res.json(await request.send(url, 'GET'));

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
        let url = request.API_SANDWICH + 'sandwichs/'+req.params.id;
        //url = transformQuery(url, req.query);

        res.json(await request.send(url, 'GET'));
    }
    else{
        res.status(401).json({error: "Unauthorized"});
    }
});




module.exports = router;