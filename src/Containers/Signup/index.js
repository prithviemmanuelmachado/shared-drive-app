import FormProgress from '../../Components/FormProgress';
import React, { useEffect} from 'react';
import { signup } from '../../Components/APICaller';
import Loader from '../../Components/Loader';
import Toast from '../../Components/Toast';
import { useNavigate } from 'react-router-dom';

function Signup(props)
{
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [contact, setContact] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [toast, setToast] = React.useState({
        message: '',
        severity: '',
        isOpen: false,
        handleClose: () => {},
        timeout: 0
    });
    const navigate = useNavigate();
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
    const submit = () => {
        if(password !== ''){
            const model = {
                username : username,
                firstName : firstName,
                lastName : lastName,
                password : password,
                email : email,
                contactNumber: contact
            };
            signup(model, () => {
                setIsLoading(true);
                setToast({
                    message: 'Successfully signed up. Please wait while you are redirected to the login page.',
                    severity: 'success',
                    handleClose: () => {
                        setIsLoading(false);
                        navigate('/login');
                    },
                    isOpen: true,
                    timeout: 1000
                });
            }, (message) => {
                setIsLoading(false);
                setErrorToast(message);
            });
        }
        
    };
    useEffect(() => {
        if(password !== '')
            submit();
    }, [password]);

    const header = 'Signup';
    const body = [
        {
            text: 'First Name',
            setValue: (value) => setFirstName(value),
            value: firstName,
            type: 'text',
            desc: 'Please enter your first name.\nIf you have a middle name enter that with a space, like so,\nPrithvi Emmanuel'
        },
        {
            text: 'Last Name',
            setValue: (value) => setLastName(value),
            value: lastName,
            type: 'text',
            desc: 'Please enter your last name.'
        },
        {
            text: 'Contact Number',
            setValue: (uValue) => setContact(uValue),
            value: contact,
            type: 'text',
            desc: 'Please enter your 10 digit contact number.\nThis will be used to contact you.',
            pattern: '^[0-9]{10}$'
        },
        {
            text: 'Email',
            setValue: (uValue) => setEmail(uValue),
            value: email,
            type: 'text',
            desc: 'Please enter your email.\nThis will be used to send you notificaiton.',
            pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
        },
        {
            text: 'Username',
            setValue: (value) => setUsername(value),
            value: username,
            type: 'text',
            desc: 'Enter a username.'
        },
        {
            text: 'Password',
            setValue: (value, callback) => setPassword(value, callback),
            value: password,
            type: 'Password',
            desc: 'Enter a password. It must contain, \nbetween 8 to 16 characters long,\natleast 1 special character, \natleast one uppercase and one lowercase alphabet',
            pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_-])(?=.{8,16})'
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
        <FormProgress
            backLink='/login'
            body={body}
            header={header}
            onSubmit={submit}
            onError={setErrorToast}/>
    </>
}

export default Signup;