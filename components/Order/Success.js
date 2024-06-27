
import React, { useContext } from 'react';
//import { AuthContext } from '../AuthContext/AuthContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';




function Component() {

  //const auth = useContext(AuthContext);

  var auth = false;

  console.log("Rendering Setup")


  return (
    <Box>
      
      <Container maxWidth="xl">
        <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Typography variant="h4" component="h1" gutterBottom>Thank You for Your Order - We Appreciate Your Business!</Typography>
        
          <Typography gutterBottom>
          Congratulations! You now have access to the product you ordered. You can start using it right away by logging in to your V10d account. Please note that in some scenarios, it may be necessary to log out of your V10d account and then log back in for the permission for your user to be updated. If you encounter any issues or have any questions, please don't hesitate to contact our customer support team for assistance. We are committed to ensuring that you have a smooth and hassle-free experience with our product. Thank you for choosing V10d!
          </Typography>
          {auth ? (

              <Typography>
              ...
              </Typography>

              ) : (
                <Typography>
                ...
              </Typography>
            )}
            
        </Box>
      </Container>
    </Box>
    
  );


}




export default Component;