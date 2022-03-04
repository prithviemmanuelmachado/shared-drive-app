import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Toast(props){
    const { isOpen, handleClose, severity, message, timeout } = props;
    return<>
        <Snackbar
            anchorOrigin={{ vertical:'top', horizontal:'right' }} 
            autoHideDuration={timeout} 
            onClose={handleClose}
            open={isOpen}> 
            <Alert 
                onClose={handleClose} 
                severity={severity} 
                sx={{ width: '100%' }}
                variant='filled'>
                {message}
            </Alert>
        </Snackbar>
    </>
}
export default Toast;