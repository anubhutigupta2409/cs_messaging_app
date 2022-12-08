import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';



function Chat({socket, username, room}) {

    const[agentMessage, setAgentMessage] = useState("");
    const[agentMessageList, setAgentMessageList] = useState([]);
    const[agentName, setAgentName] = useState("");
    const[active, setActive] = useState();
    const[user, setUser] = useState();
    const[userMessage,setUserMessage] = useState("");
   
    

    
    let messagesList;
  
    function clear()
    {
        setUser("");
        setActive("");
    }

    async function fetchMessages()
  {
    
    clear();
    const resp = await fetch('http://localhost:8080/');
    const res = await resp.json();
    console.log(res);
    //filter out messages that our not responded, using field isAnswered
    messagesList = await JSON.parse(JSON.stringify(res)).filter(function(entry){
                                                        return entry.isAnswered === false;
                                                                          });
                 
                                                            
    console.log(messagesList);

    //setting userMessageObject and message;
   
    setUserMessage(messagesList[0].message);
    setUser("user");
                                                                     
  }
    
    const sendMessage = async() => {

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
            author : username,
            room : room,
            
        };

        await socket.emit("send_message", messageData);
        setAgentMessageList((list) => [...list, messageData]);

        setActive("agent");
        }

    }

    useEffect( ()=> {socket.on("receive_message", (data)=>{
        setAgentMessageList((list) => [...list, data]);
        //console.log(data);
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
                      
                
                            </div>
                        </div>
                }         
                        {
                            active === "agent"
                            &&
                         agentMessageList.map((messageContent) => {
                         return(
                        <div className='message' id="you" > 
                            <div>
                                <div className='message-content'>
                                        <p>{messageContent.message}</p>
                                </div>
                            </div>
                        </div>);
                        })
                    }
                
                 
                </div>
                <div className='chat-footer'>
                    {/* onKeyPress to send message with enter key */}
                    <input type="text" placeholder='type your response here..' onChange={(event) => setAgentMessage(event.target.value) }
                    onKeyPress={(event) => {event.key === 'Enter' && sendMessage()}}/>
                    <button type="button" onClick={sendMessage}>&#9658;</button>
                </div>
            </div>
            <button  id="query-button" type="button" onClick={fetchMessages}>See query</button>
            </div>
        );
    
}

export default Chat;