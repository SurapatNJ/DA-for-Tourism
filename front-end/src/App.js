
import React from "react";
import './App.css';
import { Tabs, Tab, AppBar, Toolbar,Typography ,IconButton,Button,Icon,Tooltip} from "@material-ui/core";
import { Route, BrowserRouter, Switch, Link ,withRouter,useHistory} from "react-router-dom";

import PropTypes from "prop-types";
import { Redirect } from "react-router";
import Poi from "./pages/Poi";
import Trip from "./pages/Trip";
import Home from './pages/Home';
import Planner from "./pages/Planner";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { withStyles  } from '@material-ui/core/styles';
//import "bootstrap/dist/css/bootstrap.min.css";
import logo from './location.svg';
import { render } from "@testing-library/react";
import { Component } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';


const style = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    "&:hover": {
      backgroundColor: "transparent",
      color:"#3C6E71",
      textDecoration: "underline transparent",
      border:"none",
      outline:"none"
    }
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    marginLeft: theme.spacing(1),
    fontFamily:'csPrajad',
    color:'#FFFFFF'
  },
  toolbar:{
    backgroundColor: '#353535',
  },
  tabs:{
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(8),
      width: 'auto',
    },
    backgroundColor: '#353535',
    flexGrow: 1,
  },
  tab:{
    '&:hover': {
      color : '#3C6E71',
      textDecoration: "underline transparent"
    }
  },
  button:{
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  quote:{
    marginLeft: theme.spacing(-1.5),
  }
});



export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      routes : ["/","/pages/Poi", "/pages/Trip","/pages/Planner","/pages/Login","/pages/SignUp"],
      auth : false,
      userdata : "",
    };
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);

  }

  
  componentDidMount() { 
    let data; 
    axios 
        .get("http://104.248.7.194:8000/api/login/") 
        .then((res) => { 
            if(localStorage.getItem('username')!=null){
              const items = { ...localStorage };
              this.setState({
                auth: true,
                userdata : items
              })
              console.log(localStorage)
            }
            else{
              this.setState({
                auth: false,
              })
            }
        }) 
        .catch((err) => {}); 
} 

  handleSuccessfulAuth(data) {
    this.setState({
      auth: true,
      userdata : data
    })
    this.props.history.push("/pages/Poi")
  };


  AppClick= (event) =>
  {
    this.props.history.push("/pages/Poi")
  }


  LogInClick= (event) =>
  {
    this.props.history.push("/pages/Login")
  }



  LogOutClick = (event) => {
    this.setState({
      auth: false
    })
    localStorage.clear();
    this.props.history.push("/pages/Login")
  };

  

  render(){
    const { classes} = this.props;
    return (

         <div className="App">
          <Route
            path="/"
            
            render={(history) => (
              <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
        
                  <IconButton edge="start" className={classes.menuButton}  color="inherit" disabled >
                      <img
                          alt=""
                          src={logo}
                          width="40"
                          height="40"
                      />{' '}
                  <Typography variant="h6" className={classes.title}>
                    Tourism Data
                  </Typography>
                  </IconButton>
               
                  <Tabs
                  
                    value={
                      history.location.pathname
                        ? history.location.pathname
                        : false
                    }
                    className={classes.tabs}
  
                  >
                    <Tab
                      value={this.state.routes[1]}
                      label="Point of Interest"
                      component={Link}
                      to={this.state.routes[1]}
                      className={classes.tab}
                    />
                   
                    <Tab
                      value={this.state.routes[2]}
                      label="Trip Planner"
                      disabled={!this.state.auth}
                      component={Link}
                      to={this.state.routes[2]}
                      className={classes.tab}
                    />

                  </Tabs>


                  {!this.state.auth && (
                      <div>
                      <Button color="inherit" className={classes.button} onClick={this.LogInClick} >Log in &nbsp;&nbsp;&nbsp;</Button>
                      </div>
                    )}
                  {this.state.auth && (
                      <div>
                      {this.state.userdata.username}&nbsp;&nbsp;
                      <Button color="inherit" className={classes.button}  onClick={this.LogOutClick}>Log out</Button>
                      </div>
                    )}
                  </Toolbar>
              </AppBar>
            )}
          />

          <Switch>
            <Route path="/" component={Poi} exact />
            <Route path="/pages/Poi" component={Poi} exact/>
            <Route path="/pages/Trip" component={Trip} exact/>
            <Route path="/pages/Planner" component={Planner} exact/>
            <Route path="/pages/Login" component={()=><Login handleSuccessfulAuth = {this.handleSuccessfulAuth} />} exact/>
            <Route path="/pages/SignUp" component={SignUp} exact/>
          </Switch>
                 
        </div>
 

 
    );
}
}


//export default withStyles(style)(App);

//export default withRouter(App);
//export default withRouter((withStyles(style)(App)));
export default withRouter(withStyles(style)(App));
