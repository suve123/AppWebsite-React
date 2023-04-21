import React, { useContext, useState, useEffect } from 'react';
import { Table, Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button, DialogActions } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { generateSummary } from '../../../api/meetingminder/services/generateSummary';


const Component = ({ data, SummaryText, setSummaryText }) => {

    const textItems = [
        'Please generate a detailed and comprehensive summary of the provided meeting transcript, which took place in a professional setting. The summary should be around 700 words in length, capturing the main discussion points, key decisions, and relevant action items from the meeting.',
        'Provide a short 300 word summary of the primary challenges and obstacles discussed in the meeting, as well as the proposed strategies and action plans to address these challenges.',
        'What were the quantitative goals discussed during the session?',
        'Summarize the main outcomes and decisions of the meeting, including any consensus reached, new initiatives launched, or action items assigned to specific individuals or teams.',
        'Analyze the interpersonal dynamics during the meeting, focusing on the key roles and contributions of each participant, and how these roles influenced the overall direction and outcome of the discussions.',
        'Create a concise summary of the main learnings and takeaways from the meeting, emphasizing any new insights or perspectives gained by the participants and how these may influence future decision-making.',
        'Provide a summary of the meeting as if it were an episode of a reality TV show, focusing on the most entertaining or unexpected moments, alliances formed, and any "elimination" decisions made by the group.',
        'Provide an overview of the meeting as if it were a high-stakes poker game, with participants "betting" on their ideas, "bluffing" their way through tough situations, and making strategic plays to secure the best possible outcomes.',
        'In just 3 emojis, can you summarize the key takeaways from the meeting? Explain your choices.',
        'If the meeting summary were a haiku, what would it be? Create a 5-7-5 syllable poem to convey the essence of the meeting.',
        'If the meeting were a painting, what would be the central theme and prominent colors? Describe the meeting summary as an artistic creation.',
        'If this meeting were a gourmet meal, what were the main ingredients? Summarize the meeting as a creative recipe.'
        // ... add more text items as needed
      ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [PromptText, setPromptText] = useState(textItems[0]);
    //const [SummaryText, setSummaryText] = useState('');

    console.log("Summaries COMP. SummaryText is:")

    if(!data.summary.message){
        return (
            <><Typography>No data show - properly it was not possible to process the data given.</Typography></>
        )
    }

    const  handleGenerateSummary = async (event) => {
        event.preventDefault();
        let prompt = PromptText
        const reponse = await generateSummary(prompt, data.summary.message.summary_long)
        console.log("Here we are - AFTER we have got the repnse")
        console.log(reponse)
        setSummaryText('Please wait for the result...... It will typically take less than a minute....')

    };
    
    const  handleCancel = async (event) => {
        event.preventDefault();

    };
      function setThePromptText(NewCurrentIndex){
        setCurrentIndex(NewCurrentIndex)
        setPromptText(textItems[NewCurrentIndex])

       }
      
  return (
    <>
        <Box>
        <Typography variant="h4" component="h1" gutterBottom>Generate a meeting summary:</Typography>

        <Button
            disabled={currentIndex === 0}
            onClick={() => setThePromptText(currentIndex - 1)}
        >
            <ArrowBackIcon />
        </Button>

        <Button
            disabled={currentIndex === textItems.length - 1}
            onClick={() => setThePromptText(currentIndex + 1)}
        >
            <ArrowForwardIcon />
        </Button> Click arrows to get suggestions. Fix the Instruction to get desired results.
        </Box>
              <TextField
                  autoFocus
                  margin="dense"
                  label="Instruction"
                  fullWidth
                  multiline // Enable multiline
                  rows={4} // Set the number of rows to display
                  value={PromptText}
                  onChange={(event) => setPromptText(event.target.value)}
                  //onKeyPress={(event) => {  }}
              />
               <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary" onClick={handleGenerateSummary}>
                  Generate summary now
                </Button>
              </DialogActions>
              <TextField
                  autoFocus
                  margin="dense"
                  label="Summary text"
                  fullWidth
                  multiline // Enable multiline
                  rows={20} // Set the number of rows to display
                  value={SummaryText}
                  onChange={(event) => setSummaryText(event.target.value)}
//                  onKeyPress={(event) => {   }}
            />
              <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary" onClick={``}>
                  Save
                </Button>
              </DialogActions>
              
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
            <Typography gutterBottom>The long summaries are the basis for the generated summaries. The digital assistant will take these texts as the input when you ask for summaries. In a soon to come version you will be able to fix and adjust the content in the long summaries. Untill then - you will have to pass instructions when generating the summary to have errors and misunderstandings fixed. </Typography>
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
