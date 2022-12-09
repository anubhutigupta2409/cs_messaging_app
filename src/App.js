
import React, { useState } from "react";
import "./App.css"
import  io  from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

export default function App() {


  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  //joining a room as an agent and answer user queries-->
  const joinRoom =async() =>{

    if(userName!=="" && room!=""){

      socket.emit("join_room",room);
      setShowChat(true);
  
    }

  };

 
  return (
  
      <div className="App">
      {!showChat ? (
      <div className="joinChatContainer">
        <h3>Join A Chat</h3>
        <input type="text" placeholder="Role" onChange={(event) => {setUserName(event.target.value);}}/>
        <input type="text" placeholder="Room ID" onChange={(event) => {setRoom(event.target.value);}}/>
        <button type="button" onClick={joinRoom}>Start Responding to customer queries..</button>
        
       
     
      </div> 
      ) : (
       <Chat socket={socket} username = {userName} room={room} />
      )}
      </div>
   
  );
}


