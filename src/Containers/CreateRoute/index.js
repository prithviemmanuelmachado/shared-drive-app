import Toast from "../../Components/Toast";
import Loader from "../../Components/Loader";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import MapInput from "../../Components/MapInput";
import Button from '@material-ui/core/Button';
import SendOutlined from '@mui/icons-material/SendOutlined';
import { createRoute } from "../../Components/APICaller";

const useStyle = makeStyles(theme => {
    return{
        container: {
            marginLeft: 5
        },
        row: {
            marginTop: 25
        },
        field: {
            marginTop: 15,
            marginBottom: 15,
            display: 'block'
        },
        footer:{
            padding: 20,
            display: 'flex',
            justifyContent: "flex-end"
        },
        cardWidth:{
            margin: 'auto',
            marginTop: 30,
            [theme.breakpoints.up('md')]:{
                width: '90%'
            },
            [theme.breakpoints.up('lg')]:{
                width: '75%'
            }
        }
    } 
});

function CreateRoute(props)
{
    const classes = useStyle();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    const [toast, setToast] = React.useState({
        message: '',
        severity: 'error',
        isOpen: false,
        handleClose: () => {},
        timeout: 0
    });
    const [vehicle, setVehicle] = React.useState('');
    const [noOfSeats, setNoOfSeats] = React.useState(2);
    const [hours, setHours] = React.useState(10);
    const [mins, setMins] = React.useState(0);
    const [period, setPeriod] = React.useState('AM');
    const [days, setDays] = React.useState([]);
    const [from, setFrom] = useState('Please select a location');
    const [to, setTo] = useState('Please select a location');
    const [clickMarkerLoc, setClickMarkerLocs] = useState(null);
    const [selected, setSelected] = useState('From');
    const [fromLocation, setFromLocation] = useState({lat: 0, lng: 0});
    const [toLocation, setToLocation] = useState({lat: 0, lng: 0});

    const daysDisplay = [
        'Sunday', 
        'Monday', 
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    const setErrorToast = (message) => {
        setToast({
            message: message,
            severity: 'error',
            handleClose: () => {setToast({
                message: '',
                severity: 'error',
                handleClose: () => {},
                isOpen: false,
                timeout: 0
            })},
            isOpen: true,
            timeout: 4000
        });
    };

    const setSuccessToast = (msg) => {
        setToast({
            message: msg,
            severity: 'primary',
            handleClose: () => {
                navigate('/');
                window.location.reload(false);
            },
            isOpen: true,
            timeout: 1500
        });
    };

    useEffect(() => {
        if(selected === 'From'){
            setFromLocation(clickMarkerLoc);
        }
        else if(selected === 'To'){
            setToLocation(clickMarkerLoc);
        }
    }, [clickMarkerLoc]);

    const handleSubmit = () => {
        if(vehicle === ''){
            setErrorToast('Please describe the vehicle');
        }
        else if((hours < 1 || hours > 12) || (mins < 0 || mins > 60)){
            setErrorToast('Please enter a valid time of travel');
        }
        else if(days.length === 0){
            setErrorToast('Please select a day of travel');
        }
        else if(from === 'Please select a location' || to === 'Please select a location'){
            setErrorToast('Please select the departure and destination locations');
        }
        else{
            const route = {
                vehicle,
                noOfSeats,
                timeOfDeparture: hours.toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                  })+':'+mins.toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                  })+' '+period,
                fromLocation: {
                    type: 'Point',
                    coordinates: [fromLocation.lng, fromLocation.lat],
                    address: from
                },
                toLocation:{
                    type: 'Point',
                    coordinates: [toLocation.lng, toLocation.lat],
                    address: to
                },
                daysOfTravel: days
            };
            console.log(route);
            setIsLoading(true);
            createRoute(() => {
                setIsLoading(false);
                setSuccessToast('Route created succesfully');
            }, (msg) => {
                setIsLoading(false);
                setErrorToast(msg);
            }, route);
        }
    }

    const handleSeatSelectChange = (e) => {
        setNoOfSeats(e.target.value);
    }

    const handlePeriodSelectChange = (e) => {
        setPeriod(e.target.value);
    }

    const handleDaysChange = (e) => {
        const value = e.target.value;
        setDays(typeof value === 'string' ? value.split(',') : value)
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
                    Create Route
                </Typography>}
            />
            <CardContent>
                <form 
                    autoComplete='off'
                    noValidate>
                        <TextField
                            className={classes.field}
                            color='primary'
                            fullWidth
                            label={'Vehicle'}
                            onChange={(e) => setVehicle(e.target.value)}
                            required
                            type={'text'}
                            value={vehicle}
                            variant='outlined'/>
                        <Grid 
                            container
                            className={classes.container + ' ' + classes.field}>
                            <Grid
                                md={4} 
                                sm={5}
                                xs={6}
                                item>
                                    <FormControl fullWidth>
                                        <InputLabel id='seatsLabel'>No of Seats</InputLabel>
                                        <Select
                                            id='seatsSelect'
                                            labelId='seatsLabel'
                                            value={noOfSeats}
                                            onChange={handleSeatSelectChange}>
                                                <MenuItem value={2}>{2}</MenuItem>
                                                <MenuItem value={3}>{3}</MenuItem>
                                                <MenuItem value={4}>{4}</MenuItem>
                                                <MenuItem value={5}>{5}</MenuItem>
                                                <MenuItem value={6}>{6}</MenuItem>
                                                <MenuItem value={7}>{7}</MenuItem>
                                                <MenuItem value={8}>{8}</MenuItem>
                                        </Select>
                                    </FormControl>
                            </Grid>
                        </Grid>
                        <Grid 
                            container
                            className={classes.container + '' + classes.field}
                            spacing = {3}>
                            <Grid
                                md={3} 
                                sm={12}
                                xs={12}
                                item>
                                <Typography
                                    className={classes.row}
                                    component='h2'
                                    variant='subtitle1'>
                                    Time of Travel
                                </Typography>
                            </Grid>
                            <Grid
                                md={3} 
                                sm={4}
                                xs={4}
                                item>
                                    <TextField
                                        className={classes.field}
                                        color='primary'
                                        fullWidth
                                        label={'Hours'}
                                        onChange={(e) => setHours(e.target.value)}
                                        required
                                        type={'text'}
                                        value={hours}
                                        variant='outlined'/>
                            </Grid>
                            <Grid
                                md={3} 
                                sm={4}
                                xs={4}
                                item>
                                    <TextField
                                        className={classes.field}
                                        color='primary'
                                        fullWidth
                                        label={'Minutes'}
                                        onChange={(e) => setMins(e.target.value)}
                                        required
                                        type={'text'}
                                        value={mins}
                                        variant='outlined'/>
                            </Grid>
                            <Grid
                                md={3} 
                                sm={4}
                                xs={4}
                                item>
                                    <FormControl fullWidth>
                                        <InputLabel id='periodLabel'>Period</InputLabel>
                                        <Select
                                            id='periodSelect'
                                            labelId='periodLabel'
                                            value={period}
                                            onChange={handlePeriodSelectChange}>
                                                <MenuItem value={'AM'}>{'AM'}</MenuItem>
                                                <MenuItem value={'PM'}>{'PM'}</MenuItem>
                                        </Select>
                                    </FormControl>
                            </Grid>
                        </Grid>
                        <Grid 
                            container
                            className={classes.container + ' ' + classes.field}>
                            <Grid
                                xs={12}
                                item>
                                    <FormControl fullWidth>
                                    <InputLabel id="dayLabel">Days of Travel</InputLabel>
                                    <Select
                                        labelId="dayLabel"
                                        id="daySelect"
                                        multiple
                                        value={days}
                                        onChange={handleDaysChange}
                                        renderValue={(selected) => selected.join(', ')}
                                        >
                                        {daysDisplay.map((tDay) => (
                                            <MenuItem key={tDay} value={tDay}>
                                            <Checkbox checked={days.indexOf(tDay) > -1} />
                                            <ListItemText primary={tDay} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    </FormControl>
                            </Grid>
                        </Grid>
                </form>
                <MapInput
                    setErrorToast={setErrorToast}
                    to={to}
                    from={from}
                    setFrom={setFrom}
                    setTo={setTo}
                    clickMarkerLoc={clickMarkerLoc}
                    setClickMarkerLocs={setClickMarkerLocs}
                    selected={selected}
                    setSelected={setSelected}/>    
            </CardContent>
            <CardActions 
                className={classes.footer}>
                    <Button
                        color='secondary'
                        onClick={handleSubmit}
                        startIcon={<SendOutlined color='Secondary'/>}
                        variant='outlined'>
                        SUBMIT
                    </Button>         
            </CardActions>
        </Card>

        <Loader isLoading = {isLoading}/>
        <Toast 
            handleClose = {toast.handleClose} 
            isOpen = {toast.isOpen}
            message = {toast.message}
            severity = {toast.severity} 
            timeout = {toast.timeout}/>
    </>
}

export default CreateRoute;