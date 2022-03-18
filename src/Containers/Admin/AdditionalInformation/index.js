import Toast from "../../../Components/Toast";
import Loader from "../../../Components/Loader";
import { 
    getListOfAdditionalInformation, 
    deleteInformationBasedOnID 
} from "../../../Components/APICaller";
import { useEffect } from "react";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TextField from "@material-ui/core/TextField";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { createAdditionalInformation } from "../../../Components/APICaller";

const useStyle = makeStyles(theme => {
    return {
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
        row: {
            marginBottom: 20,
            [theme.breakpoints.down('xs')]: {
                marginBottom: 30, 
            }
        },
        script: {
            overflowWrap: 'break-word'
        },
        center: {
            [theme.breakpoints.up('sm')]: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }
            
        },
        verticalCenter: {
            display: 'flex',
            alignItems: 'center'
        }
    }
});

function AdditionalInformation(props){
    const classes = useStyle();
    const [toast, setToast] = React.useState({
        message: '',
        severity: 'error',
        isOpen: false,
        handleClose: () => {},
        timeout: 0
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const [information, setInformation] = React.useState([]);
    const [input, setInput] = React.useState('');
    const [flip, setflip] = React.useState(true);

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

    const handleDelete = e => {
        const id = e.currentTarget.id;
        setIsLoading(true);
        deleteInformationBasedOnID( (msg) => {
            setInput('');
            setIsLoading(false);
            setToast({
                message: msg,
                severity: 'primary',
                handleClose: () => {
                    setIsLoading(false);
                    setflip(!flip);
                    setToast({
                        message: '',
                        severity: 'primary',
                        handleClose: () => {},
                        isOpen: false,
                        timeout: 0
                    })
                },
                isOpen: true,
                timeout: 1000
            });
        },
        (msg) => {
            setIsLoading(false);
            setErrorToast(msg);
        }, id);
    };

    const saveInfo = () => {
        if(input === ''){
            setErrorToast('Please fill the field to create entry');
        }
        else{
            setIsLoading(true);
            createAdditionalInformation( () => {
                setInput('');
                setIsLoading(false);
                setToast({
                    message: 'Entry created',
                    severity: 'primary',
                    handleClose: () => {
                        setIsLoading(false);
                        setflip(!flip);
                        setToast({
                            message: '',
                            severity: 'primary',
                            handleClose: () => {},
                            isOpen: false,
                            timeout: 0
                        })
                    },
                    isOpen: true,
                    timeout: 1000
                });
            },
            (msg) => {
                setIsLoading(false);
                setErrorToast(msg);
            }, input);
        }
        
    };

    useEffect(() => {
        getListOfAdditionalInformation((list) => {
            setIsLoading(false);
            setInformation(list);
        }, (msg) => {
            setIsLoading(false);
            setErrorToast(msg);
        });
    }, [flip]);

    return<>
        <Grid className={classes.container}>
            <Typography
                color='primary'
                component='h2'
                variant='h6'>
                Additional Information
            </Typography>
        </Grid>
        <Grid className={classes.container}>
            <Grid
                className={classes.row} 
                container
                spacing={1}>
                <Grid
                    item 
                    sm={10}
                    xs={12}
                    zeroMinWidth> 
                    <TextField
                        hiddenLabel
                        fullWidth
                        onChange = {(e) => { setInput(e.target.value); } }
                        value = {input}
                        variant="outlined"/>
                </Grid>
                <Grid
                    className = {classes.center}
                    item 
                    sm={2}
                    xs={12}
                    zeroMinWidth> 
                    <Button
                        color='secondary'
                        onClick={saveInfo}
                        startIcon={<SaveOutlinedIcon color='Secondary'/>}
                        variant='outlined'>
                            SAVE
                    </Button>
                </Grid>
            </Grid>
        </Grid>
        <Grid className={classes.container}>
            {
                information.map((element, index) => {
                    return<>
                        <Grid
                            className={classes.row} 
                            container
                            spacing = {1}>
                            <Grid
                                className = {classes.verticalCenter}
                                item 
                                sm = {10}
                                xs = {12}
                                zeroMinWidth> 
                                <Typography className = {classes.script}>{element.additionalInformation}</Typography>
                            </Grid>
                            <Grid
                                className = {classes.center}
                                item
                                sm={2}
                                xs={12}
                                zeroMinWidth> 
                                <Button
                                    color = 'primary'
                                    id = {element._id}
                                    onClick = {handleDelete}
                                    startIcon = {<CloseOutlinedIcon color='Primary'/>}
                                    variant = 'outlined'>
                                        DELETE
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                })
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

export default AdditionalInformation;