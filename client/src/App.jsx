import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Iframe from 'react-iframe'
import { AudioRecorder } from 'react-audio-voice-recorder';



function App() {
  const [notion, setNotion] = useState('')
  const [audioStr, setAudioStr] = useState('')

  const addAudioElement = (blob) => {
    // const url = URL.createObjectURL(blob);
    // const audio = document.createElement('audio');
    // audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audio);
    
    

    var reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
      var base64data = reader.result;                
      console.log(base64data);
      setAudioStr(base64data)
  }

    
  }




  // this function is called when the submit button is clicked
  // it sends a POST request to the server with the name
  const submitFormToNotion = dataToNotion => {
    console.log(dataToNotion[0])
const regex = new RegExp("(?<=\\-)[a-z0-9]{32}");
const match = regex.exec(notion);

if (match) {
  console.log(match[0]); // Output: 63499a6f3fcc4960a6f7c5b985e9bb06
} else {
  console.log("No match found.");
}
    
    fetch("http://localhost:4000/submitFormToNotion", { //fetch API, need to change localhost&port to the server
      method: "POST",
      headers: { //incase
        "Content-Type": "application/json",
        },
      body: JSON.stringify({name: dataToNotion[0],
      notion: match}), //converts to JSON
    }).then(response => response.json()) //seperates out the JSON
    .then(data => {
      console.log('Success:', data);
    }).catch((error) => {
      console.error('Error:', error);
    }
    )
  }

  const submitToHF = () => {
    // let todo = {"name": "filename", "data": audioFile}

    fetch("https://whisper-event-whisper-demo.hf.space/run/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  

      
  body: JSON.stringify({
    data: [
     null,
    {
    'name': "name", 
    'data': audioStr
    } 
	]

  })})

  .then(r => r.json()).then(
    r => {
      let data = r.data;
      console.log(data)
      submitFormToNotion(data)
    }
  )


  }

  return (
    <div className="App">
      {/* <div style={{maxWidth: '500px', margin: '0 auto'}}> */}
        {/* <h1>Whisper2Notion: set page ID</h1> */}
        {/* <input type="text" id="name" onChange={(e) => setNotion(e.target.value)} /> onChange is a listener that listens for changes in the input field and then sets the value of name */}
        {/* </div> */}
        {/* <button onClick={submitFormToNotion}>Submit</button> */}
        {/* <button onClick={submitToHF}>Submit to Notion</button> */}
        
      <br />

      <section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-md sm:text-center">
          <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">Whisper to Notion</h2>
          <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
          <form action="#">
            {/* center the audio recorder */}
              <div className="flex justify-center">
          <AudioRecorder id="recorder" onRecordingComplete={addAudioElement} />
              </div>
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                  <div className="relative w-full">
                      <label htmlFor="email" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                      </div>
                      <input className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="text" id="name" onChange={(e) => setNotion(e.target.value)} required=""/>
                  </div>
                  <div>
                      <button onClick={submitToHF} className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send</button>
                  </div>
              </div>
              <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="#" className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
          </form>
      </div>
  </div>
</section>



    </div>
  )
}



export default App
