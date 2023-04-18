import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Tabs, Tab, Box, AppBar } from '@mui/material';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';


const Component = ({ data }) => {
    
  return (
    <>
              <Typography variant="h4" component="h1" gutterBottom>The short summaries</Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Short Summary</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.summary.message.summary_short.map((item, index) => (
                    <TableRow
                        key={index}
                        style={{ cursor: 'pointer' }}
                    >
                        <TableCell>{index}</TableCell>
                        <TableCell>{item}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            
            <Typography variant="h4" component="h1" gutterBottom>The long summaries</Typography>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Long Summary</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.summary.message.summary_long.map((item, index) => (
                    <TableRow
                        key={index}
                        style={{ cursor: 'pointer' }}
                    >
                        <TableCell>{index}</TableCell>
                        <TableCell>{item}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        
        


    </>
  );
};

export default Component;
