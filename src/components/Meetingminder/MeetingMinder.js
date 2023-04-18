import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import {
  CircularProgress,
  Container,
  Typography,
  Box,
  StepContent,
  Paper,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Fab
} from '@mui/material';

import NavigationIcon from '@mui/icons-material/Navigation'

import MeetingSummaryTable from './MeetingSummaryTable';
import MeetingminderDetailsTabs from './MeetingminderDetailsTabs';
import NewSummaryModal from './NewSummaryModal';


import { getAllMeetings } from '../../api/meetingminder/services/getAllMeetings';
import { getMeeting } from '../../api/meetingminder/services/getMeeting';



function Component() {
  const auth = useContext(AuthContext);

  const [data, setLinks] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMeetings = async () => {
    try {
      setLoading(true);
      const response = await getAllMeetings();
      setLinks(response);

      console.log(data.output)
      if (data.output.status !== 200) {
        console.error('Failed to get the URL');
      }else{
        console.log("We got the data")
      }
    } catch (e) {
      //setError(`Error fetching user profile: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  async function fetchMeeting(id) {
    const response = await getMeeting(id);
    setSummary(response);
  }

  useEffect(() => {
    console.log("useEffect - Meetingminder.js")
    getMeetings();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }


  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', '& > :not(style)': { m: 1 } }}>
        <NewSummaryModal />
      </Box>
    
    <Typography variant="h4" component="h1" gutterBottom>
          MeetingMinder
    </Typography>

    <Box>
      <Container maxWidth="xl">
        <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
         
          {auth ? (
            data ? (
              <div>
                <MeetingSummaryTable data={data} handleRowSelect={fetchMeeting} />
                <br />
                {summary ?
                  <MeetingminderDetailsTabs data={summary} />
                  :
                  <></>
                }
                

                
              </div>
            ) : (
              <Typography>[coming]</Typography>
            )
          ) : (
            <>
              <Typography gutterBottom>
                 ...
              </Typography>
              <Typography gutterBottom>
                 ...
              </Typography>
            </>
          )}
        </Box>
      </Container>
    </Box>
  </>
  );
}

export default Component;
