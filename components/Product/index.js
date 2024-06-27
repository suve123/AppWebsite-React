
import React, { useContext, useState, useEffect  } from 'react';
import { AuthContext } from '../AuthContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {Elements} from '@stripe/react-stripe-js';


function stripeEmbed(sub) {
  console.log(sub)

 // const userEmail = localStorage.getItem('email');
 var   userEmail;

  return {
    __html: `<stripe-pricing-table 
      pricing-table-id="${process.env.REACT_APP_stripe_pricingTableId}"
      publishable-key="${process.env.REACT_APP_stripe_publishableKey}"
      customer-email="${userEmail}"
      client-reference-id="${sub}"
    >
    </stripe-pricing-table>`
  };
}



function Component() {
  var sub 
  var groups 

  /*
  const storedJwtToken = localStorage.getItem('access_token');
  sub = localStorage.getItem('sub');
  groups = localStorage.getItem('groups');
  */


  const auth = useContext(AuthContext);

  let redirectUri = encodeURIComponent(`https://${process.env.REACT_APP_DSAAPI_URLPATH}/auth/v10dresponse`)

  


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
                  <ol>
                    <li>Make your free V10d account                     <a href={`https://oauth.v10d.com/login?response_type=code&client_id=7g4ns3biqfljptpjdlpqsht97k&redirect_uri=${redirectUri}`}>(Sign up now)</a></li>
                    <li>Check out the documentation and demos</li>
                    <li>Order your free trial from the product page and get instant product access</li>
                    <li>Use your Personal Assistant here on the site, through Messenger or WhatApp</li>
                    <li>Cancel your subscription here at app.v10d.com before the trail expires and pay nothing</li>
                  </ol>
                  Regsiter and manage your V10 Smart Assistant account.
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