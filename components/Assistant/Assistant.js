
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { Paper, Card, CardMedia, CardContent, CardActions, Button, Container,Typography,Box} from '@mui/material';



function Component() {

  const auth = useContext(AuthContext);
  
  console.log("Rendering Assistant Main")


  return (
    <Box>
      
      <Container maxWidth="xl">
        <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
          {/* Your main content goes here */}
          <Typography variant="h4" component="h1" gutterBottom>
          Personal Assistant Chat
          </Typography>
          <Typography gutterBottom>
          We're currently in the process of creating something truly special for you...
          <br /><br />
In the near future, you'll be able to interact directly with your Smart Assistant right here on our website. This new, efficient interface will support multiple concurrent conversations, allowing you to engage in different discussions, each with its own unique context.
<br /><br />
But that's not all. Our Smart Assistant will not only be responsive to voice commands but will also be able to read out responses aloud. This feature enables a range of voice-enabled use cases, such as safely using the Smart Assistant while driving.
<br /><br />
While we're putting the finishing touches on this exciting new option, don't forget that you can already chat with your Smart Assistant via WhatsApp or Facebook Messenger. This works perfectly on both desktop and mobile devices, just as you're used to. Here are the links to get you started:
          </Typography>
          <Typography>
          <br />
              <a target="_blank" rel="noreferrer" href="https://wa.me/4552513005?text=Hello%20there!%20I%20am%20interested%20in%20your%20services.">
                Start a chat on WhatsApp - let me know about V10d (send a message to start)
              </a>
              <br />
              <a target="_blank" rel="noreferrer" href="https://m.me/100091366222064">
                Start a chat on Facebook Messenger (send a message to start)
              </a>
              <br /><br />
              Stay tuned for our upcoming update - we can't wait for you to experience it!
              </Typography>

        </Box>
      </Container>
    </Box>
    
  );


}




export default Component;