import React from 'react';
import { Button, Typography } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
//import { Link } from 'react-router-dom'; // Import the Link component


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

  function CustomToolbar() {
    return (
      
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        
      </GridToolbarContainer>
    );
    /*
        <Button variant="contained" color="primary" onClick={() => console.log('Perform action for selected rows')}>
          Action for Selected Rows
        </Button>
    */
  }
  
  const columns = [
    { field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        const targetComponentPath = `/meetingminder/show/?{params.row.statemachineId}`; // Replace this with the desired path
        //console.log("Select item")
        //console.log(params)
        return (
          <Link
            to={targetComponentPath}
            onClick={(event) => {
              event.preventDefault(); // Prevent the navigation
              handleRowSelect(params.row.statemachineId);
            }}
            style={{ textDecoration: 'none' }}
          >
            {params.value}
          </Link>
        );
      },
    },
    { field: 'time', headerName: 'Time', width: 150 },
    { 
      field: 'title',
      headerName: 'First meeting title',
      flex: 1,
      renderCell: (params) => {
        const targetComponentPath = `/meetingminder/show/?{params.row.statemachineId}`; // Replace this with the desired path
        //console.log("Select item")
        //console.log(params)
        /*
        return (
         
          <Link
            to={targetComponentPath}
            onClick={(event) => {
              event.preventDefault(); // Prevent the navigation
              handleRowSelect(params.row.statemachineId);
            }}
            style={{ textDecoration: 'none' }}
          >
            {params.value}
          </Link>
          
        );
        */
      },
    },
/*
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const handleClick = () => {
          console.log('Performing action for row:', params.row);
        };

        return <Button variant="contained" color="primary" onClick={handleClick}>Action</Button>;
      },
    }
*/    
  ];
  
    const rows = data.output.items.map((item, index) => ({
      id: index,
      statemachineId: item.statemachineId,
      status: item.status,
      time: item.time,
      title: item.title,
    }));



  return (
    <>
    <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowClick={(params, event) => {
            console.log("Row click Event fired")
            //console.log(event)
            //console.log(params)
            //handleRowSelect(params.row.statemachineId)
            //event.defaultMuiPrevented = true;
          }}
          
          components={{
            //Toolbar: CustomToolbar,
          }}
          
        />
      </div>
    </>
  );
};

export default MeetingSummaryTable;
