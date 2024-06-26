import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import { Button, Typography, Snackbar, Alert } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link'; // Import Next.js Link component
import Image from 'next/image';

function ResponsiveAppBar({ handleLogout, snackOpen, setSnackOpen, snackText, setSnackText }) {
  const auth = useContext(AuthContext);

  const pages = ['Home', 'Products', 'Subscription', 'Assistant', 'Setup', 'Video', 'Meetingminder', 'Help'];

  const settings = [
    { text: 'Logout', link: '', onClick: handleLogout },
    { text: 'Settings', link: 'setup', onClick: null },
    { text: 'Help', link: 'help', onClick: null },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let redirectUri = encodeURIComponent(`https://${process.env.NEXT_PUBLIC_DSAAPI_URLPATH}/auth/v10dresponse`);

  const handleClick = () => {
    setSnackOpen(true);
  };

  const handleClose = (event, reason) => {
    console.log('Close click', reason);
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  let position = { vertical: 'top', horizontal: 'center' };

  return (
    <Box>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose} anchorOrigin={position}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {snackText}
        </Alert>
      </Snackbar>

      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
          <Image src="/images/v10d-logo.png" alt="Logo" width={50} height={40} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              &nbsp;Control HUB&nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link href={`/${page.toLowerCase()}`} passHref>
                      <Typography textAlign="center">{page}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link key={page} href={`/${page.toLowerCase()}`} passHref>
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

            {auth ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="U" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting.onClick) {
                          setting.onClick();
                        }
                      }}
                    >
                      <Link href={`/${setting.link.toLowerCase()}`} passHref>
                        <Typography textAlign="center">{setting.text}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Typography>
                <a
                  href={`https://oauth.v10d.com/login?response_type=code&client_id=7g4ns3biqfljptpjdlpqsht97k&redirect_uri=${redirectUri}`}
                  style={{ color: '#FFF' }}
                >
                  Login/SignUp
                </a>
              </Typography>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default ResponsiveAppBar;
