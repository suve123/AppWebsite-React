const withTM = require('next-transpile-modules')([
  '@mui/material',
  '@mui/system',
  '@mui/icons-material',
  '@mui/x-date-pickers', // Add the package here
  // Add any other modules that need to be transpiled
]);

module.exports = withTM({
  reactStrictMode: true,
  // Any other Next.js configuration options
  
});

