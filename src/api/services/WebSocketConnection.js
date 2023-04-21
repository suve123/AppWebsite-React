import React, { useState, useEffect } from 'react';

const WEBSOCKET_URL = 'wss://32eij3c2ik.execute-api.eu-central-1.amazonaws.com/Prod';

function App(setSummaryText, setCompletion, completionRef, setSnackOpen, setSnackText) {
  //const [taskResult, setTaskResult] = useState(null);


  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_URL);

    socket.addEventListener('open', () => {
      console.log('WebSocket connection established');
    });

    var currentWorkloadIdent

    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data).messageIn
        console.log("Incomming message NOW:")
        //console.log(data)
        switch (data.type) {
            case 'task_completed':
              if (data.workload === 'generateSummary') {
                  console.log("generateSummary has been received - we now set the setSummaryText:")
                  setSummaryText(data.summaryText);
              }
              if (data.workload === 'summaryMaker') {
                console.log("New summary have been finised - we shall notifuy the user:")
                console.log(data)
                setSnackText(` ${data.title}: The summary is ready. Reload to work with it.`)
                setSnackOpen(true);
            }

              break;

            case 'completion_update':
              console.log(data.workloadIdent)
              // workloadIdent is the requestID so that we detect when it is a new request
              if(data.summaryText.length > completionRef.current.length || data.workloadIdent !== currentWorkloadIdent ){
                currentWorkloadIdent = data.workloadIdent
                console.log("UUUUUUUUUUUPPPDATE")
                setCompletion(data.summaryText)
                setSummaryText(data.summaryText)

              }else{
                console.log("NOOOOOOOOOOO Shorter than before - maybe an older item")
              }

              break;
        
            default:
              break;
        }
    });

    const pingInterval = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'ping' }));
            console.log("Websocket has been pinged.")
        }
    }, 240000); // Ping every 4 minutes

      
    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
    });

    return () => {
      clearInterval(pingInterval);
      socket.close();
    };
  }, []);

  const handleSubmit = async () => {
    // Submit the task through your API Gateway or WebSocket.
  };

  return (
    <div>
      {/* Display task results or other UI elements */}
      <button onClick={handleSubmit}>Submit Task</button>
    </div>
  );
}

export default App;
