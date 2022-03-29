import Map from "../Map";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { getGoeLoc } from "../APICaller";

const useStyle = makeStyles(theme => {
    return {
        row:{
            marginTop: 10
        }
    }
});

function MapInput(props){
    const {
        setErrorToast, 
        from, 
        to , 
        setFrom, 
        setTo, 
        clickMarkerLoc, 
        setClickMarkerLocs, 
        selected, 
        setSelected
    } = props;
    const classes = useStyle();

    useEffect(() => {
        if(clickMarkerLoc){
            getGoeLoc((addr) => {
                if(selected === 'From')
                    setFrom(addr);
                else if(selected === 'To')
                    setTo(addr);
                else
                    setErrorToast('Please select destination type');
            }, (err) => {
                setErrorToast('Unable to get address');
                console.log(err);
            }, clickMarkerLoc);
        }
    },[clickMarkerLoc]);

    return<>
        <Grid
            className={classes.row} 
            container
            spacing={2}>
                <Grid
                    md={4} 
                    sm={12}
                    xs={12} 
                    item
                    zeroMinWidth>
                    <Typography
                        component='h2'
                        variant='subtitle1'>
                        From
                    </Typography>    
                </Grid>
                <Grid
                    md={8} 
                    sm={12}
                    xs={12} 
                    item
                    zeroMinWidth>
                    <Typography
                        component='h2'
                        variant='subtitle1'>
                        {from}
                    </Typography>    
                </Grid>
        </Grid>
        <Grid
            className={classes.row} 
            container
            spacing={2}>
                <Grid
                    md={4} 
                    sm={12}
                    xs={12} 
                    item
                    zeroMinWidth>
                    <Typography
                        component='h2'
                        variant='subtitle1'>
                        To
                    </Typography>    
                </Grid>
                <Grid
                    md={8} 
                    sm={12}
                    xs={12} 
                    item
                    zeroMinWidth>
                    <Typography
                        component='h2'
                        variant='subtitle1'>
                        {to}
                    </Typography>    
                </Grid>
        </Grid>
        <Grid
            container
            spacing={6}>
            <Grid item>
                <Button
                    color='secondary'
                    onClick={() => {setSelected('From')}}
                    variant={ selected==='From'? 'contained' : 'outlined' }>
                    FROM
                </Button>
            </Grid>
            <Grid item>
                <Button
                    color='secondary'
                    onClick={() => {setSelected('To')}}
                    variant={ selected==='To'? 'contained' : 'outlined' }>
                    TO
                </Button> 
            </Grid>
        </Grid>                      
        <Map
            clickable={true}
            clickMarkerLoc={clickMarkerLoc}
            setClickMarkerLocs={setClickMarkerLocs}
            markers={[]}/>
            
    </>
}
export default MapInput;