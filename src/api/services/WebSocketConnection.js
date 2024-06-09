import React, { useState, useEffect } from 'react';

const WEBSOCKET_URL = 'wss://32eij3c2ik.execute-api.eu-central-1.amazonaws.com/Prod';

function App(setSummaryText, setCompletion, completionRef, setSnackOpen, setSnackText, triggerEffect, setTriggerEffect) {
  //const [taskResult, setTaskResult] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);


  useEffect(() => {

    const accessToken = localStorage.getItem('access_token')

    console.log("Check if we shall make connection")
    console.log("Access", accessToken)
    console.log("Socket", socket)
    if ( !isConnected && accessToken && ( !socket || (socket.readyState !== 1 && socket.readyState !== 0) )) {

        console.log("TRYING to make a connection ****************************")
        const webSocket = new WebSocket(`${WEBSOCKET_URL}?token=${encodeURIComponent(accessToken)}&_=${Date.now()}`);

        webSocket.addEventListener('open', () => {
          console.log('WebSocket connection established');
          setIsConnected(true);
          setSocket(webSocket);
        });

        var currentWorkloadIdent

        webSocket.addEventListener('message', (event) => {
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
            if (socket?.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ type: 'ping' }));
                console.log("Websocket has been pinged.")
            }else{
              // The conection seems to not be here?
              console.error("We shoudl do something?? We are not connected by trying to keep it alive... Very like this is the Token that has expired!!!!! We need to make sure to refresh that!")
              console.error(webSocket)
              // setTriggerEffect(prevValue => prevValue + 1) // We trigger the Websocket connect - but we should properly make sure that the Token has been refreshed first.
            }
        }, 240000); // Ping every 4 minutes

          
        webSocket.addEventListener('close', () => {
          console.log('WebSocket connection closed');
          setIsConnected(false);
          setSocket(null);
        });

        return () => {
          console.log("useeffect cleanup")
          console.log(socket)
          console.log(webSocket)
          if( ( !webSocket || (webSocket.readyState !== 1 && webSocket.readyState !== 0) ) ){
            console.log("Now closing it as a part of cleanup")
            clearInterval(pingInterval);
            webSocket.close();
          }else{
            console.log("Not doing cleanup")
          }
          console.log("Cleanup is DONE")
        };
    }else{
      console.log("We do not need to make connection ----------------------------------")
      

    }
    

  }, [triggerEffect]);

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
