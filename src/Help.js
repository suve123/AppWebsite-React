
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './App';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';




function Component() {

  const auth = useContext(AuthContext);


  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
        try {
          // Retrieve the JWT token from sessionStorage (or localStorage)
          const jwtToken = sessionStorage.getItem('jwt');
          // const jwtToken = localStorage.getItem('jwt');
  
          //console.log(sessionStorage);
          //console.log(auth);
  
          // Set the URL with the userID parameter
          const apiUrl = 'https://g9v2m4hq92.execute-api.eu-central-1.amazonaws.com/Prod/meetings';
          const userId = 'c873f069-3131-4d12-b648-644bac4344fc';
          const url = new URL(apiUrl);
          url.searchParams.append('userID', userId);
  
          // Make the HTTP GET request with the Bearer token
          const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
             // 'Authorization': `Bearer ${jwtToken}`
            }
          });
  
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
  
          const responseData = await response.json();
          setData(responseData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [auth]);


  return (
    <Box>
      
      <Container maxWidth="xl">
        <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
          {/* Your main content goes here */}
          <Typography variant="h4" component="h1" gutterBottom>
            Help
          </Typography>
          {auth ? (

              <Typography>
                Help here.
              </Typography>

              ) : (
                <Typography>
               Help here.
              </Typography>
            )}
            
        </Box>
      </Container>
    </Box>
    
  );


}




export default Component;