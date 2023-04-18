async function customFetch(url, options = {}) {
    const accessToken = localStorage.getItem('access_token');
  
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
  
    try {
      const response = await fetch(url, options);
      console.log(`fetched from: ${url}`)
      //console.log(response.data)

      if (response.status === 401) {
        console.log("API request went wrong. We got a 401.")
        const refreshToken = localStorage.getItem('refresh_token');
    
        if (refreshToken) {
          const newAccessToken = await refreshAccessToken(refreshToken);
    
          if (newAccessToken) {
            localStorage.setItem('access_token', newAccessToken);
            options.headers.Authorization = `Bearer ${newAccessToken}`;
    
            // Retry the request with the new access token
            console.log(`!!!!!!!!!!!!!!!!!RE fetching from: ${url}`)
            return fetch(url, options);

          }
        }
      }
  
      return response;
    
    } catch (error) {
      console.error(error)    
    }
    
  }
  
  async function refreshAccessToken(refreshToken) {
    // Call your API to refresh the access token
    // You'll need to replace this part with your actual refresh token API call
    const url = `https://oauth.v10d.com/oauth2/token`

    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'refresh_token');
    requestBody.append('client_id', process.env.REACT_APP_COGNITO_CLIENT_ID);
    requestBody.append('refresh_token', refreshToken);
    


    //console.log(process.env.REACT_APP_COGNITO_CLIENT_ID)
    //console.log(refreshToken)

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: requestBody,
          });
        
          if (response.ok) {
            const data = await response.json();
            console.log("Got a refreshed token back")
            //console.log(data)
            return data.access_token;
          } else {
            console.error(response)
            throw new Error(`Failed to refresh tokens: ${response.status}`);
          }

    } catch (error) {
        console.error(error)
        console.error(error.message)
    }
    
      
    /*

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
  
    const data = await response.json();
    return data.access_token;
    */
  }
  
  export default customFetch;
  