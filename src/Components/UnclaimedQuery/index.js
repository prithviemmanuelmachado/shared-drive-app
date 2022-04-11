import { 
    claimQuery,
    getUsername 
} from "../APICaller";
import CardActions from "@material-ui/core/CardActions";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import { useEffect, useState } from "react";

const useStyle = makeStyles(theme => {
    return{
        cardWidth:{
            marginTop: 30,
            width: '100%'
        },
        footer:{
            padding: 20,
            display: 'flex',
            justifyContent: "flex-end"
        }
    } 
});

function UnclaimedQuery(props){
    const classes = useStyle();
    const {setErrorToast, setSuccessToast, setFlip, flip, setIsLoading, data} = props;
    const [username, setUsername] = useState('');
    
    const handleQueryClaim = () => {
        setIsLoading(true);
        claimQuery((msg) => {
            setIsLoading(false);
            setSuccessToast(msg);
            setFlip(!flip);
            window.location.reload();
        }, (msg) => {
            setIsLoading(false);
            setErrorToast(msg);
        }, data._id);
    };

    useEffect(() => {
        getUsername((username) => {
            setUsername(username);
        }, (msg) => {
            console.log(msg);
        }, data.createdBy);
    }, []);

    return<>
        <Card
            className={classes.cardWidth}
            variant='outlined'>
            <CardContent>
                <Typography>
                    {username} asked "{data.body}"
                </Typography>
            </CardContent>
            <CardActions className={classes.footer}>
                <Button
                    color='secondary'
                    onClick={handleQueryClaim}
                    startIcon={<RadioButtonCheckedOutlinedIcon/>}
                    variant='outlined'>
                    CLAIM QUERY
                </Button>                                    
            </CardActions>
        </Card>
    </>
}

export default UnclaimedQuery;