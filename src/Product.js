
import React, { useContext, useState, useEffect  } from 'react';
import { AuthContext } from './App';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {Elements} from '@stripe/react-stripe-js';



function stripeEmbed(sub) {
  console.log(sub)


  return {
    __html: `<stripe-pricing-table 
      pricing-table-id="${process.env.REACT_APP_stripe_pricingTableId}"
      publishable-key="${process.env.REACT_APP_stripe_publishableKey}"
      customer-email="sune+checkouttest@typoconsult.dk"
      client-reference-id="${sub}"
    >
    </stripe-pricing-table>`
  };
}

function Component() {
  var sub 
  var groups 

  const storedJwtToken = sessionStorage.getItem('jwt');
  sub = sessionStorage.getItem('sub');
  groups = sessionStorage.getItem('groups');
  


  const auth = useContext(AuthContext);

  let redirectUri = encodeURIComponent(`https://${process.env.REACT_APP_DSAAPI_URLPATH}/auth/v10dresponse/`)


  return (
    <Box>
      
      <Container maxWidth="xl">
        <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
          {/* Your main content goes here */}
          <Typography variant="h4" component="h1" gutterBottom>
            Our Smart Assistant Products
          </Typography>
          {auth ? (


                
                 <div dangerouslySetInnerHTML={stripeEmbed(sub)} />
             



              ) : (
                <Typography>
                  Here you can regsiter and manage your V10 Smart Assistant account.
                  <br /><br />
                    <a href={`https://oauth.v10d.com/login?response_type=code&client_id=7g4ns3biqfljptpjdlpqsht97k&redirect_uri=${redirectUri}`}>Login/SignUp</a>
                </Typography>
            )}
            
        </Box>
      </Container>
    </Box>
    
  );


}




export default Component;