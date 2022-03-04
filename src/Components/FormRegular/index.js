import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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

function FormRegular(props){
    const classes = useStyle();
    const { header, headerButton, body, footerButton, footerLink } = props;
    const footerLinkTag = footerLink.link ? <Link
                                                className={classes.noUnderline} 
                                                to={footerLink.link}>
                                                <Typography color='secondary'>
                                                    {footerLink.text}
                                                </Typography>
                                            </Link> : "";
    
    return<>
        <Card
            className={classes.cardWidth}
            variant='outlined'>
            <CardHeader
                action = {
                    headerButton.map((element, index) => {
                        return<>
                            <div 
                                key={element.text}>
                                <Button
                                    color='secondary'
                                    onClick={element.action}
                                    startIcon={element.icon}
                                    variant='outlined'>
                                    {element.text}
                                </Button>
                            </div>
                        </>
                    })
                }
                title = {
                <Typography
                    color='secondary'
                    component='h2'
                    variant='h6'>
                    {header}
                </Typography>}
            />
            <CardContent>
                <form 
                    autoComplete='off'
                    noValidate>
                    {
                        body.map((element, index) => {
                            return<>
                                <div
                                    key={element.text}>
                                    <TextField
                                    className={classes.field}
                                    color='secondary'
                                    fullWidth
                                    label={element.text}
                                    onChange={element.onChange}
                                    required
                                    type={element.type}
                                    variant='outlined'/>
                                </div>
                            </>
                        })
                    }
                </form>
                
            </CardContent>
            <CardActions 
                className={classes.footer}>
                {
                    footerButton.map((element, index) => {
                        return<>
                            <div
                                key={element.text}>
                                <Button
                                    color='secondary'
                                    onClick={element.action}
                                    startIcon={element.icon}
                                    variant='outlined'>
                                    {element.text}
                                </Button>
                            </div>
                        </>
                    })
                }
                
            </CardActions>
            <div className={classes.footer}>
                {footerLinkTag}
            </div>
        </Card>
    </>
    
}

export default FormRegular;