import React, { useContext, useState, useEffect } from 'react';
import { Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, Tabs, Tab, Box, AppBar } from '@mui/material';
import PropTypes from 'prop-types';
//import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

import TabTitles from './Tabs/Titles';
import Participiants from './Tabs/Participiants';
import Summaries from './Tabs/Summaries';
import Actions from './Tabs/Actions';

import { deleteMeeting } from '../../src/api/meetingminder/services/deleteMeeting';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

const Component = ({ data, reloadAll, dataUpdateMethod, SummaryText, setSummaryText, setTriggerEffect }) => {

    console.log("MeetingMinderDetailTabs comp.")

  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  console.log("Initial value:", value);

  const handleChange = (event, newValue) => {
    console.log("Setting handleChange value to",newValue)
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    console.log("Setting handleChangeIndex value to",index)
    setValue(index);
  };
   

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteMeeting = async () => {
    await deleteMeeting(data.statemachineId);
    dataUpdateMethod(null);
    reloadAll();
    setOpen(false);
  };

  return (
    <>
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', '& > :not(style)': { m: 1 } }}>
          <Button variant="outlined" startIcon={<DeleteIcon />} sx={{ marginRight: 'auto' }} color="primary" onClick={handleClickOpen}>
              Delete meeting
          </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete the selected meeting?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete the selected meeting that is shown below. You can not undo this operation.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDeleteMeeting} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>

    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Meeting title" {...a11yProps(0)} />
          <Tab label="Actions" {...a11yProps(1)} />
          <Tab label="Participiants" {...a11yProps(2)} />
          <Tab label="Summaries" {...a11yProps(3)}  />
          
        </Tabs>
      </AppBar>
    </Box>

    
        
        


    </>
  );
};

/*
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <TabTitles data={data}></TabTitles>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <Actions data={data}></Actions>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Participiants data={data}></Participiants>         
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Summaries data={data} SummaryText={SummaryText} setSummaryText={setSummaryText} setTriggerEffect={setTriggerEffect} ></Summaries>
        </TabPanel>
      </SwipeableViews>

*/

export default Component;
