import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const MeetingSummaryTable = ({ data, handleRowSelect }) => {
  console.log(data)
  if(!data?.output){
    return (
      <>
      <Typography>There is no meetings on your account</Typography>
      </>
    )
  }
  const { items } = data.output;

  const onRowClick = (title) => {
    handleRowSelect(title);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>First Meeting Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={index}
              onClick={() => onRowClick(item.statemachineId)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>{item.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MeetingSummaryTable;
