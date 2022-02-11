import FormProgress from '../../Components/FormProgress';
import React, { useEffect, useState } from 'react';

function Signup(props)
{
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [contact, setContact] = React.useState("");
    const [email, setEmail] = React.useState("");

    const submit = () => {
        console.log('username', username);
        console.log('firstName', firstName);
        console.log('lastName', lastName);
        console.log('password', password);
        console.log('email', email);
        console.log('contact',contact);
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
            desc: 'Please enter your 10 digit contact number.\nThis will be used to contact you.'
        },
        {
            text: 'Email',
            setValue: (uValue) => setEmail(uValue),
            value: email,
            type: 'text',
            desc: 'Please enter your email.\nThis will be used to send you notificaiton.'
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
            setValue: (value) => setPassword(value),
            value: password,
            type: 'Password',
            desc: 'Enter a password.\nIt must, \nbe between 8 to 16 characters long,\n containt atleast 1 special character, \n contain atleast one uppercase and one lowercase alphabet'
        }
    ];
    
    return<>
        <FormProgress
            backLink='/login'
            body={body}
            header={header}/>
    </>
}

export default Signup;