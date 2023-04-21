import customFetch from '../../customFetch';

async function generateSummary(prompt, texts) {
  
  const body = {prompt: prompt, texts: texts}
  
  const response = await customFetch(
    `${process.env.REACT_APP_API_BASE_AUTH_DSA}/meeting/generateSummary`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }
  );

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to fetch user profile');
  }
}

// Add other service calls here

export { generateSummary /*, otherServiceCalls, ... */ };
