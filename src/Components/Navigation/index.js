import style from './style.module.css';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AltRouteOutlinedIcon from '@mui/icons-material/AltRouteOutlined';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    items: {
        width: '400px',
    
    }
});

function Navigation(props){
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const navigate = useNavigate();
    const classes =  useStyles();
    const {
        open,
        toggle
    } = props;
    const topMenuItems = isLoggedIn?[
        {
            name: 'Home',
            icon: <HomeOutlinedIcon
                    color='primary'
                    fontSize='medium'/>,
            onClick: () => {
                navigate('/');
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
                toggle();
            } 
        }
    ] : 
    [
        {
            name: 'Home',
            icon: <HomeOutlinedIcon
                    color='primary'
                    fontSize='medium'/>,
            onClick: () => {
                navigate('/');
                toggle();
            } 
        }
    ];
    const bottomMenuItems = isLoggedIn?[
        {
            name: 'Logout',
            icon: <LogoutOutlinedIcon
                    color='primary'
                    fontSize='medium'/>,
            onClick: () => {
                setIsLoggedIn(false)
            }
        },
        {
            name: 'Profile',
            icon: <AccountCircleOutlinedIcon
                    color='primary'
                    fontSize='medium'/>,
            onClick: () => {
                navigate('/profile');
                toggle();
            } 
        }

    ] :
    [
        {
            name: 'Login',
            icon: <LogoutOutlinedIcon
                    color='primary'
                    fontSize='medium'/>,
            onClick: () => {
                navigate('/login');
                toggle();
            } 
        }
    ];
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