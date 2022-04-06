import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AltRouteOutlinedIcon from '@mui/icons-material/AltRouteOutlined';
import React, { useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie/es6';
import AddBoxOutlined from '@mui/icons-material/AddBoxOutlined';
import { isAdminLoggedIn } from '../APICaller';

const useStyles = makeStyles({
    items: {
        width: '400px'
    }
});

const cookies = new Cookies();
let loggedInStatus = false;
let isAdmin = false;
export function setIsAdmin(status){
    isAdmin = status;
}
export function setLoggedInStatus(status){
    loggedInStatus = status;
}

function Navigation(props){
    const navigate = useNavigate();
    const logout = () => {
        toggle();
        cookies.remove('jwt');
        setIsAdmin(false);
        setLoggedInStatus(false);
        navigate('/');
        window.location.reload();
    };
    isAdminLoggedIn((status) => {setIsAdmin(status)}, () => {logout();});

    const doesTokenExist = cookies.get('jwt')? true: false;
    if(doesTokenExist != loggedInStatus)
        setLoggedInStatus(doesTokenExist);

    
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    useEffect(() => {
        setIsLoggedIn(loggedInStatus);
    } , [loggedInStatus]);
    const classes =  useStyles();
    const {
        open,
        toggle
    } = props;
    let topMenuItems;
    let bottomMenuItems;
    if(isLoggedIn){
        if(isAdmin){
            topMenuItems = [
                {
                    name: 'Home',
                    icon: <HomeOutlinedIcon
                            color='primary'
                            fontSize='medium'/>,
                    onClick: () => {
                        navigate('/admin/home');
                        toggle();
                    } 
                },
                {
                    name: 'Additional Information',
                    icon: <AddBoxOutlined
                            color='primary'
                            fontSize='medium'/>,
                    onClick: () => {
                        navigate('/admin/additional-information');
                        toggle();
                    } 
                }
            ];
            bottomMenuItems = [
                {
                    name: 'Logout',
                    icon: <LogoutOutlinedIcon
                            color='primary'
                            fontSize='medium'/>,
                    onClick: () => {
                        logout();
                    }
                }
            ];
        }
        else{
            topMenuItems = [
                {
                    name: 'Home',
                    icon: <HomeOutlinedIcon
                            color='primary'
                            fontSize='medium'/>,
                    onClick: () => {
                        navigate('/');
                        window.location.reload(false);
                        toggle();
                    } 
                },
                {
                    name: 'Notifications',
                    icon: <NotificationsNoneOutlinedIcon
                            color='primary'
                            fontSize='medium'/>,
                    onClick: () => {
                        navigate('/notifications');
                        window.location.reload();
                        toggle();
                    } 
                },
                {
                    name: 'Create Route',
                    icon: <AltRouteOutlinedIcon
                            color='primary'
                            fontSize='medium'/>,
                    onClick: () => {
                        navigate('/create-route');
                        window.location.reload();
                        toggle();
                    } 
                }
            ];
            bottomMenuItems = [
                {
                    name: 'Profile',
                    icon: <AccountCircleOutlinedIcon
                            color='primary'
                            fontSize='medium'/>,
                    onClick: () => {
                        navigate('/profile');
                        toggle();
                    } 
                },
                {
                    name: 'Logout',
                    icon: <LogoutOutlinedIcon
                            color='primary'
                            fontSize='medium'/>,
                    onClick: () => {
                        logout();
                    }
                }
                
            ];
        }
    }
    else{
        topMenuItems = [
            {
                name: 'Home',
                icon: <HomeOutlinedIcon
                        color='primary'
                        fontSize='medium'/>,
                onClick: () => {
                    navigate('/');
                    window.location.reload(false);
                    toggle();
                } 
            }
        ];
        bottomMenuItems = [
            {
                name: 'Login',
                icon: <LoginOutlinedIcon
                        color='primary'
                        fontSize='medium'/>,
                onClick: () => {
                    navigate('/login');
                    toggle();
                } 
            }
        ];
    }
    
    return<>
        <Drawer
            anchor={'right'}
            open={open}
            onClose={toggle}>
              <Box
                className={classes.items}>
                  <List>
                      {topMenuItems.map(item =>(
                          <ListItem 
                          button
                          onClick={item.onClick}
                          key={item.name}>
                              <ListItemIcon>
                                  {item.icon}
                              </ListItemIcon>
                              <ListItemText
                                  disableTypography 
                                  primary={
                                  <Typography
                                      color='primary'
                                      component='h2'
                                      variant='h6'>
                                      {item.name}                                  
                                    </Typography>
                                  }/>
                        </ListItem>
                      ))}
                  </List>
                  <Divider/>
                  <List>
                        {bottomMenuItems.map(item =>(
                          <ListItem 
                          button
                          onClick={item.onClick}
                          key={item.name}>
                              <ListItemIcon>
                                  {item.icon}
                              </ListItemIcon>
                              <ListItemText
                                  disableTypography 
                                  primary={
                                  <Typography
                                      color='primary'
                                      component='h2'
                                      variant='h6'>
                                      {item.name}                                  
                                    </Typography>
                                  }/>
                            </ListItem>
                        ))}
                  </List>
                  
              </Box>  
        </Drawer>
    </>
}

export default Navigation;