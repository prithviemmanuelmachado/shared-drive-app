import settings from '../../settings.json';
import Cookies from 'universal-cookie/es6';

const serverBaseURI = settings[0].serverURI;
const cookies = new Cookies();

export function signup(userModel, successCallBack, errorCallBack){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userModel)
    };
    fetch(serverBaseURI+'/user/register', requestOptions)
    .then(res => {
        if(res.status === 400 || res.status === 500){
            res.json()
            .then(data => {
                errorCallBack(data.error);
            });
        }
        else{
            res.json()
            .then(data => {
                successCallBack();
            }); 
        }
    })
    .catch(err => console.log(err));
}

export function userLogin(userModel, successCallBack, errorCallBack){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userModel)
    };
    fetch(serverBaseURI+'/user/userLogin', requestOptions)
    .then(res => {
        if(res.status === 400 || res.status === 500){
            res.json()
            .then(data => {
                errorCallBack(data.error);
            });
        }
        else{
            res.json()
            .then(data => {
                cookies.set('jwt', data.jwt); 
                successCallBack();
            })
            
        } 
    })
    .catch(err => console.log(err));
}