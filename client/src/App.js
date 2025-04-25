import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './pages/Dashboard';
import Meditation from './pages/Meditation';
import Habits from './pages/Habits';
import Tasks from './pages/Tasks';
import Auth from './pages/Auth';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4e73df',
    },
    secondary: {
      main: '#1cc88a',
    },
    background: {
      default: '#f8f9fc',
    },
  },
  typography: {
    fontFamily: '"Nunito", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/meditation" component={Meditation} />
          <PrivateRoute path="/habits" component={Habits} />
          <PrivateRoute path="/tasks" component={Tasks} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
