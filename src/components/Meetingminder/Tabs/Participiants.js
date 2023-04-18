import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Tabs, Tab, Box, AppBar } from '@mui/material';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';


const Component = ({ data }) => {

      
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', flex: 0.3 },
  { field: 'role', headerName: 'Role', flex: 1 },
  
];

  const rows = data.summary.message.participants.map((item, index) => ({
    id: index,
    name: item.name,
    role: item.meeting_role
  }));

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
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
