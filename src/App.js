import React from 'react';
import Dashboard from './Dashboard';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { lightBlack, deepOrange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: lightBlack,
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Dashboard></Dashboard>
    </MuiThemeProvider>
  );
}

export default App;
