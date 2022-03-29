import { useEffect, useState } from "react";
import { getRoutesByProximity } from "../../Components/APICaller";
import Toast from "../../Components/Toast";
import Loader from "../../Components/Loader";
import RouteCard from "../../Components/RouteCard";
import { makeStyles } from '@material-ui/core';

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
            }
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

    const setSuccessToast = (msg) => {
        setToast({
            message: msg,
            severity: 'primary',
            handleClose: () => {setToast({
                message: '',
                severity: 'primary',
                handleClose: () => {},
                isOpen: false,
                timeout: 0
            })},
            isOpen: true,
            timeout: 1500
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

    const callAPI = () => {
        getRoutesByProximity((data) => {
            setIsLoading(false);
            setRoutes(data);
        }, (msg) => {
            setIsLoading(false);
            setErrorToast(msg);
        }, loc);
    };

    const getCurLoc = () => {
        navigator.geolocation.getCurrentPosition(setMapInitLoc);
    };

    useEffect(() => {
        setIsLoading(true);
        getCurLoc();
    }, []);

    useEffect(() => {
        if(loc){
            callAPI();
        }    
    });

    
    return<>
        <div className={classes.cardWidth}>
        {
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