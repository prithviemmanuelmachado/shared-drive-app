import { useEffect, useState } from "react";
import { 
    getUsername, 
    getPickupLocation,
    setRequestStatus
} from "../APICaller";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from "react-router-dom";
import Map from '../Map'
import Button from "@material-ui/core/Button";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';

const useStyle = makeStyles(theme => {
    return{
        footer:{
            padding: 20,
            display: 'flex',
            justifyContent: "flex-end"
        },
        cardWidth:{
            marginTop: 30,
            width: '100%'
        },
        clickable: {
            '&:hover': {
                color: theme.palette.secondary.main,
                cursor: 'pointer'
            }
        },
        inline: {
            marginLeft: 6,
            float: 'left'
        }
    } 
});

function RequestNotification(props){
    const { data, setErrorToast, setSuccessToast, setFlip, flip } = props;
    const navigate = useNavigate();
    const classes = useStyle();
    const [username, setUsername] = useState('');
    const [pickupLocation, setPickupLocation] = useState([]);
    useEffect(() => {
        getUsername((username) => {
            setUsername(username);
        }, (msg) => {
            setErrorToast(msg);
        }, data.createdBy);
        getPickupLocation((data) => {
            setPickupLocation([{
                pos:{
                    lng: data.loc[0],
                    lat: data.loc[1]
                },
                name: 'Pickup'
            }]);
        }, (msg) => { 
            setErrorToast(msg);
        }, data.body)
    }, []);


    const handleClick = (e) =>{
        const status = e.currentTarget.id;
        const id = data.body;
        const notifId = data._id;
        const createdFor = data.createdBy;
        setRequestStatus((msg) => {
            setSuccessToast(msg);
            setFlip(!flip);
        }, (msg) => {
            setErrorToast(msg);
        }, status, id, notifId, createdFor);        
    } 

    return<>
        <Card
            className={classes.cardWidth}
            variant='outlined'>
            <CardContent>
                <Typography>
                    <div 
                        className={classes.clickable+' '+classes.inline}
                        onClick={() => {navigate('/profile?user='+username)}}> 
                        {username}
                    </div>
                    <div className={classes.inline}>
                        has request to join your route
                    </div>
                </Typography>
                <Map
                    clickable={false}
                    clickMarkerLoc={{}}
                    setClickMarkerLocs={() => {}}
                    markers={pickupLocation}/>
            </CardContent>
            <CardActions 
                className={classes.footer}>
                    <Button
                        color='secondary'
                        id='accepted'
                        onClick={handleClick}
                        startIcon={<DoneOutlinedIcon/>}
                        variant='outlined'>
                            Accept
                    </Button> 
                    <Button
                        color='secondary'
                        id='rejected'
                        onClick={handleClick}
                        startIcon={<DoDisturbAltOutlinedIcon/>}
                        variant='outlined'>
                            Reject
                    </Button>   
            </CardActions>
        </Card>
    </>
}

export default RequestNotification;