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

} from '@mui/material';

import MeetingSummaryTable from './MeetingSummaryTable';
import { getAllMeetings } from '../../api/meetingminder/services/getAllMeetings';

function Component() {
  const auth = useContext(AuthContext);

  const [data, setLinks] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMeetings = async () => {
    try {
      setLoading(true);
      const data = await getAllMeetings('fisk');
      setLinks(data);

      if (data.status !== 'ok') {
        console.error('Failed to get the URL');
      }
    } catch (e) {
      //setError(`Error fetching user profile: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    <Box>
      <Container maxWidth="xl">
        <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            MeetingMinder
          </Typography>
          {auth ? (
            data ? (
              <div>
                <MeetingSummaryTable data={data} />
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
  );
}

export default Component;
