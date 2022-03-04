import FormRegular from '../../Components/FormRegular';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import { SupervisedUserCircleOutlined } from '@material-ui/icons';
import Toast from '../../Components/Toast';
import Loader from '../../Components/Loader';
import { userLogin } from '../../Components/APICaller';
import { setLoggedInStatus } from '../../Components/Navigation';

function Login(props)
{
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [toast, setToast] = React.useState({
        message: '',
        severity: '',
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

    const header = 'Login';
    const body = [
        {
            text: 'Username',
            onChange: (e) => setUsername(e.target.value),
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
                navigate('/');
            },
            icon:<ArrowBackIosNewOutlinedIcon color='Secondary'/>,
            text: 'Back'
        },
        {
            action: () => {
                if(username === '' || password === '')
                    setErrorToast('Please fill all fields');
                else{
                    setIsLoading(true);
                    userLogin({username, password}, () => {
                        setToast({
                            message: 'Successfully logged in. Please wait while you are redirected to the home page.',
                            severity: 'success',
                            handleClose: () => {
                                setIsLoading(false);
                                setLoggedInStatus(true);
                                navigate('/');
                            },
                            isOpen: true,
                            timeout: 1000
                        });
                    }, (message) => {
                        setIsLoading(false);
                        setErrorToast(message);
                    })
                }
            },
            icon:<SendOutlined color='Secondary'/>,
            text: 'Submit'
        }
    ];
    const footerLink = {
        text: 'Click here to sign up',
        link: '/signup'
    };
    const headerButton = [
        {
            action: () => {
                console.log('goto admin login');
            },
            icon: <SupervisedUserCircleOutlined/>,
            text: 'Admin Login',
        }
    ];    

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

export default Login;