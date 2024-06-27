import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/Topbar/ResponsiveAppBar';
//import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackText, setSnackText] = useState('');
  const [tokens, setTokens] = useState({ access_token: null, refresh_token: null });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const access_token = localStorage.getItem('access_token');
      const refresh_token = localStorage.getItem('refresh_token');
      setTokens({ access_token, refresh_token }); 
    }
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
  };

  return (
    <>
      {pageProps.showAppBar && (
        <ResponsiveAppBar
          handleLogout={handleLogout}
          snackOpen={snackOpen}
          setSnackOpen={setSnackOpen}
          snackText={snackText}
          setSnackText={setSnackText}
        />
      )}
      <Component
        {...pageProps}
        handleLogout={handleLogout}
        snackOpen={snackOpen}
        setSnackOpen={setSnackOpen}
        snackText={snackText}
        setSnackText={setSnackText}
        tokens={tokens}
      />
    </>
  );
}

export default MyApp;
