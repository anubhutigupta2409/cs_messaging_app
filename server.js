//Import npm packages
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dbConnect = require('./mongodb')
const http = require("http");

const projection = { _id: 0};

const app = express();
const PORT = process.env.PORT || 8080;

const {Server} = require("socket.io");
const server = http.createServer(app);


const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) ;
app.use(morgan('tiny'));


app.use(express.json());

//static files

    // app.use(express.static(path.join(__dirname, './build')));
    // app.get("/", function (req,res){
    //     res.sendFile(path.join(__dirname, "./build/index.html"))
    // });


//routes
//for getting message list from database
app.get('/query',async (req,resp) =>{
    let data = await dbConnect();
    data = await data.find({}).project(projection).toArray();
    data = JSON.parse(JSON.stringify(data))
    resp.send(data);
});

//for updating response given my agent
app.put('/query/:message', async (req,resp)=>{
    let data = await dbConnect();
    let result = await data.updateOne(
        {message:req.params.message},
        {$set:req.body}
    )
    resp.send(result);
});




//server for chatting
const io = new Server(server,{
    cors :{
        origin : "http://localhost:3000",
        methods : ["GET", "POST"],
    },
});

io.on("connection",(socket)=>{

        console.log('User Connected '+socket.id);

        socket.on("join_room", (data)=>{
            socket.join(data);
            console.log('User with ID ', socket.id, 'joined room ',data);
        })

        socket.on("send_message",(data)=>{
            socket.to(data.room).emit("receive_message",data)
            //console.log(data);
        })
        socket.on("disconnect",()=>{
            console.log("User Disconnected",socket.id);
        })
});



server.listen(PORT, ()=>{
    console.log('Server is starting at',PORT);
})

//pp.listen(PORT, console.log('Server is starting at',PORT));
