
import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';




function Component() {

  const auth = useContext(AuthContext);


  return (
    <Box>
      
      <Container maxWidth="xl">
        <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
          {/* Your main content goes here */}
          <Typography variant="h4" component="h1" gutterBottom>
            Login FAILED :-(
          </Typography>
          <Typography>
          The login failed. Please try again.
          </Typography>

          {auth ? (

              <Typography>
              </Typography>

              ) : (
                <Typography>
              </Typography>
            )}
            
        </Box>
      </Container>
    </Box>
    
  );


}




export default Component;