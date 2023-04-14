
import React, { createContext, useState, useEffect  } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './components/AuthContext/AuthContext';
import Home from './components/Home/Home';
import Product from './components/Product/Product';
import jwtDecode from 'jwt-decode';

import ResponsiveAppBar from './components/Topbar/ResponsiveAppBar';
import Subscription from './components/Subscription/Subscription';
import Help from './components/Help/Help';
import Setup from './components/Setup/Setup';
import LoginError from './components/LoginError/LoginError';
import MeetingMinder from './components/Meetingminder/MeetingMinder';
import OrderSuccess from './components/Order/Success';



function App() {

    // Check if a JWT token is stored in localStorage
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    // or, use localStorage
    // const storedJwtToken = localStorage.getItem('jwt');
  
    // Initialize the auth state based on the presence of a JWT token
    const [auth, setAuth] = useState(!!access_token);
  
    useEffect(() => {
      console.log("Render the App.js")
      const urlParams = new URLSearchParams(window.location.search);
      const myToken = JSON.parse(urlParams.get('tokens'));
  
      if (myToken) {
        console.log("We will register the stuffwe got? 123")
        console.log(myToken);

        localStorage.setItem('access_token', myToken.access_token);
        localStorage.setItem('refresh_token', myToken.refresh_token);
        localStorage.setItem('id_token', myToken.id_token);
  
        // Set the authentication state
        setAuth(true);

        // Setting Sub info
        const decodedToken = jwtDecode(myToken.access_token);
        localStorage.setItem('sub', decodedToken.sub);
        localStorage.setItem('groups', decodedToken['cognito:groups']);
        localStorage.setItem('email', myToken.email);


        console.log(decodedToken);

        // Remove the JWT token from the URL
        const newUrl = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, newUrl);
      }
    }, []);

    const handleLogout = () => {
      // do the logout logic here, e.g. clear the token from localStorage
      localStorage.removeItem('access_token');
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

          <Route path="/order/success" element={<OrderSuccess />} />



          <Route path="/loginerror" element={<LoginError />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

