import { useEffect, useState } from "react";
import { getGeoCoords, getRoutesByProximity } from "../../Components/APICaller";
import Toast from "../../Components/Toast";
import Loader from "../../Components/Loader";
import RouteCard from "../../Components/RouteCard";
import { makeStyles } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

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
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '60vh',
            justifyContent: 'center'
        },
        noRoutes: {
            alignSelf: 'center'
        },
        buttonContainer: {
            display: 'flex',
            [theme.breakpoints.up('xs')]:{
                marginTop: 20,
                justifyContent: 'flex-start'
            },
            [theme.breakpoints.up('md')]:{
                marginTop: 0,
                justifyContent: 'flex-end'
            },
            alignItems: 'center'
        }
    } 
});


function Home(props)
{
    const classes = useStyle();
    const [loc, setLoc] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [toast, setToast] = useState({
        message: '',
        severity: 'error',
        isOpen: false,
        handleClose: () => {},
        timeout: 0
    });
    const [isLoading, setIsLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
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
    
    const setMapInitLoc = (pos) => {
        if(pos){
            setLoc({
                lng: pos.coords.longitude,
                lat: pos.coords.latitude
            });
        }
    }

    const callProximityAPI = (search) => {
        const mod = search === null ? loc : search;
        getRoutesByProximity((data) => {
            setIsLoading(false);
            setRoutes(data);
        }, (msg) => {
            setIsLoading(false);
            setErrorToast(msg);
        }, mod);
    };

    const showError = (error) => {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setErrorToast("User denied the request for Geolocation.");
            setLoc({ lng: 77.5946, lat: 12.9716 });
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorToast("Location information is unavailable.");
            setLoc({ lng: 77.5946, lat: 12.9716 });
            break;
          case error.TIMEOUT:
            setErrorToast("The request to get user location timed out.");
            setLoc({ lng: 77.5946, lat: 12.9716 });
            break;
          case error.UNKNOWN_ERROR:
            setErrorToast("An unknown error occurred.");
            setLoc({ lng: 77.5946, lat: 12.9716 });
            break;
        }
        setIsLoading(false);
    }

    const getCurLoc = () => {
        if (navigator.geolocation)  {
            navigator.geolocation.getCurrentPosition(setMapInitLoc, showError);
        } 
        else  {
          console.log("Geolocation is not supported by this browser.");
        }     
    };

    const handleSearch = () => {
        setIsLoading(true);
        if(searchTerm === ''){
            callProximityAPI(null);
        }
        else{
            getGeoCoords((data) => {
                setIsLoading(false);
                callProximityAPI(data);
            }, (msg) => {
                setIsLoading(false);
                setErrorToast('Please enter a valid address');
                setRoutes([]);
            }, searchTerm);
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        setIsLoading(true);
        callProximityAPI(null);
    }

    useEffect(() => {
        setIsLoading(true);
        getCurLoc();
    }, []);

    useEffect(() => {
        if(loc){
            callProximityAPI(null);
        }    
    }, [loc]);
    
    return<>
        <Grid
            className={classes.cardWidth}
            container>
            <Grid
                md={8}
                xs={12}
                item
                zeroMinWidth>
                <TextField
                    className={classes.field}
                    hiddenLabel
                    fullWidth
                    onChange = {(e) => { setSearchTerm(e.target.value); } }
                    value = {searchTerm}
                    variant="outlined"/>
            </Grid>
            <Grid
                className={classes.buttonContainer}
                md={2}
                xs={3}
                item
                zeroMinWidth>
                <Button
                    color='secondary'
                    onClick={handleSearch}
                    startIcon={<SearchOutlinedIcon/>}
                    variant='outlined'>
                    Search
                </Button>
            </Grid>
            <Grid
                className={classes.buttonContainer}
                md={2}
                xs={3}
                item
                zeroMinWidth>
                <Button
                    color='secondary'
                    onClick={handleClear}
                    startIcon={<ClearOutlinedIcon/>}
                    variant='outlined'>
                    Clear
                </Button>
            </Grid>
        </Grid>
        <div className={classes.cardWidth + ' ' + classes.body}>
        {
            routes.length === 0 ? 
            <div className={classes.noRoutes}>
                <Typography
                    color='primary'
                    component='h2'
                    variant='h6'>
                    No Routes In This Vicinity
                </Typography>
            </div>:
            routes.map((element, index) => {
                return <>
                    <RouteCard
                        key={index}
                        route={element}
                        handleExpand={handleExpand}
                        expanded={expanded}/>
                </>
            })
            
        }
        </div>
        <Loader isLoading = {isLoading}/>
        <Toast 
            handleClose = {toast.handleClose} 
            isOpen = {toast.isOpen}
            message = {toast.message}
            severity = {toast.severity} 
            timeout = {toast.timeout}/>
    </>
}

export default Home;