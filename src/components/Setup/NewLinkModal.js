import { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Fab,
  Box,
  FormControl ,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add'



const Component = ({ reloadAll, updateSetup }) => {
  const [open, setOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {

    // Get the current URL
    const url = window.location.href;
      
    // Create a URL object to parse the query string
    const parsedUrl = new URL(url);
    
    // Check if the 'linkAdd' parameter is present
    if (parsedUrl.searchParams.has('linkAdd')) {
      const linkAddValue = parsedUrl.searchParams.get('linkAdd');
      console.log('linkAdd is present with value:', linkAddValue);
      const [ident, source] = linkAddValue.split("@");
      console.log('Our extratex consts', ident, source)
      if(source === 'MESSENGER'){
        setSelectedValue('Messenger')
      }else if(source === 'WHATSAPP'){
        setSelectedValue('Whatsapp')
      }else{
        console.log("NO MATCH :-(")
        setSelectedValue('')
      }
      const parts = ident.split(':')
      if(parts.length > 1){
        setLinkTitle(parts[1].trim())
      }else{
        setLinkTitle(ident)
      }
      handleOpen()

      // Perform any additional actions with the 'linkAdd' value
    } else {
      console.log('linkAdd is not present');
      
    }

  }, []);
      

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [linkTitle, setLinkTitle] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [idLabel, setIdLabel] = useState('Account ID');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    switch (event.target.value) {
      case 'Whatsapp':
        setIdLabel('+4533225544 (Your phone-number starting with countrycode and no spaces)')
        break;
      case 'Messenger':
        setIdLabel('')
        break;
      case 'Microsoft':
        setIdLabel('Syntax help 1')
        break;
      case 'Google':
        setIdLabel('Syntax help 2')
        break;  
      case 'Discord':
        setIdLabel('Syntax help 3')
        break;
      default:
      break;
    }

  };

  const  handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Submitted:', selectedValue , linkTitle);
    
    const response = await updateSetup(encodeURIComponent( `${selectedValue.toLowerCase()}:${linkTitle}`), null);
    console.log(response)
    console.log(response.message)

    setShowConfirmation(true);
    
  };

  const handleConfirmationClose = () => {
    // Here we should also reload the tamle with the now processing entry....
    setShowConfirmation(false);
    handleClose();
    //dataUpdateMethod(null);
    reloadAll();
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', '& > :not(style)': { m: 1 } }}>
        <Fab variant="extended" color="primary" aria-label="add"  onClick={handleOpen}>
            <AddIcon sx={{ mr: 1 }} />
            Link to account
        </Fab>
     </Box>

      <Dialog 
       open={open}
       onClose={handleClose}
       maxWidth="md" // Set the maxWidth to avoid overflowing the screen
       fullWidth // Makes the dialog take the full width of the screen
       PaperProps={{
         sx: {
           width: '80%',
           height: '80%',
           maxHeight: '80%', // Added maxHeight to limit the height
           overflowY: 'auto', // Allows scrolling if the content is larger than the height
         },
       }}
      >
        <DialogTitle>Create new link to account</DialogTitle>
        {showConfirmation ? (
          <DialogContent>
            <DialogContentText>
              The link have now been created.
            </DialogContentText>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmationClose}
              >
                Close
              </Button>
            </DialogActions>
          </DialogContent>
        ):
        (
          <DialogContent>
            <DialogContentText>
              <br />Easily connect your V10d Smart Software account to external platforms like WhatsApp or Facebook Messenger, and enjoy seamless access to your Smart Assistant on-the-go. Just link your personal accounts, and you're all set to chat with your personal assistant across devices. Please note that sharing subscriptions is against our terms of use, and your personal data and usage information may be shared between devices and platforms. Happy connecting!<br /><br />
            </DialogContentText>

            <form>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Platform</InputLabel>
                <Select
                  labelId="platform-label"
                  id="platform"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  <MenuItem value="Whatsapp">Whatsapp</MenuItem>
                  <MenuItem value="Messenger">Facebook/Messenger</MenuItem>
                  <MenuItem value="Microsoft" disabled>Microsoft/Teams</MenuItem>
                  <MenuItem value="Google" disabled>Google</MenuItem>
                  <MenuItem value="Discord" disabled>Discord</MenuItem>
                </Select>
              </FormControl>

              <TextField 
              id="outlined-basic"
              margin="dense"
              label={idLabel}
              variant="outlined"
              fullWidth
              value={linkTitle}
              onChange={(event) => setLinkTitle(event.target.value)}
            />
             
            
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                  Create
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        )
        }
        
        
      </Dialog>
    </>
  );
}

export default Component;
