import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProfile } from "../../Components/APICaller";
import Loader from "../../Components/Loader";
import Toast from "../../Components/Toast";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const useStyle = makeStyles(theme => {
    return {
        buttonContainer:{
            display: 'flex',
            justifyContent: 'flex-end'
        },
        container: {
            margin: 10,
            [theme.breakpoints.up('sm')]: {
                marginLeft: 50,
                marginRight: 50,
            },
            [theme.breakpoints.up('lg')]: {
                marginLeft: 100,
                marginRight: 100,
            }
            
        },
        containerBorder: {
            border: '2px solid',
            borderColor: theme.palette.primary.main,
            borderRadius: 5,
            padding: 15
        },
        row: {
            marginBottom: 20,
            [theme.breakpoints.down('xs')]: {
                marginBottom: 30, 
            }
        },
        script: {
            overflowWrap: 'break-word'
        }
    }
});

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

function Profile(props)
{
    const query = useQuery();
    const user = query.get("user");
    const classes = useStyle();
    const [isLoading, setIsLoading] = React.useState(true);
    const [toast, setToast] = React.useState({
        message: '',
        severity: 'error',
        isOpen: false,
        handleClose: () => {},
        timeout: 0
    });
    const [data, setData] = React.useState({
        isSelf: false,
        user: {
            username: '',
            firstName: '',
            lastName: '',
            contactNumber: '',
            email: '',
            additionalInformation: []
        }
    });
    const [button, setButton] = React.useState(); 

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

    const handleEdit = () => {
        console.log('goto edit');
    };

    useEffect(() => {
        getProfile((profile) => {
            setIsLoading(false);
            setData(profile);
            if(profile.isSelf === true){
                setButton(<Button
                    color='secondary'
                    onClick={handleEdit}
                    startIcon={<EditOutlinedIcon color='Secondary'/>}
                    variant='outlined'>
                    EDIT
                </Button>);
            }
        }, (msg) => {
            setIsLoading(false);
            setErrorToast(msg);
        }, user);
    }, [user]);
    
    
    return<>
        <Loader isLoading = {isLoading}/>
        <Toast 
            handleClose = {toast.handleClose} 
            isOpen = {toast.isOpen}
            message = {toast.message}
            severity = {toast.severity} 
            timeout = {toast.timeout}/>
        <div className={classes.container +' '+ classes.buttonContainer}>
            {button}
        </div>
        <div className={classes.container + ' ' + classes.containerBorder}>
            <Grid
                className={classes.row} 
                container
                spacing={1}>
                <Grid
                    item 
                    sm={4}
                    xs={12}
                    zeroMinWidth> 
                    <Typography className = {classes.script}>Username</Typography>
                </Grid>
                <Grid
                    item 
                    sm={8}
                    xs={12}
                    zeroMinWidth> 
                    <Typography className = {classes.script}>{data.user.username}</Typography>
                </Grid>
            </Grid>
            <Grid
                className={classes.row} 
                container
                spacing={1}>
                <Grid
                    item 
                    sm={4}
                    xs={12}
                    zeroMinWidth> 
                    <Typography className = {classes.script}>First Name</Typography>
                </Grid>
                <Grid
                    item 
                    sm={8}
                    xs={12}
                    zeroMinWidth> 
                    <Typography className = {classes.script}>{data.user.firstName}</Typography>
                </Grid>
            </Grid>
            <Grid
                className={classes.row} 
                container
                spacing={1}>
                <Grid
                    item 
                    sm={4}
                    xs={12}
                    zeroMinWidth> 
                    <Typography className = {classes.script}>Last Name</Typography>
                </Grid>
                <Grid
                    item 
                    sm={8}
                    xs={12}
                    zeroMinWidth> 
                    <Typography className = {classes.script}>{data.user.lastName}</Typography>
                </Grid>
            </Grid>
            <Grid
                className={classes.row} 
                container
                spacing={1}>
                <Grid
                    item 
                    sm={4}
                    xs={12}
                    zeroMinWidth> 
                    <Typography className = {classes.script}>Email</Typography>
                </Grid>
                <Grid
                    item 
                    sm={8}
                    xs={12}
                    zeroMinWidth> 
                    <Typography className = {classes.script}>{data.user.email}</Typography>
                </Grid>
            </Grid>
            <Grid
                className={classes.row} 
                container
                spacing={1}>
                <Grid
                    item 
                    sm={4}
                    xs={12}
                    zeroMinWidth> 
                    <Typography className = {classes.script}>Contact Number</Typography>
                </Grid>
                <Grid
                    item 
                    sm={8}
                    xs={12}
                    zeroMinWidth> 
                    <Typography className = {classes.script}>{data.user.contactNumber}</Typography>
                </Grid>
            </Grid>
            {
                data.user.additionalInformation.map((element, index) => {
                    return<>
                        <Grid
                            className={classes.row} 
                            container
                            key={index}
                            spacing={1}>
                            <Grid
                                item 
                                sm={4}
                                xs={12}
                                zeroMinWidth> 
                                <Typography className = {classes.script}>{element.key}</Typography>
                            </Grid>
                            <Grid
                                item 
                                sm={8}
                                xs={12}
                                zeroMinWidth> 
                                <Typography className = {classes.script}>{element.value}</Typography>
                            </Grid>
                        </Grid>
                    </>
                })
            }
        </div>
    </>
}

export default Profile;