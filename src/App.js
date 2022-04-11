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
import AdminLogin from './Containers/Admin/Login';
import AdditionalInformation from './Containers/Admin/AdditionalInformation';
import AdminHome from './Containers/Admin/AdminHome';
import UpdateProfile from './Containers/UpdateProfile';
import Footer from './Components/Footer';

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
    toolbar: theme.mixins.toolbar,
    App: {
      position: 'relative'
    }
  }
});

function App() {
  const classes = useStyles();
  return <>
    <div className={classes.App}>
      <ThemeProvider theme={themes}>
        <Box>
          <Header></Header>
        </Box>
        <Box>
          <div className={classes.toolbar}></div>
          <Routes>
            <Route
              element = {<AdminLogin/>}
              exact path='/admin/login'/>
            <Route
              element = {<AdditionalInformation/>}
              exact path='/admin/additional-information'/>
            <Route
              element = {<AdminHome/>}
              exact path='/admin/home'/>
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
              element = {<UpdateProfile/>}
              exact path='/update-profile'/>
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
          <div className={classes.toolbar}></div>
        </Box>
        <Box>
          <Footer></Footer>
        </Box> 
      </ThemeProvider>
    </div>
  </>
}

export default App;
