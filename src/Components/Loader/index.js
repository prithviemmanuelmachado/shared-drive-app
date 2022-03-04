import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    backgroundDisplay:{
        zIndex: 1,
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.25)'
    },
    backgroundNoDisplay:{
        display: 'none'
    }
});

function Loader(props){
    const { isLoading } = props;
    const classes = useStyles();
    const curClass = isLoading ? classes.backgroundDisplay : classes.backgroundNoDisplay;

    return<>
        <div className={curClass}>
            <CircularProgress
                className={classes.loading} 
                color="primary"/>
        </div>
    </>
}

export default Loader;