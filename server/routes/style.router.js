const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();


// GET  all the Style(s) of the Beer Batches 
router.get('/', (req,res) => {
    if(req.isAuthenticated()){
        console.log('req.user', req.user);
        let queryText = `SELECT * FROM "style";`;
        pool.query(queryText)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error in GET route server side', error);
            res.sendStatus(404)
        })
        
    }else{
        res.sendStatus(403)
    }
});

// ADD a style to the styles list in the database
router.post('/', (req,res) => {
    if(req.isAuthenticated()){
        console.log('req.user', req.user);
        let queryText = `INSERT INTO "style" ("beer_type") VALUES($1);`;
        pool.query(queryText, [req.body.beer_type])
        .then(results => res.sendStatus(201))
        .catch(error => {
            console.log('Error in server side POST', error);
        })
    }else{
        res.sendStatus(403)
    }
});



module.exports = router;