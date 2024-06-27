import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { Fab, Typography, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, CircularProgress  } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import {getSetup, updateSetup} from '../../api/services/UserSetup';

import NewLinkModal from './NewLinkModal';


function Component() {

  const [setup, setSetup] = useState(null);
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const auth = useContext(AuthContext);
  //console.log("Rendering Setup")

  const removeLink = async (clickedItemData) => {
    console.log("Clicked item", clickedItemData)
    try {
      const response = await updateSetup(null, encodeURIComponent( clickedItemData.ident ));
      console.log("Result", response.message)
      getUserSetup()
    } catch (e) {
      //setError(`Error fetching user profile: ${e.message}`);
    } finally {
      
    }
  };

  const getUserSetup = async () => {
    try {
      const response = await getSetup();
      setSetup(response);
      
      if (setup.output.status !== 200) {
        console.error('Failed to get the URL');
      }else{
        console.log("We got the setup data")
      }
    } catch (e) {
      //setError(`Error fetching user profile: ${e.message}`);
    } finally {
      
    }
  };

  useEffect(() => {
    console.log("useEffect - Meetingminder.js")

    if(auth){
      getUserSetup();

      
    }
  }, []);

  function generate(CustomComponent) {
    return setup.linkUsers.map((value, index) =>
      <CustomComponent key={index} itemData={value} />,
    );
  }

  const CustomListItem = ({ itemData, ...props }) => (
    <ListItem {...props}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => removeLink(itemData)} >
          <DeleteIcon  />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={itemData.ident}
        secondary={secondary ? 'Secondary text' : 'This Whatsapp account is connected and can use your account'}
      />
    </ListItem>
  );
  


  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  
  function showConnectedAccounts(){
    let out = 
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Connected accounts:
        </Typography>
        <Demo>
          <List dense={dense}>
            {generate(CustomListItem)}
          </List>

        </Demo>
      </Grid>
      
    return out
  }

  return (
    <Box>
      
      <Container maxWidth="xl">
        <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
          {/* Your main content goes here */}
          <Typography variant="h4" component="h1" gutterBottom>
            Setup
          </Typography>
          { console.log("Hepper123",setup) }
          
          {auth && setup ? (
            
            <>
             <Typography>
              Your data:<br />
              UserId: {setup.userId}<br />
              E-mail: {setup.email}<br />
              Account created: {setup.createdTime}<br />
              Subscriptions on account: {setup.subscriptions?.join(',')}<br />
              <br />
              </Typography>
              {showConnectedAccounts()}
              <NewLinkModal reloadAll={getUserSetup} updateSetup={updateSetup} />
              <br /><br />
              <Typography>
              In this section you will sonn be able to configure and setup your MeetingMinder and Smart Assistance products.
              <br /><br /><br />Test links:<br />
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
             

            </>

              ) : 
              
              auth ? (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              ) : 
              (
                
                <>
                <Typography>
                  Hey there, welcome to the setup page! To get started, we'd love for you to create a free account with us. You can easily link your Facebook or WhatsApp account for a seamless experience. If you prefer, you can also use the Smart Assistant directly from this webpage.
                  </Typography>
                  <br />
                  <Typography>
                  If you're already a member, simply log in with your existing user account. Once you're all set up, you'll be able to enjoy all the fantastic features we have to offer.<br /><br />So, let's dive in and get you connected. Happy exploring!
                </Typography>
                </>
              )
          }
            
        </Box>
      </Container>
    </Box>
    
  );


}




export default Component;