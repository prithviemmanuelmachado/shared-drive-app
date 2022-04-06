import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsername } from "../APICaller";

const useStyle = makeStyles(theme => {
    return{
        cardWidth:{
            margin: 'auto',
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
            float: 'left',
            marginBottom: 10
        }
    } 
});

function StatusNotification (props){
    const {data} = props;
    const classes = useStyle();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        getUsername((username) => {
            setUsername(username);
        }, (msg) => {
            console.log(msg);
        }, data.createdBy);
    }, []);

    return <>
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
                        has {data.body} your request to join their route
                    </div>
                </Typography>
            </CardContent>
        </Card>
    </>
}

export default StatusNotification;