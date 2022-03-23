import { 
    updateProfile, 
    getProfile,
    getListOfAdditionalInformation,
    updateProfileAddInformation
} from "../../Components/APICaller";
import FormRegular from "../../Components/FormRegular";
import Toast from "../../Components/Toast";
import Loader from "../../Components/Loader";
import React from "react";
import { useEffect } from "react";
import SendOutlined from "@mui/icons-material/SendOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const useStyle = makeStyles(theme => {
    return {
        row: {
            marginBottom: 20,
            [theme.breakpoints.down('xs')]: {
                marginBottom: 30, 
            }
        },
        center: {
            [theme.breakpoints.up('sm')]: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }
            
        },
        footer:{
            padding: 20,
            display: 'flex',
            justifyContent: "flex-end"
        },
        cardWidth:{
            margin: 'auto',
            marginTop: 30,
            [theme.breakpoints.up('md')]:{
                width: '90%'
            },
            [theme.breakpoints.up('lg')]:{
                width: '75%'
            }
        },
        field: {
            marginTop: 10,
            marginBottom: 10,
            display: 'block'
        },
    }
});

function UpdateProfile(props){
    const navigate = useNavigate();
    const classes = useStyle();
    const [input, setInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    const [toast, setToast] = React.useState({
        message: '',
        severity: 'error',
        isOpen: false,
        handleClose: () => {},
        timeout: 0
    });
    const [profile, setProfile] = React.useState({
        "username": "",
        "contactNumber": "",
        "email": "",
        "firstName": "",
        "lastName": "",
        "additionalInformation": []
    });
    const [displayData, setDisplayData] = React.useState([]);
    const [information, setInformation] = React.useState([]);
    const [flip, setFlip] = React.useState(false);
    const [sInformation, setSInformation] = React.useState('');
    let data = [];

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
            timeout: 1000
        });
    }

    const caseChange = (key) => {
        let text = key;
        let result = text.replace( /([A-Z])/g, " $1" );
        let label = result.charAt(0).toUpperCase() + result.slice(1);
        return label;
    }

    useEffect(() => {
        getProfile((iProfile) => {
            setProfile(iProfile.user);
            setIsLoading(true);
            getListOfAdditionalInformation((list) => {
                setIsLoading(false);
                setInformation(list);
            }, (msg) => {
                setIsLoading(false);
                setErrorToast(msg);
            });
        }, (msg) => {
            setIsLoading(false);
            setErrorToast(msg);
        }, null);
    }, [flip]);

    useEffect(() => {
        for(const [key, kValue] of Object.entries(profile)){
            let label = caseChange(key)
            if(key === 'additionalInformation'){
                kValue.forEach((item, index) => {
                    data.push({
                        text: profile[key][index].key,
                        onChange: (e) => {
                            profile[key][index].value = e.target.value;
                            setProfile({...profile});
                        },
                        value: profile[key][index].value,
                        type: 'text'
                    });
                });
            }
            else{
                data.push({
                    text: label,
                    onChange: (e) => {
                        profile[key] = e.target.value;
                        setProfile({...profile});
                    },
                    value: profile[key],
                    type: 'text'
                });
            }
        }
        setDisplayData(data);
        setIsLoading(false);
    }, [profile]);

    const handleSave = () => {
        let flag = false;
        profile.additionalInformation.forEach((item, index) => {
            if(item.key === sInformation)
            {
                flag = true;
            }
        });

        if(sInformation === ''){
            setErrorToast('Please select addtional information category');
        }
        else if(flag){
            setErrorToast('Category is already saved');
        }
        else if(input === ''){
            setErrorToast('Fields cannot be empty');
        }
        else{
            const newInfo = {
                key: sInformation,
                value: input
            };
            setIsLoading(true);
            updateProfileAddInformation((msg) => {
                setIsLoading(false);
                setInput('');
                setSInformation('');
                setFlip(!flip);
                setSuccessToast(msg);
            }, (msg) => {
                setIsLoading(false);
                setErrorToast(msg);
            }, newInfo);
        }
    };

    const handleInformationChange = (e) => {
        setSInformation(e.target.value);
    }

    const header = 'Update Profile';
    const body = displayData;
    const footerButton = [
        {
            action: () => {
                setIsLoading(true);
                updateProfile((msg) => {
                    setIsLoading(false);
                    setSuccessToast(msg);
                    setFlip(!flip);
                }, (msg) => {
                    setIsLoading(false);
                    setErrorToast(msg);
                }, profile);
            },
            icon: <SendOutlined color='Secondary'/>,
            text: 'UPDATE',
        },
        {
            action: () => {
                navigate('/profile');
            },
            icon:<ArrowBackIosNewOutlinedIcon color='Secondary'/>,
            text: 'BACK'
        }
    ];
    const footerLink = '';
    const headerButton = [];
    return<>
        <Loader isLoading = {isLoading}/>
        <Toast 
            handleClose = {toast.handleClose} 
            isOpen = {toast.isOpen}
            message = {toast.message}
            severity = {toast.severity} 
            timeout = {toast.timeout}/>
        <FormRegular
            body={body}
            footerButton={footerButton}
            footerLink={footerLink}
            header={header}
            headerButton={headerButton}/>
        <Card
            className={classes.cardWidth}
            variant='outlined'>
            <CardContent>
                <Grid>
                    <Grid
                        className={classes.row} 
                        container
                        spacing={1}>
                        <Grid
                            className = {classes.center}
                            item
                            md={4} 
                            sm={5}
                            xs={12}
                            zeroMinWidth>
                            <FormControl fullWidth>
                                <InputLabel id='label'>Additional Information</InputLabel>
                                <Select
                                    id='select'
                                    labelId='label'
                                    value={sInformation}
                                    onChange={handleInformationChange}>
                                    {
                                        information.map((element, index) => {
                                            return(
                                                <MenuItem
                                                    key={element._id} 
                                                    value={element.additionalInformation}>
                                                    {element.additionalInformation}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                    
                                </Select>
                                
                            </FormControl> 
                            
                        </Grid>
                        <Grid
                            className = {classes.center}
                            item
                            md={8} 
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
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions 
                className={classes.footer}>
                <Button
                    color='secondary'
                    onClick={handleSave}
                    startIcon={<SaveOutlinedIcon color='Secondary'/>}
                    variant='outlined'>
                        SAVE
                </Button>
            </CardActions>
        </Card>
        
    </>
}

export default UpdateProfile;