import React, { useEffect, useState } from 'react';



function Chat({socket, username, room}) {

    const[currentMessage, setCurrentMessage] = useState("");
    const[messageList, setMessageList] = useState([]);

    const sendMessage = async() => {

        if(currentMessage !== '');

        const messageData ={

            room : room,
            author : username,
            message : currentMessage,
            time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),

        };

        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);

    }

    useEffect( ()=> {socket.on("receive_message", (data)=>{
        setMessageList((list) => [...list, data]);
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
                        messageList.map((messageContent) => {
                            return (<div className='message' id={username === messageContent.author ? "you" : "other"}> 
                                <div>
                                    <div className='message-content'>
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className='message-meta'>
                                        <p id='author'>{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>);
                        })
                    }
                 
                </div>
                <div className='chat-footer'>
                    {/* onKeyPress to send message with enter key */}
                    <input type="text" placeholder='type your response here..' onChange={(event) => setCurrentMessage(event.target.value) }
                    onKeyPress={(event) => {event.key === 'Enter' && sendMessage()}}/>
                    <button type="button" onClick={sendMessage}>&#9658;</button>
                </div>
            </div>
            </div>
        );
    
}

export default Chat;