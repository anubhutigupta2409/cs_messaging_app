const express = require('express');
const dbConnect = require('./mongodb')
const router = express.Router();

//routes
//for getting message list from database
router.get('/query',async (req,resp) =>{
    let data = await dbConnect();
    data = await data.find({}).project(projection).toArray();
    data = JSON.parse(JSON.stringify(data))
    resp.send(data);
});

//for updating response given my agent
router.put('/query/:message', async (req,resp)=>{
    let data = await dbConnect();
    let result = await data.updateOne(
        {message:req.params.message},
        {$set:req.body}
    )
    resp.send(result);
});

module.exports = router;