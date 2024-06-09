import customFetch from '../customFetch';

async function getSetup() {
  const response = await customFetch(
    `${process.env.REACT_APP_API_BASE_AUTH_DSA}/setup`,
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
    throw new Error('Failed to fetch user setup');
  }
}

// Add other service calls here
async function updateSetup(add = null, remove = null) {
  const response = await customFetch(
    `${process.env.REACT_APP_API_BASE_AUTH_DSA}/setup?` + (add ? `add=${add}` : `remove=${remove}`),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to fetch user setup');
  }
}

export { getSetup , updateSetup };
