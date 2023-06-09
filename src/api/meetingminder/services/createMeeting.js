import customFetch from '../../customFetch';

async function CreateMeeting(textPayload, meetingTitle, meetingDate) {
  
  
  
  const response = await customFetch(
    `${process.env.REACT_APP_API_BASE_AUTH_STEPFUNCTION}/meeting`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message: textPayload.replace(/'/g, '\\'), meetingDate: meetingDate, meetingTitle: meetingTitle})
    }
  );

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to fetch user profile');
  }
}

// Add other service calls here

export { CreateMeeting /*, otherServiceCalls, ... */ };
