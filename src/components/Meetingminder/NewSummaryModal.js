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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import NavigationIcon from '@mui/icons-material/Navigation'
import { CreateMeeting } from '../../api/meetingminder/services/createMeeting';

const Component = ({ reloadAll, dataUpdateMethod, setTriggerEffect }) => {
  const [open, setOpen] = useState(false);
  const [summaryText, setSummaryText] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const  handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Summary text:', summaryText, meetingTitle, meetingDate.format('DD/MM-YYYY'));
    const reponse = await CreateMeeting(summaryText, meetingTitle, meetingDate.format('DD/MM-YYYY'))

    console.log(reponse)
    
    setShowConfirmation(true);

    setTriggerEffect(prevValue => prevValue + 1);
    //handleClose();
    // Do something with the summary text, such as sending it to the server
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
        {showConfirmation ? (
          <DialogContent>
            <DialogContentText>
              Your summary has been submitted for processing. It can take up to several minutes to process the summary depending in the lenght.
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
            <TextField 
              id="outlined-basic"
              margin="dense"
              label="Title of the meeting"
              variant="outlined"
              fullWidth
              value={meetingTitle}
              onChange={(event) => setMeetingTitle(event.target.value)}
            />
             <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker 
                  label="Date of the meeting"
                  value={meetingDate}
                  onChange={(date) => setMeetingDate(date)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <DialogContentText>
              <br />Enter the transscription below:
            </DialogContentText>
            <form>
              <TextField
                  autoFocus
                  margin="dense"
                  //label="Summary text 1234"
                  placeholder="WEBVTT

                  00:00:00.000 --> 00:00:01.330
                  <v Speaker 1>Full of those on vacation.</v>
                  
                  00:00:07.770 --> 00:00:08.310
                  <v Speaker 1>Good.</v>
                  
                  00:00:08.460 --> 00:00:14.580
                  <v Speaker 1>And in case you're wondering who will start, we'll begin with the 80% booking digitization topic.</v>
                  
                  00:00:15.390 --> 00:00:19.840
                  <v Speaker 1>I just wanted to share something first regarding that because when I joined.</v>
                  
                  00:00:20.650 --> 00:00:29.340
                  <v Speaker 1>the company almost three years ago now, this slide, hopefully you can see it, was one of the very first things I was shown.</v>
                  
                  00:00:30.280 --> 00:00:39.760
                  <v Speaker 1>And it don't mind the colors, and they're very ugly. But back in early 2020, you know, we set out and said.</v>
                  "
                  fullWidth
                  multiline // Enable multiline
                  rows={25} // Set the number of rows to display
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
        )
        }
        
        
      </Dialog>
    </>
  );
}

export default Component;
