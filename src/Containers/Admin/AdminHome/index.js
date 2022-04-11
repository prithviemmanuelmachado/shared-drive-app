import { useEffect, useState } from "react";
import { 
    getAllActiveQueries
} from "../../../Components/APICaller";
import Toast from '../../../Components/Toast';
import Loader from '../../../Components/Loader';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import UnclaimedQuery from "../../../Components/UnclaimedQuery";
import ClaimedQuery from "../../../Components/ClaimedQuery";

const useStyle = makeStyles(theme => {
    return{
        noQueries: {
            alignSelf: 'center'
        },
        cardWidth:{
            margin: 'auto',
            marginTop: 30,
            [theme.breakpoints.up('md')]:{
                width: '90%'
            },
            [theme.breakpoints.up('lg')]:{
                width: '85%'
            }
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '60vh'
        }
    } 
});

function AdminHome(props){
    const classes = useStyle();
    const [flip, setFlip] = useState(false);
    const [toast, setToast] = useState({
        message: '',
        severity: 'error',
        isOpen: false,
        handleClose: () => {},
        timeout: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        getAllActiveQueries((data) => {
            setIsLoading(false);
            data.sort((a,b) => {
                return a.state.localeCompare(b.state); 
            });
            setQueries(data);
        }, (msg) => {
            setIsLoading(false);
            setErrorToast(msg);
        });
    },[flip]);

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
    
    const setSuccessToast = (message) => {
        setToast({
            message: message,
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

    return<>
        <Loader isLoading = {isLoading}/>
        <Toast 
            handleClose = {toast.handleClose} 
            isOpen = {toast.isOpen}
            message = {toast.message}
            severity = {toast.severity} 
            timeout = {toast.timeout}/>
        <div className={classes.cardWidth + ' ' + classes.body}>
        {
            queries.length === 0? 
            <div className={classes.noQueries}>
                <Typography
                    color='primary'
                    component='h2'
                    variant='h6'>
                    No Queries at the Moment
                </Typography>
            </div>:
            queries.map((value, index) => {
                if(value.state === 'unclaimed'){
                    return <>
                        <UnclaimedQuery 
                            setErrorToast={setErrorToast}
                            setSuccessToast={setSuccessToast}
                            setFlip={setFlip}
                            setIsLoading={setIsLoading}
                            data={value}
                            flip={flip}/>
                    </>
                }
                else{
                    return <>
                        <ClaimedQuery 
                            setErrorToast={setErrorToast}
                            setSuccessToast={setSuccessToast}
                            setFlip={setFlip}
                            setIsLoading={setIsLoading}
                            data={value}
                            flip={flip}/>
                    </>
                }
            })
        }
        </div>
    </>
}

export default AdminHome;