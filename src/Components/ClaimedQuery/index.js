import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from "react";
import { 
    getUsername,
    resolveQuery 
} from "../APICaller";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import Button from '@material-ui/core/Button';
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

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
        },
        buttonContainer:{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
        }
    } 
});

function ClaimedQuery(props){
    const classes = useStyle();
    const {setErrorToast, setSuccessToast, setFlip, flip, setIsLoading, data} = props;
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        getUsername((username) => {
            setUsername(username);
        }, (msg) => {
            console.log(msg);
        }, data.createdBy);
    }, []);

    const handleResolve = () => {
        if(input === ''){
            setErrorToast('Please fill in the solution for the query');
        }
        else{
            setIsLoading(true);
            const body = {
                id: data._id,
                solution: input,
                createdFor: data.createdBy
            };
            resolveQuery((msg) => {
                setIsLoading(false);
                setSuccessToast(msg);
                setFlip(!flip);
                window.location.reload();
            }, (msg) => {
                setIsLoading(false);
                setErrorToast(msg);
            }, body);
        }
    };

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
                <Grid
                    container
                    spacing={1}>
                    <Grid
                        item
                        lg={10} 
                        md={8}
                        xs={12}
                        zeroMinWidth> 
                        <TextField
                            className={classes.field}
                            hiddenLabel
                            fullWidth
                            onChange = {(e) => { setInput(e.target.value); } }
                            value = {input}
                            variant="outlined"/>
                    </Grid>
                    <Grid
                        className={classes.buttonContainer}
                        item
                        lg={2} 
                        md={4}
                        xs={12}
                        zeroMinWidth> 
                        <Button
                            color='secondary'
                            onClick={handleResolve}
                            startIcon={<CheckCircleOutlinedIcon/>}
                            variant='outlined'>
                            RESOLVE QUERY
                        </Button>   
                    </Grid>
                </Grid>                                 
            </CardActions>
        </Card>
    </>
}

export default ClaimedQuery;