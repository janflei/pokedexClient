import React from 'react';
import Dashboard from './Dashboard';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { lightBlack, red, deepOrange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: lightBlack,
  },
  status: {
    danger: 'red',
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
