import customFetch from '../../customFetch';

async function getMeeting(arn) {
  
  
  
  const response = await customFetch(
    `${process.env.REACT_APP_API_BASE_AUTH_DSA}/meeting/${arn}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to fetch user profile');
  }
}

// Add other service calls here

export { getMeeting /*, otherServiceCalls, ... */ };
