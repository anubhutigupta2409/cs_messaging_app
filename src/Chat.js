import React, { useEffect, useState } from 'react';

function Chat({socket, username, room}) {

    const[currentMessage, setCurrentMessage] = useState();

    const sendMessage = async() => {

        if(currentMessage !== '');

        const messageData ={

            room : room,
            author : username,
            message : currentMessage,
            time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),

        };

        await socket.emit("send_message", messageData);

    }

    useEffect( ()=> {socket.on("receive_message", (data)=>{
        console.log(data);
    })}, [socket]);
    
        return (
            <div>
                <div className='chat-header'>
                    <p>
                        Chatting Live with the customer
                    </p>
                </div>
                <div className='chat-body'></div>
                <div className='chat-footer'>
                    <input type="text" placeholder='type your response here..' onChange={(event) => setCurrentMessage(event.target.value) }/>
                    <button type="button" onClick={sendMessage}>&#9658;</button>
                </div>
            </div>
        );
    
}

export default Chat;