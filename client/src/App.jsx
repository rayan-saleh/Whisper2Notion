import { useState } from 'react'
import './App.css'
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';



function App() {
  const [notion, setNotion] = useState('')
  const [secret, setSecret] = useState('')
  const recorderControls = useAudioRecorder();

  const addAudioElement = (blob) => {
    var reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
      var base64data = reader.result;                
      console.log(base64data);
      // setAudioStr(base64data);
      // console.log(audioStr);
      submitToHF(base64data);
      
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
    
    fetch("https://whisperserver.fly.dev", { //fetch API, need to change localhost&port to the server
      method: "POST",
      headers: { //incase
          "Content-Type": "application/json",
      },
        body: JSON.stringify({name: dataToNotion[0],
        notion: match, auth: secret}), //converts to JSON
        }).then(response => response.json()) //seperates out the JSON
        .then(data => {
          console.log('Success:', data);
        }).catch((error) => {
          console.error('Error:', error);
        }
    )


  }

  const submitToHF = audioStr => {
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
    <section>
        <div className="py-4 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-6">
            <div className="mx-auto max-w-screen-md sm:text-center">
                <h1 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">Whisper2Notion</h1>
                <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Send voice notes transcribed by OpenAI's Whisper to your notion page. </p>
                <br></br>
           
                {/* <div className="w-480 h-0.5 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"> </div> */}

                  <h3 className=" text-center mb-4 text-xl tracking-tight font-regular text-gray-900 sm:text-sm dark:text-white">1. Create  <a href="https://www.notion.so/my-integrations" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">your own integration</a> with the following capabilities:</h3>

                  <input  name="myvalue" type="checkbox" disabled="disabled" checked="checked"/> <p className=" inline font-regular text-gray-900 sm:text-sm dark:text-white"> Insert content</p>
                  <br></br>
                  <input name="myvalue" type="checkbox" disabled="disabled" checked="checked"/><p className=" inline font-regular text-gray-900 sm:text-sm dark:text-white"> No user information</p> 

                  <br></br>
                  <br></br>
                  <br></br>
 
            <h3 className=" text-center	mb-4 text-xl tracking-tight font-regular text-gray-900 sm:text-sm dark:text-white">Paste the newly created integration's Internal Integration Token  </h3>
              
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                  <div className="relative w-full">
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-notion" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <rect x="4" y="4" width="16" height="16" rx="2" /> <path d="M7 7h3l6 6" /> <path d="M8 7v10" /> <path d="M7 17h2" /> <path d="M15 7h2" /> <path d="M16 7v10h-1l-7 -7" /> </svg>
                      </div>
                      <input className="block p-3 pl-10 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g. secret_1nWhDwKmhQJT6Mm7tccz5A3reyEQ0gLnrik60ezfjYJ" type="text" id="name" onChange={(e) => setSecret(e.target.value)} required=""/>
                  </div>
                  
              </div>
              <br></br>

        <div className="w-480 h-0.5 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"> </div>
        <br></br>
 
            <h3 className=" text-center	mb-4 text-xl tracking-tight font-regular text-gray-900 sm:text-sm dark:text-white">2. <a href="https://www.notion.so/help/add-and-manage-connections-with-the-api#add-connections-to-pages
" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Add</a> your notion integration to the page you would like to send text data to and paste the page link. </h3>
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                  <div className="relative w-full">
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-notion" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <rect x="4" y="4" width="16" height="16" rx="2" /> <path d="M7 7h3l6 6" /> <path d="M8 7v10" /> <path d="M7 17h2" /> <path d="M15 7h2" /> <path d="M16 7v10h-1l-7 -7" /> </svg>
                      </div>
                      <input className="block p-3 pl-10 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g. https://www.notion.so/rayansaleh/Notion-API-Playground-63499a6f3fcc4960a6f7c5b985e9bb06" type="text" id="name" onChange={(e) => setNotion(e.target.value)} required=""/>
                  </div>
                  
              </div>
              <br></br>
          <div className="w-480 h-0.5 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"> </div>
          <br></br>

              <h3 className=" text-center	mb-4 text-xl tracking-tight font-regular text-gray-900 sm:text-sm dark:text-white">3. Record audio - when you're happy with the recording, press send  </h3>
              <h4 className=" text-center	mb-4 text-m tracking-tight font-bold text-gray-900 sm:text-m dark:text-white"></h4>

              {/* center div */}
              <div className="flex justify-center my-5">
              <AudioRecorder id="recorder" onRecordingComplete={addAudioElement}
        recorderControls={recorderControls} />
              </div>
              <button onClick={recorderControls.stopRecording} className="px-4 py-2.5 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Stop recording & send
                </button>



                <div className="my-20 mx-auto max-w-screen-sm text-sm text-center text-gray-500 newsletter-form-footer dark:text-gray-300">Created by Rayan Saleh. <a href="https://github.com/rayan-saleh/Whisper2Notion" className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Source Code.</a></div>

       </div>
      
    </div>

  </section>

  )
}



export default App
