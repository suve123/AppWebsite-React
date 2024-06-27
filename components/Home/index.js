
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import BillingButton from '../BillingButton/index.js';

import {createCustomerPortalSession} from '../../src/api/services/createCustomerPortalSession';

  

function Component() {
  
  const auth = useContext(AuthContext);

  let redirectUri = encodeURIComponent(`https://${process.env.REACT_APP_DSAAPI_URLPATH}/auth/v10dresponse`)

  console.log("Home Component loaded")
  
  return (
    <Box>
      <Container maxWidth="xl">
        <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
          {/* Main content */}
          <Typography variant="h4" component="h1" gutterBottom>
            V10D Smart Solutions - Control & Management
          </Typography>
          
          {auth ? (
            <>
              <Typography gutterBottom>
                Welcome to your V10D Smart Solutions control portal. Here, you have access to a suite of tools designed to help you manage and optimize various aspects of your smart solutions. Easily configure your settings, monitor performance, and update your preferences. Use the menu to navigate through the different functionalities available to you.
                <br /><br />
              </Typography>
              <Typography gutterBottom>
                Use the menu to navigate the site.
                <br />
              </Typography>
            </>
          ) : (
            <>
              <Typography>
                Discover the power of V10D Smart Solutions, a comprehensive suite of AI-driven tools designed to enhance your productivity and streamline your workflows. Seamlessly integrate with platforms like Google Workspaces, Microsoft D365, JIRA, LinkedIn, and Slack. From managing your schedule to crafting perfect emails and optimizing meetings, V10D Smart Solutions offers a range of features to meet your needs. Choose from our Free, Light, and Advanced packages, and start with a risk-free 7-day trial to experience the full capabilities of our smart solutions.
              </Typography>
  
              <Typography>
                <br />
                Sign up or login here: <a href={`https://oauth.v10d.com/login?response_type=code&client_id=7g4ns3biqfljptpjdlpqsht97k&redirect_uri=${redirectUri}`}>Login/SignUp</a>
              </Typography>
            </>
          )}
          
        </Box>
      </Container>
    </Box>
  );


}




export default Component;