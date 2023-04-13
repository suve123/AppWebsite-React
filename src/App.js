
import React, { createContext, useState, useEffect  } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Product from './Product';
import ResponsiveAppBar from './ResponsiveAppBar';

import Subscription from './Subscription';
import Help from './Help';
import Setup from './Setup';
import LoginError from './LoginError';
import MeetingMinder from './MeetingMinder';
import jwtDecode from 'jwt-decode';


export const AuthContext = createContext(null);


function App() {



    // Check if a JWT token is stored in sessionStorage
    const storedJwtToken = sessionStorage.getItem('jwt');
    // or, use localStorage
    // const storedJwtToken = localStorage.getItem('jwt');
  
    // Initialize the auth state based on the presence of a JWT token
    const [auth, setAuth] = useState(!!storedJwtToken);
  
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const jwtToken = urlParams.get('jwt');
  
      if (jwtToken) {
        sessionStorage.setItem('jwt', jwtToken);
        // or, use localStorage
        // localStorage.setItem('jwt', jwtToken);
  
        // Set the authentication state
        setAuth(true);
        
        console.log(jwtToken);

        // Setting Sub info
        const decodedToken = jwtDecode(jwtToken);
        sessionStorage.setItem('sub', decodedToken.sub);
        sessionStorage.setItem('groups', decodedToken['cognito:groups']);

        console.log(decodedToken);

        // Remove the JWT token from the URL
        const newUrl = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, newUrl);
      }
    }, []);

    const handleLogout = () => {
      // do the logout logic here, e.g. clear the token from sessionStorage
      sessionStorage.removeItem('jwt');
      // set the auth state to false to redirect the user to the login page
      setAuth(false);
      console.log("Logging out the user. Unsetting Token. Now redirecting to Cognito Signout")
      // https://v10d-proxy1.ngrok.app
      // https://api.v10d.com/dsa
      
      let redirectUri = encodeURIComponent(`https://${process.env.REACT_APP_DSAAPI_URLPATH}/auth/v10dresponse/`)
      let signOutUrl = `https://oauth.v10d.com/logout?response_type=code&client_id=7g4ns3biqfljptpjdlpqsht97k&redirect_uri=${redirectUri}`
      window.location.assign(signOutUrl);
    };
    
    
  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <ResponsiveAppBar handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/meetingminder" element={<MeetingMinder />} />
          <Route path="/help" element={<Help />} />



          <Route path="/loginerror" element={<LoginError />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

