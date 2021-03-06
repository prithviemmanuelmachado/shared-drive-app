import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlined from '@mui/icons-material/ArrowForwardIosOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyle = makeStyles(theme => {
    return{
        noUnderline: {
            textDecoration: 'none'
        },
        field: {
            marginTop: 10,
            marginBottom: 10,
            display: 'block'
        },
        cardWidth:{
            margin: 'auto',
            marginTop: 30,
            [theme.breakpoints.up('md')]:{
                width: '50%'
            },
            [theme.breakpoints.up('lg')]:{
                width: '45%'
            }
        },
        cardHeight:{
            minHeight: 300
        },
        desc:{
            paddingLeft: 15
        },
        footer:{
            padding: 20,
            display: 'flex',
            justifyContent: "flex-end"
        }
    } 
});

function FormProgress(props){
    const classes = useStyle();
    const navigate = useNavigate();
    const { header, body, backLink, onSubmit, onError } = props;
    
    
    const [progress, setProgress] = React.useState(0);
    const [nextButtonText, setNextButtonText] = React.useState('NEXT');
    const [input, setInput] = React.useState('');
    const [errorState, setErrorState] = React.useState(false);

    let desc = body[progress].desc.split('\n');
    const steps = 'Step '+(progress+1)+' of '+body.length;
    let percent = 0;

    const setPercent = () => {
        percent = ((progress+1)/body.length)*100;
    }
    setPercent();

    const handleIncrease = () => {
        setErrorState(false);
        body[progress].setValue(input);
        if(progress<body.length-1)
        {
            setPercent();
            setProgress(progress+1);
            setInput(body[progress+1].value);
            if(progress === body.length - 2)
            {
                setNextButtonText('SUBMIT');
            }
        }
        if(progress === body.length - 1){
            if(input === body[progress].value)
                onSubmit();
        }
    };
    const increaseProgress = () => {
        if(input === '')
        {
            setErrorState(true);
            onError('Field cannot be empty');
        }
        else
        {
            if(body[progress].pattern)
            {
                let regex = new RegExp(body[progress].pattern);
                if(regex.test(input))
                {
                    handleIncrease();
                }
                else
                {
                    setErrorState(true);
                    onError('Input does not match given parameters');
                }
            }
            else
            {
                handleIncrease();
            }
        }
            
    };
    const decreaseProgress = () => {
        setErrorState(false);
        if(progress>0)
        {
            setPercent();
            setProgress(progress-1);
            setInput(body[progress-1].value);
            setNextButtonText('NEXT');
        }    
        else
        {
            navigate(backLink);
        }
            
    };
    const handleChange = (e) => {
        setInput(e.target.value);
        if(e.target.value === '')
            setErrorState(true);
        else
            setErrorState(false);
    }
    
    return<>
        <Card
            className={classes.cardWidth}
            variant='outlined'>
            <CardHeader
                title = {
                <Typography
                    color='primary'
                    component='h2'
                    variant='h6'>
                    {header}
                </Typography>}
                subheader={
                    <Typography
                        component='h3'
                        variant='caption'>
                        {steps}
                    </Typography>
                }
            />
            <CardContent className={classes.cardHeight}>
                <form 
                    autoComplete='off'
                    noValidate>
                    <TextField
                        value={input}
                        className={classes.field}
                        color='primary'
                        error={errorState}
                        fullWidth
                        label={body[progress].text}
                        onChange={(e) => handleChange(e)}
                        required
                        type={body[progress].type}
                        variant='outlined'/>
                </form><br/>
                {
                    desc.map((element, index) => {
                        return<>
                            <Typography
                                className={classes.desc}
                                component='h3'
                                key={index}
                                variant='caption'>
                                {element}
                            </Typography>
                        </>
                    })
                }
                
            </CardContent>
            <CardActions 
                className={classes.footer}>
                <Button
                        color='secondary'
                        onClick={decreaseProgress}
                        startIcon={<ArrowBackIosNewOutlinedIcon/>}
                        variant='outlined'>
                        BACK
                    </Button>
                    <Button
                        color='secondary'
                        onClick={increaseProgress}
                        startIcon={<ArrowForwardIosOutlined/>}
                        variant='outlined'>
                        {nextButtonText}
                    </Button>
                                
            </CardActions>
            <LinearProgress 
                color='secondary'
                value={percent} 
                variant="determinate" />
        </Card>
    </>
    
}

export default FormProgress;