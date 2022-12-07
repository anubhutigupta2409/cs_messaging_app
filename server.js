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

app.get('/',async (req,resp) =>{
    let data = await dbConnect();
    data = await data.find({}).project(projection).toArray();
    data = JSON.parse(JSON.stringify(data))
    resp.send(data);
   // console.log(data);
});

// //route not required in this project, implemented for future use
// app.post('/', async (req,resp) => {
//     // resp.send({name:"Anu"})
//     let data = await dbConnect();
//     let result = await data.insert(req.body);
//     resp.send(result);
// });

app.put('/:message', async (req,resp)=>{
    let data = await dbConnect();
    let result = await data.updateOne(
        {message:req.params.message},
        {$set:req.body}
    )
    resp.send(result);
});


app.listen(PORT, console.log('Server is starting at',PORT));

