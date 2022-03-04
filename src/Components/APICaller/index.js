import settings from '../../settings.json'

const serverBaseURI = settings[0].serverURI;

export function signup(userModel, successCallBack, errorCallBack){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userModel)
    };
    fetch(serverBaseURI+'/user/register', requestOptions)
    .then(res => {
        console.log(res.status);
        if(res.status === 400 || res.status === 500){
            res.json()
            .then(data => {
                errorCallBack(data.error);
            });
        }
        else{
            return res.json(); 
        } 
    })
    .then(data => {
        successCallBack();
    })
    .catch(err => console.log(err));
}