import './App.css';
import Header from './Components/Header';
import { 
  createTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core';
import {
  indigo, 
  orange
} from '@material-ui/core/colors';
import { 
  Route, 
  Routes 
} from 'react-router-dom';
import Home from './Containers/Home';
import Signup from './Containers/Signup';
import Login from './Containers/Login';
import Box from '@material-ui/core/Box';
import Profile from './Containers/Profile';
import CreateRoute from './Containers/CreateRoute';
import Notifications from './Containers/Notifications';

const themes = createTheme({
  palette:{
    primary: indigo,
    secondary: orange
  },
  typography:{
    fontFamily: 'Yanone Kaffeesatz',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    fontSize: 25
  }
});

const useStyles = makeStyles((theme) => {
  return{
    toolbar: theme.mixins.toolbar
  }
});

function App() {
  const classes = useStyles();
  return <>
    <ThemeProvider theme={themes}>
      <Box>
        <Header></Header>
      </Box>
      <Box>
        <div className={classes.toolbar}></div>
        <Routes>
          <Route 
            element = {<Signup/>}
            exact path = '/signup'/>
          <Route
            element = {<Login/>} 
            exact path = '/login'/> 
          <Route
            element = {<Profile/>} 
            exact path = '/profile'/>
          <Route
            element = {<CreateRoute/>} 
            exact path = '/create-route'/>
          <Route
            element = {<Notifications/>} 
            exact path = '/notifications'/>
          <Route
            element = {<Home/>} 
            path = '/'/>
        </Routes>
      </Box> 
    </ThemeProvider>
  </>
}

export default App;
