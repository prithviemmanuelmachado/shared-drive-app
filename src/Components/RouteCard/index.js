import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Map from '../Map'
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import { createRequest } from '../APICaller';

const useStyle = makeStyles(theme => {
    return{
        fullWidth: {
            width: '100%'
        },
        border: {
            borderLeft: '2px solid',
            borderLeftColor: theme.palette.primary.main,
            paddingLeft: 10
        },
        row: {
            marginTop: 15
        },
        body: {
            marginBottom: 15
        },
        clickable: {
            '&:hover': {
                color: theme.palette.secondary.main,
                cursor: 'pointer'
            }
        },
        footer: {
            display: 'flex',
            justifyContent: 'flex-end'
        }
    } 
});


function RouteCard(props){
    const classes = useStyle();
    const navigate = useNavigate();
    const { route, expanded, handleExpand, setErrorToast, setSuccessToast } = props;
    const fromAddress = route.fromLocation.address;
    const toAddress = route.toLocation.address;
    const daysOfTravel = route.daysOfTravel;
    const timeOfDeparture = route.timeOfDeparture;
    const noOfSeats = route.noOfSeats;
    const noOfAvailableSeats = route.noOfAvailableSeats;
    const createdBy = route.createdBy;
    const toCoords = route.toLocation.coordinates;
    const fromCoords = route.fromLocation.coordinates;
    const routeId = route._id;
    const [clickMarkerLoc, setClickMarkerLocs] = useState(null);
    const coords = [
        {
            pos: {
                lng: toCoords[0],
                lat: toCoords[1]
            },
            name: 'To'
        },
        {
            pos: {
                lng: fromCoords[0],
                lat: fromCoords[1]
            },
            name: 'From'
        }
    ]
    let daysOfTravelString = '';
    for(let i = 0; i < (daysOfTravel.length -1); i++){
        daysOfTravelString += daysOfTravel[i] + ' | '
    }
    daysOfTravelString += daysOfTravel[daysOfTravel.length -1];

    const handleClick = () => {
        if(clickMarkerLoc === null){
            setErrorToast('Please select a pickup location if you wish to join a route');
        }
        else{
            const model = {
                routeId: routeId,
                lng: clickMarkerLoc.lng,
                lat: clickMarkerLoc.lat,
                author: createdBy
            };
            createRequest((msg) => {
                setSuccessToast(msg);
            }, (msg) => {
                setErrorToast(msg);
            }, model);
        }
    }
    
    return<>
        <Accordion 
            expanded={expanded === route._id} 
            onChange={handleExpand(route._id)}
            variant='outlined'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={route._id+'_content'}
          id={route._id+'_header'}>
            <Grid
                className = {classes.fullWidth}>
                <Grid
                    container
                    spacing={1}>
                    <Grid
                        className={classes.row}
                        item 
                        md={2}
                        xs={12}
                        zeroMinWidth> 
                        <Typography>From</Typography>
                    </Grid>
                    <Grid
                        className={classes.border + ' ' + classes.row}
                        item 
                        md={10}
                        xs={12}
                        zeroMinWidth> 
                        <Typography>{fromAddress}</Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={1}>
                    <Grid
                        className={classes.row}
                        item 
                        md={2}
                        xs={12}
                        zeroMinWidth> 
                        <Typography>To</Typography>
                    </Grid>
                    <Grid
                        className={classes.border + ' ' + classes.row}
                        item 
                        md={10}
                        xs={12}
                        zeroMinWidth> 
                        <Typography>{toAddress}</Typography>
                    </Grid>
                </Grid>
            </Grid>                        
        </AccordionSummary>
        <AccordionDetails>
            <Grid className={classes.fullWidth}>
                <Grid
                    className = {classes.body}>
                    <Grid
                        container
                        spacing={2}>
                        <Grid
                            className={classes.row}
                            item 
                            md={2}
                            xs={12}
                            zeroMinWidth> 
                            <Typography>Created by</Typography>
                        </Grid>
                        <Grid
                            onClick={ () => {
                                navigate('/profile?user='+createdBy);
                            }}
                            className={classes.border + ' ' + classes.row}
                            item 
                            md={10}
                            xs={12}
                            zeroMinWidth> 
                            <Typography className={classes.clickable}>{createdBy}</Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={2}>
                        <Grid
                            className={classes.row}
                            item 
                            md={2}
                            xs={12}
                            zeroMinWidth> 
                            <Typography>Time of Departure</Typography>
                        </Grid>
                        <Grid
                            className={classes.border + ' ' + classes.row}
                            item 
                            lg={3} 
                            md={10}
                            xs={12}
                            zeroMinWidth> 
                            <Typography>{timeOfDeparture}</Typography>
                        </Grid>
                        <Grid
                            className={classes.row}
                            item
                            lg={2} 
                            md={2}
                            xs={12}
                            zeroMinWidth> 
                            <Typography>Days of Travel</Typography>
                        </Grid>
                        <Grid
                            className={classes.border + ' ' + classes.row}
                            item
                            lg={5} 
                            md={8}
                            xs={12}
                            zeroMinWidth>
                                <Typography>{daysOfTravelString}</Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={2}>
                        <Grid
                            className={classes.row}
                            item 
                            md={2}
                            xs={12}
                            zeroMinWidth> 
                            <Typography>No Of Seats</Typography>
                        </Grid>
                        <Grid
                            className={classes.border + ' ' + classes.row}
                            item 
                            md={3}
                            xs={12}
                            zeroMinWidth> 
                            <Typography>{noOfSeats}</Typography>
                        </Grid>
                        <Grid
                            className={classes.row}
                            item 
                            md={2}
                            xs={12}
                            zeroMinWidth> 
                            <Typography>No Of Available Seats</Typography>
                        </Grid>
                        <Grid
                            className={classes.border + ' ' + classes.row}
                            item 
                            md={3}
                            xs={12}
                            zeroMinWidth> 
                            <Typography>{noOfAvailableSeats}</Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.row}
                        container
                        spacing={2}>
                            <Map
                                clickable={true}
                                clickMarkerLoc={clickMarkerLoc}
                                setClickMarkerLocs={setClickMarkerLocs}
                                markers={coords}/>
                    </Grid>
                </Grid>    
                <Grid
                    className = {classes.footer}>
                    <Button
                        color='secondary'
                        onClick={handleClick}
                        startIcon={<AddLocationAltOutlinedIcon/>}
                        variant='outlined'>
                        REQUEST TO JOIN ROUTE
                    </Button>            
                </Grid>
            </Grid>
        </AccordionDetails>
      </Accordion>
    </>
}

export default RouteCard;