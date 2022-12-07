
import React from "react";

export default function App() {

  async function fetchMessages()
  {
    console.log("hi")
    const resp = await fetch('http://localhost:8080/');
    const res = await resp.json();
    console.log(res[0]);
    const obj = JSON.parse(JSON.stringify(res[0]))
    //const obj = JSON.parse(res[0]);
    console.log(obj);
    console.log(obj.message);

     //url encode message
    let msg = encodeURIComponent("Hi can i get the batch number");
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



  fetchMessages();

  return (
    <div className="App">
    Hi!
    </div>
  );
}


