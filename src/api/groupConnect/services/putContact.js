import customFetch from '../../customFetch';

async function putContact(contactId, contact) {
  
  
  
  const response = await customFetch(
    `${process.env.REACT_APP_API_BASE_AUTH_DSA}/contact/${contactId}`,
    {
      method: 'PUT',
      // Add body to payload
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to fetch groups');
  }
}

// Add other service calls here

export { putContact /*, otherServiceCalls, ... */ };
