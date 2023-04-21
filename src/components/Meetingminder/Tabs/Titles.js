import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Tabs, Tab, Box, AppBar } from '@mui/material';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

const Component = ({ data }) => {
    


  const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'title', headerName: 'Title', flex: 1 },
    
  ];
  
  const rows = data.summary.message?.meeting_titles.map((item, index) => ({
    id: index,
    title: item,
  }));

  if(!data.summary.message){
    return (
      <><Typography>No data show - properly it was not possible to process the data given.</Typography></>
    )
  }

  return (
    <>
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </>
  );
};

export default Component;
