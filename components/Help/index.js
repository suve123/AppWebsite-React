
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import {StepContent, Paper, Card, CardMedia, CardContent, CardActions, Button, Container,Typography,Box} from '@mui/material';

import YoutubeEmbed from "../YoutubeEmbedd";

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const steps = [
  {
  label: 'Register a V10d account',
  description: 'Sign up for an account at app.v10d.com. This account will serve as your profile for all V10d products and services.',
  },
  {
  label: 'Try/Purchase a product',
  description:
  'Visit the product page to select the product you\'d like to try or buy. Complete the order and provide a payment method. You can cancel your subscription anytime. If you cancel before the trial period ends, you won\'t be charged and can continue using the product until the trial ends. You can also cancel your subscription to stop it at the end of your current billing period, ensuring no further charges and access to the product until the end of the period.',
  },
  {
    label: 'Access your Digital Assistant',
    description: 'Once you\'ve ordered a product, your Digital Assistant will be available immediately. Choose the platform you\'d like to interact with your Digital Assistant through. Options include the app.v10d.com website, where your Assistant can be found in the menu, or instant messaging platforms like Facebook Messenger or WhatsApp, providing seamless integration with your daily communications.',
    },
    {
      label: 'Communicate with your assistant',
      description: 'Begin using your Digital Assistant by asking questions, assigning tasks, or setting reminders. As you communicate with your assistant, you\'ll discover its wide range of capabilities and learn how it can help you manage various aspects of your daily life, such as scheduling appointments, sending messages, or retrieving information.',
      },

    {
        label: 'Personalize',
        description: 'In the Setup section at app.v10d.com, you can customize your Digital Assistant to better suit your needs and preferences. Adjust settings such as your assistant\'s response style, language, or notification preferences to create a more tailored experience. The Setup section also provides ideas and suggestions for useful configurations that ensure your assistant responds in a way that meets your expectations and enhances your productivity.',
        },
  {
  label: 'Grant access to your data',
  description: 'From the setup and configuration section, you can allow your assistant to access more of your data, such as emails, appointments, and other online resources that we integrate with. Granting access will enable your assistant to utilize the full power of its capabilities while being informed about your recent communications, appointments, and notes.',
  },
  
  ];



function Component() {

  const auth = useContext(AuthContext);


  const [data, setData] = useState(null);
  
  console.log("Rendering Help")

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };




  return (
    <Box>
      
      <Container maxWidth="xl">
        <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
          {/* Your main content goes here */}
          <Typography variant="h4" component="h1" gutterBottom>

          Information about V10d Saas Products
          </Typography>
              <>
                <Typography variant="h5" component="h1" gutterBottom>

                How to get started
                </Typography>
                <Box sx={{ maxWidth: 600 }}>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                      <Step key={step.label}>
                        <StepLabel
                          optional={
                            index === 2 ? (
                              <Typography variant="caption">Last step</Typography>
                            ) : null
                          }
                        >
                          {step.label}
                        </StepLabel>
                        <StepContent>
                          <Typography>{step.description}</Typography>
                          <Box sx={{ mb: 2 }}>
                            <div>
                              <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 1, mr: 1 }}
                              >
                                {index === steps.length - 1 ? 'Finish' : 'Continue'}
                              </Button>
                              <Button
                                disabled={index === 0}
                                onClick={handleBack}
                                sx={{ mt: 1, mr: 1 }}
                              >
                                Back
                              </Button>
                            </div>
                          </Box>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                  {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                      <Typography>All steps completed - you&apos;re finished</Typography>
                      <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                      </Button>
                    </Paper>
                  )}
                </Box>


                <Typography variant="h5" component="h1" gutterBottom>

                <br />
              </Typography>
              <div className="App">
                    <h1>Learn about MeetingMinder:</h1>
                    <YoutubeEmbed embedId="omk0i4r4N90" />
                  </div>
                  <br /><br />
                <Box sx={{ float: 'left', marginRight: '10px', marginBottom: '10px' }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image="/images/padlock.jpg"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      Secure, Privacy-Focused AI Assistance
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      At V10d, we deliver top-notch services while prioritizing data protection and privacy through our adherence to GDPR and a strong security infrastructure.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => window.open('https://www.v10d.com/principles', '_blank', 'noopener,noreferrer')}>Our Commitment</Button>
                    </CardActions>
                  </Card>
                </Box>

                <Box sx={{ float: 'left', marginRight: '10px', marginBottom: '10px' }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image="/images/privpol.jpg"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      Discover V10d's Privacy Policy
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      Understand V10d's commitment to protecting your data and privacy by examining our comprehensive Privacy Policy.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => window.open('https://www.v10d.com/privacy-policy', '_blank', 'noopener,noreferrer')}>Privacy Policy</Button>
                    </CardActions>
                  </Card>
                </Box>

                <Box sx={{ float: 'left', marginRight: '10px', marginBottom: '10px' }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image="/images/regulations.jpg"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      Learn About Our Terms of Use
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      Familiarize yourself with the rules and conditions that govern our services by reviewing V10d's detailed Terms of Use.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => window.open('https://www.v10d.com/terms-of-use', '_blank', 'noopener,noreferrer')}>Terms and Conditions</Button>
  
                    </CardActions>
                  </Card>
                </Box>

              </>
            
        </Box>
      </Container>
    </Box>
    
  );


}




export default Component;