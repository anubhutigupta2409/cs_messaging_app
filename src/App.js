
import React, { useState } from "react";
import "./App.css"
import  io  from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

export default function App() {

  let messageList;
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  //joining a room as an agent and answer user queries-->
  const joinRoom =() =>{

    if(userName!=="" && room!=""){
      socket.emit("join_room",room);
    }

  };

  async function fetchMessages()
  {
    const resp = await fetch('http://localhost:8080/');
    const res = await resp.json();
    messageList = JSON.parse(JSON.stringify(res))
    console.log(messageList)
  //  objs.sort((a, b) => a.userId - b.userId);
  //  console.log(objs);


    //url encode message
    // let msg = encodeURIComponent("Hi can i get the batch number");
    // console.log(msg);

    // const url = "http://localhost:8080/"+msg;

    // const resp2 = await fetch(url,{
    //   method:'PUT',
    //   headers:{
    //     'Content-Type' : 'application/json'
    //   },
    //   body : JSON.stringify({
    //     response :'Noted!',
    //     isAnswered : true
    //   })
    // });
  }

  async function sendResponse()
  {
   
   // url encode message
    let msg = encodeURIComponent(messageList[0].message);
    console.log(msg);

  
    const url = "http://localhost:8080/"+msg;

    const resp2 = await fetch(url,{
      method:'PUT',
      headers:{
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        response :'Noted!',
        isAnswered : true
      })
    });
  }



 //fetchMessages();

  return (
    <div className="message-container">
    <form id="send-container">
      <div className="App">
      <h3>Start answering queries!</h3>
      <input type="text" placeholder="Role" onChange={(event) => {setUserName(event.target.value);}}/>
      <input type="text" placeholder="Room ID" onChange={(event) => {setRoom(event.target.value);}}/>
      {/* type = "button" is added so that the page doesnot refreshes on button click, because buttons 
      are by default of type submit. */}
      <button type="button" onClick={joinRoom}>Start Responding to customer queries..</button>
      <Chat socket={socket} username = {userName} room={room}/>
      {/* <input type="text" id="message-input"></input>
      <button type="submit" id="send-button" onClick={sendResponse}>Send</button> */}
      </div>
    </form>
    </div>
  );
}


