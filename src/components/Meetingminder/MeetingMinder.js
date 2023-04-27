import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import {
  CircularProgress,
  Container,
  Typography,
  Box,
  Link,
  StepContent,
  Paper,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid
} from '@mui/material';

import NavigationIcon from '@mui/icons-material/Navigation'
import YoutubeEmbed from "../YoutubeEmbedd";
import MeetingSummaryTable from './MeetingSummaryTable';
import MeetingminderDetailsTabs from './MeetingminderDetailsTabs';
import NewSummaryModal from './NewSummaryModal';


import { getAllMeetings } from '../../api/meetingminder/services/getAllMeetings';
import { getMeeting } from '../../api/meetingminder/services/getMeeting';

import CachedIcon from '@mui/icons-material/Cached';

function Component({SummaryText, setSummaryText, setTriggerEffect}) {
  const auth = useContext(AuthContext);

  const [data, setLinks] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loadingTable, setLoadingTable] = useState(false);
  const [hideTable, setHideTable] = useState(false);
  const [loadingMeeting, setLoadingMeeting] = useState(false);

  const getMeetings = async () => {
    try {
      setHideTable(false)
      setLoadingTable(true);
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
      setLoadingTable(false);
    }
  };

  async function fetchMeeting(id) {
    
    setLoadingMeeting(true);
    const response = await getMeeting(id);
    setSummary(response);
    setLoadingMeeting(false);
    setHideTable(true)
  }

  function handleReload(){
    setSummary(null);
    getMeetings();
  }

  useEffect(() => {
    console.log("useEffect - Meetingminder.js")
    if(auth){
      getMeetings();
    }
  }, []);

  if (loadingTable) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  let redirectUri = encodeURIComponent(`https://${process.env.REACT_APP_DSAAPI_URLPATH}/auth/v10dresponse`)

 

  return (
    <>


   
          {auth ? (
            <>
                <Box sx={{ flexGrow: 1, display: 'flex', '& > :not(style)': { m: 1 }}}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ marginRight: 'auto' }}>
                          MeetingMinder:
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Button variant="outlined" startIcon={<CachedIcon />} sx={{ marginRight: 'auto' }} color="primary" onClick={handleReload}>
                            Reload
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ textAlign: 'right' }}>
                          <NewSummaryModal reloadAll={getMeetings} dataUpdateMethod={setSummary} setTriggerEffect={setTriggerEffect} />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                <Container maxWidth="xl">
                  <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
                
            { data ? (
              <div>
                {(hideTable ? 
                <Link
                to={`/meetingminder/show/?{params.row.statemachineId}`}
                onClick={(event) => {
                  setHideTable(false)
                  //event.preventDefault(); // Prevent the navigation
                  //handleRowSelect(params.row.statemachineId);
                }}
                //style={{ textDecoration: 'none' }}
              >
               <Typography>Show all meetings</Typography>
              </Link>
                  
                :
                   <MeetingSummaryTable data={data} handleRowSelect={fetchMeeting} />

                )}
                <br />
                
                {loadingMeeting ?
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
                  :(
                      summary ? 
                        <MeetingminderDetailsTabs reloadAll={getMeetings} dataUpdateMethod={setSummary} data={summary} SummaryText={SummaryText} setSummaryText={setSummaryText} setTriggerEffect={setTriggerEffect}  />
                        
                        :
                        <></>
                  
                  )
              }
                
                

                
              </div>
            ) : (
              <Typography>[coming]</Typography>
            )}
            </Box>
            </Container>
          </Box>
          </>
          ) : (
            <>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', '& > :not(style)': { m: 1 } }}>
              <Typography gutterBottom>
                <div className="App">
                    <h1>Learn about MeetingMinder & Sign in to try:</h1>
                    <YoutubeEmbed embedId="omk0i4r4N90" />
                 </div>
              </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', '& > :not(style)': { m: 1 } }}>
              <Typography>
                  <br />
                  100% free trial for 14 days: <a href={`https://oauth.v10d.com/login?response_type=code&client_id=7g4ns3biqfljptpjdlpqsht97k&redirect_uri=${redirectUri}`}>Login/SignUp</a>
              </Typography>
              </Box>
            </>
          )}

  </>
  );
}

export default Component;
