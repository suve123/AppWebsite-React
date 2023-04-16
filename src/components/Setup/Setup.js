
import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';




function Component() {

  const auth = useContext(AuthContext);
  console.log("Rendering Setup")


  return (
    <Box>
      
      <Container maxWidth="xl">
        <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
          {/* Your main content goes here */}
          <Typography variant="h4" component="h1" gutterBottom>
            Setup
          </Typography>
          {auth ? (

              <Typography>
              <a target="_blank" rel="noreferrer" href="https://wa.me/4552513005?text=Hello%20there!%20I%20am%20interested%20in%20your%20services.">
                Start a chat on WhatsApp - let me know about V10d
              </a>
              <br />
              <a target="_blank" rel="noreferrer" href="https://wa.me/4552513005?text=Hi%20Assistant!%20Please%20fetch%20https%3A%2F%2Fwww.cnn.com%2F%20and%20summarize%20the%20top%20news%20of%20the%20day%20for%20me.">
                Start a chat on WhatsApp - Tell me about todays news
              </a>
              <br />
              <a target="_blank" rel="noreferrer" href="https://m.me/100091366222064">
                Start a chat on Messenger
              </a>


              </Typography>

              ) : (
                <Typography>
                In this section, you can personalize your digital assistant. Start by logging into your account.
              </Typography>
            )}
            
        </Box>
      </Container>
    </Box>
    
  );


}




export default Component;