import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';



function Chat({socket, username, room}) {

    const[agentMessage, setAgentMessage] = useState("");
    const[agentMessageList, setAgentMessageList] = useState([]);
    const[agentName, setAgentName] = useState("");
    const[userName, setUserName] = useState();
    const[agent, setAgent] = useState();
    const[user, setUser] = useState();
    const[userMessage,setUserMessage] = useState("");
   
    
    let messagesList;
  
    function clear()
    {
        setUser("");
        setAgent("");
    }

    //function for fetching messages
    async function fetchMessages()
  {
    
    clear();
    const resp = await fetch('http://localhost:8080/');
    const res = await resp.json();
    console.log(res);
    //filter out messages that are not responded, using field isAnswered
    messagesList = await JSON.parse(JSON.stringify(res)).filter(function(entry){
                                                        return entry.isAnswered === false;
                                                                          });
                 
                                                            
    console.log(messagesList);

    //setting user states
    if(userName===messagesList[0].userId)
       console.log("Same user detected!");
    setUserMessage(messagesList[0].message);
    setUserName(messagesList[0].userId);
    setUser("user");
                                                                     
  }
    
  //function for responding to customer queiries
    async function sendMessage()
    {

        setAgentName(username);
    

        if(agentMessage !== ''){

        // url encode message
        console.log(encodeURIComponent(userMessage));

  
        const url = "http://localhost:8080/"+encodeURIComponent(userMessage);
        console.log(url);


        const resp2 = await fetch(url,{
            method:'PUT',
            headers:{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                response :agentMessage,
                isAnswered : true
            })
        });

        const messageData ={

            message : agentMessage,
            author : agentName,
            room : room,
            
        };

        await socket.emit("send_message", messageData);
        setAgentMessageList((list) => [...list, messageData]);

        setAgent("agent");
        }

    }

    useEffect( ()=> {socket.on("receive_message", (data)=>{
        setAgentMessageList((list) => [...list, data]);
        
    })}, [socket]);
    
        return (
            <div>
            <div className='chat-window'>
                <div className='chat-header'>
                    <p>
                        Chatting Live with customer
                    </p>
                </div>
                <div className='chat-body'>
              
                  
                {
                    user === "user" &&
                        <div
                            className="message" id="other">
              
                            <div>
                                <div className="message-content">
                                    <p>{userMessage}</p>   
                                </div>
                                <div className="message-meta">
                                <p id="author">{userName}</p>
                                </div>
                
                            </div>
                        </div>
                }         
                        {
                            agent === "agent"
                            &&
                        
                        <div className='message' id="you" > 
                            <div>
                                <div className='message-content'>
                                        <p>{agentMessage}</p>
                                </div>
                                <div className="message-meta">
                                <p id="author">You</p>
                                </div>
                            </div>
                        </div>
                        
                    }
                
                 
                </div>
                <div className='chat-footer'>
                    {/* onKeyPress to send message with enter key */}
                    <input type="text" placeholder='type your response here..' onChange={(event) => setAgentMessage(event.target.value) }
                    onKeyPress={(event) => {event.key === 'Enter' && sendMessage()}}/>
                    <button type="button" onClick={sendMessage}>&#9658;</button>
                </div>
            </div>
            <button  id="query-button" type="button" onClick={fetchMessages}>See new query</button>
            </div>
        );
    
}

export default Chat;