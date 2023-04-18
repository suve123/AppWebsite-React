
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import BillingButton from '../BillingButton/BillingButton';

import {createCustomerPortalSession} from '../../api/services/createCustomerPortalSession';


  

function Component() {
  
  const auth = useContext(AuthContext);

  let redirectUri = encodeURIComponent(`https://${process.env.REACT_APP_DSAAPI_URLPATH}/auth/v10dresponse/`)

  console.log("Home Component loaded")
  
  return (
    <Box>
      
      <Container maxWidth="xl">
        <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
          {/* Your main content goes here */}
          <Typography variant="h4" component="h1" gutterBottom>
            V10d Smart Assistant - Order & Configuration
          </Typography>
          
          {auth ? (
            <>
              <Typography gutterBottom>
              Welcome to your account management portal. Here, you can easily manage your subscription and billing information. With just a click, you'll be able to change your plan, update payment details, or even cancel your subscription. Everything you need to take control of your account is at your fingertips. Simply click the "Manage Billing" button below to get started.
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
                    Introducing the revolutionary V10d Smart Assistant, your ultimate AI-powered productivity partner designed to transform your work life. Experience seamless integration with your favorite platforms like Google Workspaces, Microsoft D365, JIRA, LinkedIn, and Slack for a truly connected experience. Master your schedule, craft impeccable emails, and streamline meetings with our intelligent AI assistance. Choose between our Free, Light, and Advanced packages, and enjoy a risk-free 7-day trial to unlock the full potential of V10d. Don't miss out; sign up today and elevate your productivity to unprecedented heights with V10d Smart Assistant!
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