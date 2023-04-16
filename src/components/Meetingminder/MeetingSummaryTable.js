import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const MeetingSummaryTable = ({ data }) => {
  const { items } = data.output;

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
            <TableRow key={index}>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.summary.timestamp}</TableCell>
              <TableCell>{item.summary.message.meeting_titles[0]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MeetingSummaryTable;
