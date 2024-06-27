import customFetch from '../../customFetch';

async function getContactsByGroup(groupId) {
  
  
  
  const response = await customFetch(
    `${process.env.REACT_APP_API_BASE_AUTH_DSA}/contactsByGroup/${groupId}`,
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
    throw new Error('Failed to fetch groups');
  }
}

// Add other service calls here

export { getContactsByGroup /*, otherServiceCalls, ... */ };
