const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();


// req data: {batch_name: value, beer_id: value}

// create an empty log before the batch. 
// 
router.get('/', (req,res) => {
    if(req.isAuthenticated()){
        console.log('req.user:', req.user);
        let queryText = `SELECT * FROM "batch";`;
        pool.query(queryText)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error in GET route server side', error);
            res.sendStatus(404)
        })
    }else{
        res.sendStatus(403);
    }
});
// Expected incoming json: {batch_name: "batch_name", beer_id: 1 }
// async = this function is required to run first then do the other things called by the awaits IN THAT ORDER
router.post('/', async (req,res) => {
    if (req.isAuthenticated()){
        console.log('req.user:', req.user);
        try {
            let insertBatchText = `INSERT INTO "batch" ("user_id", "beer_id", "batch_name") VALUES ($1, $2, $3);`;
            await pool.query(insertBatchText, [req.user.id, req.body.beer_id, req.body.batch_name]);
            res.sendStatus(201);
        } catch (error) {
            console.log("Error in server side POST", error);  
            res.sendStatus(404);
        }
    } else{
        res.sendStatus(403)
    }
});

// query for batch id + user id from the currently authetnicated user
// if if a result is returned, then the currently authenticated user is the batch owner
// if the result is empty, the batch might exist, but the user doesn't own it
router.put('/:id', (req,res) => {
    if(req.isAuthenticated()){
        console.log('req.user:', req.user);
        // if batch id = user id then return result
      try {
          let insertUpdateBatch =    ``;
        await pool.query(insertUpdateBatch, []);
        res.sendStatus(201);
    } catch (error) {
            console.log("Error in server side PUT", error);
            res.sendStatus(404)
    }    
} else{
    res.sendStatus(403)
}
)}} ;

module.exports = router;