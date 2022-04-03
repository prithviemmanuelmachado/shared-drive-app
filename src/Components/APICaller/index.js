import settings from '../../settings.json';
import Cookies from 'universal-cookie/es6';
import secrets from '../../secrets.json';
import Geocode from 'react-geocode';

const serverBaseURI = settings.serverURI;
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

export function isAdminLoggedIn(callback, logout){
    fetch(serverBaseURI+'/user/isAdminLoggedIn', {
        method: 'GET',
        headers: {
            'jwt': cookies.get('jwt')
        }
    })
    .then(res => {
        if(res.status === 400 || res.status === 500){
            res.json()
            .then(data => {
                logout();
            });
        }
        else{
            res.json()
            .then(data => {
                callback(data);
            }); 
        }
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

export function updateProfile(successCallBack, errorCallBack, model){
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', 
            'jwt': cookies.get('jwt')
        },
        body: JSON.stringify({profile: model})
    };
    fetch(serverBaseURI+'/profile/updateProfile', requestOptions)
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

export function updateProfileAddInformation(successCallBack, errorCallBack, model){
    const requestOptions = {
        method: 'PUT',
        headers: {
                    'Content-Type': 'application/json', 
                    'jwt': cookies.get('jwt')
                },
        body: JSON.stringify({newInfo : model})
    };
    console.log(model);
    fetch(serverBaseURI+'/profile/addAdditionalInformation', requestOptions)
    .then(res => {
        if(res.status === 400 || res.status === 500){
            res.json()
            .then(data => {
                console.log(data);
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

export function getGoeLoc(successCallBack, errorCallBack, model){
    const apiKey = secrets.GoeApiKey;
    Geocode.setApiKey(apiKey);
    Geocode.fromLatLng(model.lat, model.lng).then(
        (response) => {
            const address = response.results[0].formatted_address;
            successCallBack(address);
        },
        (error) => {
            errorCallBack(error);
        }
    );
}

export function createRoute(successCallBack, errorCallBack, model){
    const requestOptions = {
        method: 'POST',
        headers: { 
                    'Content-Type': 'application/json',
                    'jwt': cookies.get('jwt')
                },
        body: JSON.stringify(model)
    };
    fetch(serverBaseURI+'/route/createRoute', requestOptions)
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

export function getRoutesByProximity(successCallBack, errorCallBack, model){
    const requestOptions = {
        method: 'GET',
        headers: {
            'jwt': cookies.get('jwt')
        }
    };
    fetch(serverBaseURI+'/route/getRoutesByProximity?lng='+model.lng+'&lat='+model.lat, requestOptions)
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

export function getGeoCoords(successCallBack, errorCallBack, searchTerm){
    const apiKey = secrets.GoeApiKey;
    Geocode.setApiKey(apiKey);
    Geocode.fromAddress(searchTerm).then(
        (response) => {
            successCallBack(response.results[0].geometry.location);
        },
        (error) => {
            errorCallBack(error);
        }
    );
}

export function createRequest(successCallBack, errorCallBack, model){
    const requestOptions = {
        method: 'POST',
        headers: { 
                    'Content-Type': 'application/json',
                    'jwt': cookies.get('jwt')
                },
        body: JSON.stringify(model)
    };
    fetch(serverBaseURI+'/request/createRequest', requestOptions)
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

export function getNotifications(successCallBack, errorCallBack){
    const requestOptions = {
        method: 'GET',
        headers: {
            'jwt': cookies.get('jwt')
        }
    };
    fetch(serverBaseURI+'/notification/getNotifications', requestOptions)
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

export function getUsername(successCallBack, errorCallBack, id){
    fetch(serverBaseURI+'/user/getUsername?id='+id)
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
                successCallBack(data.username);
            });
        } 
    })
    .catch(err => console.log(err));
}