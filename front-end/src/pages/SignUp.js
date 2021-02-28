  
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
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GoogleLogin from 'react-google-login';
import {Alert, AlertTitle} from '@material-ui/lab/';
import axios from 'axios';

const responseGoogle = (response) => {
  console.log(response);
}

const style = (theme) => ({
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
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },

  });
  
export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      email:"",
      password:"",
      confirm_password:"",
      error_msg:"",
      error:false,
      success:false
    };
  }

  componentDidMount() { 
    let data; 
    axios 
        .get("http://104.248.7.194:8000/api/signup/") 
        .then((res) => { 
            data = res.data; 
            this.setState({ 
                text: data, 
            }); 
            console.log("sign up");
            console.log(localStorage)
        }) 
        .catch((err) => {}); 
} 

  handleUsername = (e) => { 
      this.setState({ 
        username : e.target.value, 
      }); 
  }; 

  handleEmail = (e) => { 
    this.setState({ 
        email: e.target.value, 
    }); 
  }; 

  handlePassword = (e) => { 
    this.setState({ 
        password: e.target.value, 
    }); 
  }; 

  handleConfirmPassword = (e) => { 
    this.setState({ 
        confirm_password: e.target.value, 
    }); 
  }; 

  handleSubmit = (e) => { 
      e.preventDefault(); 
      axios 
          .post("http://104.248.7.194:8000/api/signup/", { 
            username: this.state.username,
            email: this.state.email, 
            password: this.state.password ,
            confirm_password: this.state.confirm_password
          },{  
            headers: {
            'Content-Type': 'application/json'
          }}) 
          .then((res) => { 
            console.log(res.data.text)

            if(res.data.status=="Error"){
              this.setState({error_msg: res.data.text , error:true})
            }
            else{
              this.setState({success : true})
            }
            /*
            if(res.data.status!="Error"){
              this.props.history.push("/pages/Login");
            }*/
          }) 
          .catch((err) => {});
  }; 

  render(){
    const { classes } = this.props;
    return (
    <div classname="signUp">
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
                Sign Up
              </Typography>
              <Divider style={{width:'90%',marginTop:'3%'}}/>
              <form className={classes.form} noValidate>
              <Grid container>
                <Grid item xs={12}>
                 {this.state.error_msg===""? null:
                  <Alert severity="error">
                      <AlertTitle>{this.state.error_msg}</AlertTitle>
                    </Alert>
                  }  
                   {this.state.success?   
                   <Alert severity="success">
                      <AlertTitle>Sign Up Success&nbsp;&nbsp;
                        <Link href="/pages/Login" variant="body2">{"Log in"}</Link>
                      </AlertTitle>
                    </Alert>
                    :null
                  }  
                </Grid>
                <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={this.state.error}
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={this.handleUsername}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  error={this.state.error}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={this.handleEmail}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={this.state.error}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoFocus
                  onChange={this.handlePassword}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={this.state.error}
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoFocus
                  onChange={this.handleConfirmPassword}
                />
                </Grid>
                <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  style={{marginTop:'2%'}}
                  variant="contained"
                  color="secondary"
                  onClick={this.handleSubmit}
                >
                  Sign Up
                </Button>
                </Grid>
              <Grid item xs={10}/>
              <Grid item xs={2}>
              <Link href="/pages/Login" variant="body2">
                {"Log in"}
              </Link>
              </Grid>
              </Grid>

          </form>

            </CardContent>
            </Card>
          </Paper>
        </Row>
    </Container>
    </section>
    </div>
    
  );
}
}


export default withStyles(style)(SignUp);
