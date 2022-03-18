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

export function login(userModel, successCallBack, errorCallBack, role){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userModel)
    };
    fetch(serverBaseURI+'/user/' + role + 'Login', requestOptions)
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

export function isAdminLoggedIn(callback){
    fetch(serverBaseURI+'/user/isAdminLoggedIn', {
        method: 'GET',
        headers: {
            'jwt': cookies.get('jwt')
        }
    })
    .then(res => {
        res.json()
        .then(data => {
            callback(data);
        });
    })
    .catch(err => console.log(err));
}

export function getProfile(successCallBack, errorCallBack, user){
    const search = user == null ?  'self' : user;
    const requestOptions = {
        method: 'GET',
        headers: {
            'jwt': cookies.get('jwt')
        }
    };
    fetch(serverBaseURI+'/profile/getProfile?user='+encodeURIComponent(search), requestOptions)
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
                successCallBack(data);
            }); 
        }
    })
    .catch(err => console.log(err));
}

export function getListOfAdditionalInformation(successCallBack, errorCallBack){
    const requestOptions = {
        method: 'GET',
        headers: {
            'jwt': cookies.get('jwt')
        }
    };
    fetch(serverBaseURI+'/additionalInformation/listOfAdditionalInformation', requestOptions)
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
                successCallBack(data);
            }); 
        }
    })
    .catch(err => console.log(err)); 
}

export function createAdditionalInformation(successCallBack, errorCallBack, data){
    const requestOptions = {
        method: 'POST',
        headers: { 
                    'Content-Type': 'application/json',
                    'jwt': cookies.get('jwt')
                },
        body: JSON.stringify({additionalInformation: data})
    };
    fetch(serverBaseURI+'/additionalInformation/newAdditionalInformation', requestOptions)
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

export function deleteInformationBasedOnID(successCallBack, errorCallBack, id){
    const requestOptions = {
        method: 'DELETE',
        headers: { 
                    'jwt': cookies.get('jwt')
                }
    };
    fetch(serverBaseURI+'/additionalInformation/removeInformation?id='+id, requestOptions)
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
                successCallBack(data.success);
            });
            
        } 
    })
    .catch(err => console.log(err));
}