import customFetch from '../customFetch';

async function createCustomerPortalSession() {
  const response = await customFetch(
    `https://api.v10d.com/auth/dsa/stripe/createCustomerPortalSession`,
    {
      method: 'POST',
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

export { createCustomerPortalSession /*, otherServiceCalls, ... */ };
