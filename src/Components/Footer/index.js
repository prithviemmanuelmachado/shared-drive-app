import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Toast from '../Toast';
import { createQuery } from '../APICaller';

const useStyles = makeStyles(theme => {
    return{
        footer: {
            borderTop: '3px solid',
            borderTopColor: theme.palette.primary.main,
            paddingLeft: 10,
            paddingRight: 10,
            top:'auto',
            bottom: 0
        },
        align: {
            width: '100%',
            display: 'flex',
            justifyContent: 'end',
            cursor: 'pointer'
        },
        modalStyle: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '4px solid',
            borderColor: theme.palette.primary.main,
            borderRadius: 10,
            padding: 20,
            background: '#ffffff',
            [theme.breakpoints.up('xs')]:{
                width: '90%'
            },
            [theme.breakpoints.up('lg')]:{
                width: '80%'
            },
            paddingBottom: 30
        },
        buttonContainer: {
            [theme.breakpoints.up('md')]:{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }
    }
});

function Footer(props){
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [toast, setToast] = useState({
        message: '',
        severity: 'error',
        isOpen: false,
        handleClose: () => {},
        timeout: 0
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const setErrorToast = (message) => {
        setToast({
            message: message,
            severity: 'error',
            handleClose: () => {setToast({
                message: '',
                severity: 'error',
                handleClose: () => {},
                isOpen: false,
                timeout: 0
            })},
            isOpen: true,
            timeout: 4000
        });
    };

    const setSuccessToast = (msg) => {
        setToast({
            message: msg,
            severity: 'primary',
            handleClose: () => {
                setToast({
                    message: '',
                    severity: 'primary',
                    handleClose: () => {},
                    isOpen: false,
                    timeout: 0
                });
            },
            isOpen: true,
            timeout: 4000
        });
    }

    const handleSend = () => {
        if(input === ''){
            setErrorToast('Please fill in a message to send to the admin');
        }
        else{
            createQuery((msg) => {
                setSuccessToast(msg);
                setInput('');
                handleClose();
            }, (msg) => {
                setErrorToast(msg);
            }, {body: input});
        }
    }

    return<>
        <Toast 
            handleClose = {toast.handleClose} 
            isOpen = {toast.isOpen}
            message = {toast.message}
            severity = {toast.severity} 
            timeout = {toast.timeout}/>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <div className={classes.modalStyle}>
                <Typography 
                    color='primary'
                    id="modal-title" 
                    variant="h6" 
                    component="h2">
                    Ask the Administrator
                </Typography>
                <Typography 
                    id="modal-description" 
                    sx={{ marginTop: 2 }}>
                    <Grid
                        container
                        spacing={1}>
                        <Grid
                            item
                            md={9} 
                            sm={12}
                            xs={12}
                            zeroMinWidth>
                            <TextField
                                className={classes.field}
                                hiddenLabel
                                fullWidth
                                onChange = {(e) => { setInput(e.target.value); } }
                                value = {input}
                                variant="outlined"/>
                        </Grid>
                        <Grid
                            className={classes.buttonContainer}
                            item
                            md={3} 
                            sm={12}
                            xs={12}
                            zeroMinWidth>
                            <Button
                                color='secondary'
                                onClick={handleSend}
                                startIcon={<SendOutlinedIcon/>}
                                variant='outlined'>
                                    SEND QUESTION
                            </Button>   
                        </Grid>
                    </Grid>
                </Typography>
            </div>
        </Modal>
        <AppBar
            position='fixed'
            className={classes.footer}
            color='white'>
                <div 
                    className={classes.align}
                    onClick={handleOpen}>
                    <Typography
                        color='secondary'
                        component='h2'
                        variant='subtitle1'>
                        Click here to contact administrator
                    </Typography>
                </div>
        </AppBar>
    </>
}

export default Footer;