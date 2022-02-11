import FormRegular from '../../Components/FormRegular';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';

function Login(props)
{
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const header = 'Login';
    const headerButton = [];
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
            action: () => {
                navigate('/');
            },
            icon:<ArrowBackIosNewOutlinedIcon color='Secondary'/>,
            text: 'Back'
        },
        {
            action: () => {
                console.log(username, password);
            },
            icon:<SendOutlined color='Secondary'/>,
            text: 'Submit'
        }
    ];
    const footerLink = {
        text: 'Click here to sign up',
        link: '/signup'
    };
        

    return<>
        <FormRegular
            body={body}
            footerButton={footerButton}
            footerLink={footerLink}
            header={header}
            headerButton={headerButton}/>
    </>
}

export default Login;