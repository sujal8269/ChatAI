import { useState } from 'react'
import axios from "axios";

function App() {
  const[question,setQuestion] = useState("");
  const[answer,setAnswer] = useState("");

  const copy = () => {
    navigator.clipboard.writeText(answer); 
    document.getElementById("copy").innerText = "copied!";
    }

  const darkMode = () =>{
      document.getElementById("mode2").style.backgroundColor = "Black";
      document.getElementById("mode2").style.color = "White";
      document.body.style.backgroundColor = "#242424";
      document.body.style.color = "white";
      document.getElementByTagName("input").style.backgroundColor = "#1a1a1a";
      document.getElementById("navbar").style.backgroundColor = "#1a1a1a";
      document.getElementByTagName("button").style.backgroundColor = "#1a1a1a";
      document.getElementByTagName("pre").style.backgroundColor = "#1a1a1a";
    }

  const lightMode = () => {
      document.getElementById("mode1").style.backgroundColor = "rgb(228, 166, 143)";
      document.getElementById("mode1").style.color = "Black";
      document.body.style.backgroundColor = "Azure";
      document.body.style.color = "Black";
      document.getElementById("navbar").style.backgroundColor = "AliceBlue";
      document.getElementById("navbar").style.color = "Black";
      document.getElementByTagName("input").style.backgroundColor = "Beige";
      document.getElementByTagName("button").style.backgroundColor = "Aquamarine";
      document.getElementByTagName("pre").style.backgroundColor = "Beige";
    }
  
  async function generateAnswer(){
    document.getElementById("copy").innerText = "copy";
    setAnswer("processing...");
    if(question=="") setAnswer("Please Enter prompt")
    else{
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" ",
      method:"post",
      data:{
        contents :[
          {parts:[{text:question}]},
      ],
    },

    });
    setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  }
}

async function translateHin(){
  document.getElementById("copy").innerText = "copy";
  setAnswer("processing...");
  if(question=="") setAnswer("Please Enter prompt")
  else{
  const response = await axios({
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" ",
    method:"post",
    data:{
      contents :[
        {parts:[{text:question+"Translate into hindi"}]},
    ],
  },

  });
  setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
}
}

async function translateEng(){
  document.getElementById("copy").innerText = "copy";
  setAnswer("processing...");
  if(question=="") setAnswer("Please Enter prompt")
  else{
  const response = await axios({
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" ",
    method:"post",
    data:{
      contents :[
        {parts:[{text:question+"Translate into english"}]},
    ],
  },

  });
  setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
}
}

  function newPrompt(){
    setQuestion("");
    setAnswer("");
    document.getElementById("copy").innerText = "copy";
  }

  const prompt =  (e) => {
    setQuestion(e.target.value);
  }


  return (
    <>
    <btn id="mode1" onClick={lightMode}>Light Mode</btn>
    <btn id="mode2" onClick={darkMode}>Dark Mode</btn>
   
    <div id="navbar">WELCOME TO CHAT-AI WORLD</div>
      
      <input placeholder="Enter prompt" value={question} onChange={prompt}></input>
      <button onClick={generateAnswer}>Generate Answer</button>
      <button id="newPrompt" onClick={newPrompt}>New prompt</button>
      <button id="translator" onClick={translateHin}>To Hindi</button>
      <button id="translator" onClick={translateEng}>To English</button>
      <button id="copy" onClick={copy}>Copy</button>
      <pre>{answer}</pre>
    </>
  )
}

export default App
