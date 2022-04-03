import { useEffect, useState } from "react";
import { getNotifications } from "../../Components/APICaller";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Toast from "../../Components/Toast";
import Loader from "../../Components/Loader";
import RequestNotification from "../../Components/RequestNotification";

const useStyle = makeStyles(theme => {
    return{
        cardWidth:{
            margin: 'auto',
            marginTop: 30,
            [theme.breakpoints.up('md')]:{
                width: '90%'
            },
            [theme.breakpoints.up('lg')]:{
                width: '85%'
            },
            display: 'flex',
            flexDirection: 'column',
            minHeight: '70vh',
            justifyContent: 'center'
        },
        noNotifications: {
            alignSelf: 'center'
        }
    } 
});

function Notifications(props)
{
    const classes = useStyle();
    const [notifications, setNotifications] = useState([]);
    const [toast, setToast] = useState({
        message: '',
        severity: 'error',
        isOpen: false,
        handleClose: () => {},
        timeout: 0
    });
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        getNotifications((data) => {
            setIsLoading(false);
            setNotifications(data);
        }, (msg)=> {
            setIsLoading(false);
            setErrorToast(msg);
        })
    }, []);

    return<>
        <Grid
            className={classes.cardWidth}
            container>
            {
                notifications.length === 0? 
                <div className={classes.noNotifications}>
                    <Typography
                        color='primary'
                        component='h2'
                        variant='h6'>
                        No Notifications
                    </Typography>
                </div>:
                <>
                    {
                        notifications.map((ele, index) => {
                            if(ele.type === 'request')
                            {
                                return <>
                                    <RequestNotification data={ele}/>
                                </>
                            }
                        })
                    }
                </>
            }
        </Grid>
        <Loader isLoading = {isLoading}/>
        <Toast 
            handleClose = {toast.handleClose} 
            isOpen = {toast.isOpen}
            message = {toast.message}
            severity = {toast.severity} 
            timeout = {toast.timeout}/>
    </>
}

export default Notifications;