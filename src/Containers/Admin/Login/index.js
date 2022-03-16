import FormRegular from '../../../Components/FormRegular';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Toast from '../../../Components/Toast';
import Loader from '../../../Components/Loader';
import { login } from '../../../Components/APICaller';
import { setLoggedInStatus, setIsAdmin } from '../../../Components/Navigation';

function AdminLogin(props)
{
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [toast, setToast] = React.useState({
        message: '',
        severity: 'error',
        isOpen: false,
        handleClose: () => {},
        timeout: 0
    });
    const [isLoading, setIsLoading] = React.useState(false);

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

    const header = 'Admin Login';
    const body = [
        {
            text: 'Email',
            onChange: (e) => setEmail(e.target.value),
            type: 'text'
        },
        {
            text: 'Password',
            onChange: (e) => setPassword(e.target.value),
            type: 'password'
        }
    ];
    const footerButton = [
        {
            action: (callback) => {
                navigate('/login');
            },
            icon:<ArrowBackIosNewOutlinedIcon color='Secondary'/>,
            text: 'Back'
        },
        {
            action: () => {
                if(email === '' || password === '')
                    setErrorToast('Please fill all fields');
                else{
                    setIsLoading(true);
                    login({email, password}, () => {
                        setToast({
                            message: 'Successfully logged in. Please wait while you are redirected to the home page.',
                            severity: 'primary',
                            handleClose: () => {
                                setIsLoading(false);
                                setLoggedInStatus(true);
                                setIsAdmin(true);
                                navigate('/admin/home');
                            },
                            isOpen: true,
                            timeout: 1000
                        });
                    }, (message) => {
                        setIsLoading(false);
                        setErrorToast(message);
                    }, 'admin');
                }
            },
            icon:<SendOutlined color='Secondary'/>,
            text: 'Submit'
        }
    ];
    const footerLink = {};
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
    </>
}

export default AdminLogin;