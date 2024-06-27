import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Tabs, Tab, Box, AppBar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Component = ({ data }) => {
    


  const columns = [
    { field: 'time', headerName: 'Time', width: 110 },
    { field: 'item', headerName: 'Item', flex: 1 },
    { field: 'who_suggest', headerName: 'Suggested by', flex: 0.25 },
    { field: 'who_action', headerName: 'Action to', flex: .25 },
    
  ];
  
  const rows = data.summary.message?.future_actions.map((item, index) => ({
    id: index,
    time: item.timestamp,
    item: item.item,
    who_suggest: item.suggested_by,
    who_action: item.assigned_to,
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
