import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Fab,
  Box
} from '@mui/material';
import { Add } from '@mui/icons-material';
import NavigationIcon from '@mui/icons-material/Navigation'

import { CreateMeeting } from '../../api/meetingminder/services/createMeeting';


function NewSummaryModal(props) {
  const [open, setOpen] = useState(false);
  const [summaryText, setSummaryText] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const  handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Summary text:', summaryText);
    const reponse = await CreateMeeting(summaryText)

    console.log(reponse)
    //handleClose();
    // Do something with the summary text, such as sending it to the server
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', '& > :not(style)': { m: 1 } }}>
        <Fab variant="extended" color="primary" aria-label="add"  onClick={handleOpen}>
            <NavigationIcon sx={{ mr: 1 }} />
            Create new summary
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
        <DialogTitle>Create new summary</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the summary text below:
          </DialogContentText>
          <form>
            <TextField
                autoFocus
                margin="dense"
                label="Summary text"
                fullWidth
                multiline // Enable multiline
                rows={30} // Set the number of rows to display
                value={summaryText}
                onChange={(event) => setSummaryText(event.target.value)}
                onKeyPress={(event) => {
            }}
          />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewSummaryModal;
