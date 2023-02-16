import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [name, setName] = useState('')


  // this function is called when the submit button is clicked
  // it sends a POST request to the server with the name
  const submitFormToNotion = () => {
    console.log(name)
    fetch("http://localhost:4000/submitFormToNotion", { //fetch API, need to change localhost&port to the server
      method: "POST",
      headers: { //incase
        "Content-Type": "application/json",
        },
      body: JSON.stringify({name: name}), //converts to JSON
    }).then(response => response.json()) //seperates out the JSON
    .then(data => {
      console.log('Success:', data);
    }).catch((error) => {
      console.error('Error:', error);
    }
    )
  }

  return (
    <div className="App">
      <div style={{maxWidth: '500px', margin: '0 auto'}}>
        <h1>Text</h1>
        <input type="text" id="name" onChange={(e) => setName(e.target.value)} /> {/* onChange is a listener that listens for changes in the input field and then sets the value of name*/}
        </div>
        <button onClick={submitFormToNotion}>Submit</button>
        <gradio-app src="https://aadnk-whisper-webui.hf.space"></gradio-app>


    </div>
  )
}

export default App
