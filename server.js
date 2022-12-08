//Import npm packages
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dbConnect = require('./mongodb')

const projection = { _id: 0};




const app = express();
const PORT = process.env.PORT || 8080;


const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(morgan('tiny'));

//Routes

app.use(express.json());

//for getting message list from database
app.get('/',async (req,resp) =>{
    let data = await dbConnect();
    data = await data.find({}).project(projection).toArray();
    data = JSON.parse(JSON.stringify(data))
    resp.send(data);
});

//for updating response given my agent
app.put('/:message', async (req,resp)=>{
    let data = await dbConnect();
    let result = await data.updateOne(
        {message:req.params.message},
        {$set:req.body}
    )
    resp.send(result);
});

//server for chatting
app.get('/chat',(req, resp)=>{
    resp.sendFile("Hello");
});


app.listen(PORT, console.log('Server is starting at',PORT));

