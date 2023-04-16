import customFetch from '../../customFetch';

async function getAllMeetings() {
  const userid = `c873f069-3131-4d12-b648-644bac4344fc`
  const response = await customFetch(
    `https://api.v10d.com/auth/dsa/meetings?&userId=${userid}`,
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

export { getAllMeetings /*, otherServiceCalls, ... */ };
