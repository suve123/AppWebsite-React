import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Tabs, Tab, Box, AppBar } from '@mui/material';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';

import TabTitles from './Tabs/Titles';
import Participiants from './Tabs/Participiants';
import Summaries from './Tabs/Summaries';


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
            <Typography>{children}</Typography>
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

const Component = ({ data }) => {
    
    console.log("Detail here....")
    console.log(data)
  //const { items } = data.output;

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

    
  return (
    <>

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
          <Tab label="Participiants" {...a11yProps(1)} />
          <Tab label="Summaries" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <TabTitles data={data}></TabTitles>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <Participiants data={data}></Participiants>          
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
            <Summaries data={data}></Summaries>
        </TabPanel>
      </SwipeableViews>
    </Box>

    
        
        


    </>
  );
};

export default Component;
