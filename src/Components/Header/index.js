import style from './style.module.css';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core';
import Navigation from '../Navigation';

const useStyles = makeStyles({
    border: {
        borderBottom: '3px solid #3f51b5'
    },
    flexBox: {
        flex: 1
    }
});

function Header(props){
    const classes = useStyles();
    const [isMenuOpened, setMenuOpened] = React.useState(false);
    const openMenu = () => {
        setMenuOpened(true);
    };
    const closeMenu = () => {
        setMenuOpened(false);
    };

    return<>
        <AppBar
            className={classes.border}
            color='transparent'>
            <Toolbar>
                <Typography
                    className={classes.flexBox}
                    color='primary'
                    component= 'h1'
                    variant = 'h5'
                >
                    Shared Drive
                </Typography>
                <Button
                    onClick={openMenu} 
                    color='primary'>
                        <Menu/>
                </Button>
            </Toolbar>
        </AppBar>
        <Navigation 
            open = {isMenuOpened}
            toggle = {closeMenu}/>
    </>
}

export default Header;
