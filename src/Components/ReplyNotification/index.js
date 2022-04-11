import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles(theme => {
    return{
        cardWidth:{
            marginTop: 30,
            width: '100%'
        }
    } 
});

function ReplyNotification (props){
    const {data} = props;
    const classes = useStyle();

    return <>
        <Card
            className={classes.cardWidth}
            variant='outlined'>
            <CardContent>
                <Typography>
                    {data.body}
                </Typography>
            </CardContent>
        </Card>
    </>
}

export default ReplyNotification;