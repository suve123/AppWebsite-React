
import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import BillingButton from '../BillingButton/BillingButton';



function Component() {

  const auth = useContext(AuthContext);


  const handleClick = () => {
    window.location.href = 'https://billing.stripe.com/p/login/dR629z1ha7m6ad2cMM';
  };

  return (
    <Box>
      
      <Container maxWidth="xl">
        <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
          {/* Your main content goes here */}
          <Typography variant="h4" component="h1" gutterBottom>
            Manage your subscription and payments
          </Typography>
          {auth ? (

                <BillingButton />

              ) : (
                <Typography>
                Log in with youe V10d credentials to manage your subscription details:<br /><br />
                <a href="https://v10dcustomerportal3e07bafe-3e07bafe-dev.auth.eu-central-1.amazoncognito.com/login?response_type=code&client_id=7g4ns3biqfljptpjdlpqsht97k&redirect_uri=https://67b9-87-104-3-177.eu.ngrok.io/auth/v10dresponse/">Login/SignUp</a>
                  <br/><br/>

              </Typography>
            )}
            
        </Box>
      </Container>
    </Box>
    
  );


}




export default Component;