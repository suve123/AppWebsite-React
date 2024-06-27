import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { Fab, Typography, Button, Grid, TextField, Box, Container, MenuItem, Avatar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import { styled } from '@mui/material/styles';
import YoutubeEmbed from "../YoutubeEmbedd";
import VimeoEmbed from "../VimeoEmbedd";
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';


const challenges = [
  { label: 'Integration with existing systems' },
  { label: 'User adoption' },
  { label: 'Data security' },
  { label: 'Scalability' },
  { label: 'Cost management' },
];

const VideoLanding = () => {
  const [setup, setSetup] = useState(null);
  const [selectedChallenges, setSelectedChallenges] = useState([]);
  const [email, setEmail] = useState('');

  const auth = useContext(AuthContext);

  const { id } = useParams();


  useEffect(() => {
    console.log("useEffect - Videolanding.js");
    if (auth) {
      // Perform any auth-related actions here
    }
  }, [auth]);

  const handleChallengeChange = (event) => {
    const value = event.target.value;
    setSelectedChallenges(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Form submitted with challenges:", selectedChallenges, "and email:", email);
  };


  return (
    <Box>
      {/* Helmet for meta tags */}
      <Helmet>
        <title>Helmet Landing Page Title</title>
        <meta name="description" content="Helmet Meta description field goes here. This is the Helmet component." />

        <meta property="og:title" content="Video for Anders in the og title" />
        <meta property="og:description" content="Video has been prepared - hope you will like it." />
        <meta property="og:image" content="https://files2.heygen.ai/aws_pacific/avatar_tmp/e3e11c3426a54ef8b01a02133009cfed/061a14961595444bbddc71b02ac50506.jpeg?Expires=1720110167&Signature=fFA2~DArAcf7mthZY1Hqu3Z3Ltu582rEob0MaCNilhqYjc3pzJHN1PjjNfbjgHMOBknbf3i~LFeSh-T5zaFLmLPIZAJWlySbxnYPWi~HXhHNsXUgwjid7HBSkmSGhRcPs2fHm3YU1phz-ATJ7oDRw7O8EqxF3v50KcLlRFSxkiK97cNZPhgCl7KkagzO7X-XNNTRPLn9toEjSZpPBnlYND6rY1GBy2ZWkEzOCOf1eY2TfUGjT5E0BkOCJ0fLMxUDAVVpQK7rAXNbuscGjNpAJK4CgaNxzaZKzTpoY4fDQmgsT~2CzY7P~fPknfrI5ucS5BP4r4NbqEZauk0UzGwWKQ__&Key-Pair-Id=K38HBHX5LX3X2H" />
        <meta property="og:url" content="https://app.v10d.com/tc?id=12345" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Landing Page for twitter" />
        <meta name="twitter:description" content="Teitter Welcome to our landing page. Watch the video and let us know your biggest challenges." />
        <meta name="twitter:image" content="https://app.v10d.com/tc?id=12345" />
      </Helmet>

      <Container maxWidth="xl">
        <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Title on page Welcome to Our Landing Page {id}
          </Typography>

          <VimeoEmbed embedId="969951929" />

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Let us know your biggest challenges:
            </Typography>

            <TextField
              select
              label="Select your challenges"
              SelectProps={{
                multiple: true,
                value: selectedChallenges,
                onChange: handleChallengeChange,
                renderValue: (selected) => selected.join(', '),
              }}
              fullWidth
              variant="outlined"
              margin="normal"
            >
              {challenges.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Email (optional)"
              type="email"
              fullWidth
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Submit and Get Additional Video
            </Button>
            
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default VideoLanding;