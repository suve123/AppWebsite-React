import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import {createCustomerPortalSession} from '../../src/api/services/createCustomerPortalSession';

const BillingButton = () => {
  const [billingUrls, setBillingUrls] = useState([]);

  const [links, setLinks] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const handleButtonClick = async () => {
    try {
      console.log("Button is clicked")
      setLoading(true);
      const response = await createCustomerPortalSession('fisk');
      setLinks(response);
      console.log("Reponse",response)
      
      if (response.status === 'ok') {
        if (response.urls.length > 1) {
          // we have several URLs to choose from - we must render new links to the user
          setBillingUrls(response.urls);
        } else {
          window.location.href = response.urls[0].url;
        }
      } else {
        console.error('Failed to get the URL');
        setBillingUrls(false);
      }
      
    } catch (e) {
      //setError(`Error fetching user profile: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {billingUrls.length === 0  || billingUrls === false ? (
       (billingUrls === false) ?
       
       <>
          <Typography variant="h6" gutterBottom>
            No subscriptions found
          </Typography>
         <Typography>We're sorry to inform you that we could not find any subscriptions in our system to link with your account. If you believe this to be an error, please contact us via email and provide us with your account details and any relevant information so that we can investigate the issue further. Our team is always ready to help you resolve any issues and ensure that your account is up-to-date and fully functional. Thank you for your cooperation.</Typography> 
       </>
       :

        
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Manage billing
        </Button>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            You have several subscription with us. Please select the one you will modify:
          </Typography>
          {billingUrls.map((billingUrl, index) => (
            <Box key={index} my={1}>
              <Typography>
              Subscription ID:&nbsp;
                <Link href={billingUrl.url} target="_blank" rel="noopener noreferrer" variant="body1">
                  {billingUrl.id}
                </Link>
              </Typography>
            </Box>
          ))}
        </>
      )}
    </>
  );
};

export default BillingButton;
