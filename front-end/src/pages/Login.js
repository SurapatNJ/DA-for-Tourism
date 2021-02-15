  
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import InputGroup from 'react-bootstrap/InputGroup';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GoogleLogin from 'react-google-login';



const responseGoogle = (response) => {
  console.log(response);
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:'#3C6E71'
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width:'80%',
      margin:'5%'

      },
    cardcontent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        },
    avatar: {
      margin: theme.spacing(2),
      backgroundColor: '#284B63'
    },
    form: {
      width: '80%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },

  }));
  


export default function LogIn() {
    const classes = useStyles();

  return (
    <div classname="login">
    <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossorigin="anonymous"
    />


    <section className="App-section">
    <Container fluid>
        <Row>
          <Paper elevation={5} style={{width:'50%',height:'50%',margin:'8.5%',marginLeft:'25%'}} className={classes.paper}>
            <Card className={classes.card}>
            <CardContent style={{width:'100%'}} className={classes.cardcontent}>
              <Avatar className={classes.avatar}>
              <VpnKeyOutlinedIcon />
              </Avatar>
              <Typography variant="h5" style={{fontFamily:'csPrajad',fontWeight:'bold'}}>
                Log in
              </Typography>
              <Divider style={{width:'90%',marginTop:'3%'}}/>
              <form className={classes.form} noValidate>
              <Grid container>
                <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          </Grid>
          <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          </Grid>
          <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            style={{marginTop:'2%'}}
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
          </Grid>
            <Grid item xs={7}>
            </Grid>
            <Grid item xs={5}>
              <Link href="/pages/SignUp" variant="body2">
                {"Sign Up a new Account"}
              </Link>
            </Grid>
          </Grid>
          </form>
                <GoogleLogin
                // change client id
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText="Login with Google Account"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
            </CardContent>
            </Card>
          </Paper>
        </Row>
    </Container>
    </section>
    </div>
    
  );
}
