import { useEffect, useState } from "react";
import { getUsername } from "../APICaller";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from "react-router-dom";

const useStyle = makeStyles(theme => {
    return{
        footer:{
            padding: 20,
            display: 'flex',
            justifyContent: "flex-end"
        },
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
            float: 'left'
        }
    } 
});

function RequestNotification(props){
    const {data} = props;
    const navigate = useNavigate();
    const classes = useStyle();
    const [username, setUsername] = useState('');

    useEffect(() => {
        getUsername((username) => {
            setUsername(username);
        }, (msg) => {
            console.log(msg);
        }, data.createdBy)
    }, []);

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
            </CardContent>
            <CardActions 
                className={classes.footer}>   
            </CardActions>
        </Card>
    </>
}

export default RequestNotification;