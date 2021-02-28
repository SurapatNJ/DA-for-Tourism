
import React from "react";
import './App.css';
import { Tabs, Tab, AppBar, Toolbar,Typography ,IconButton,Button,Icon} from "@material-ui/core";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import { Redirect } from "react-router";
import Poi from "./pages/Poi";
import Trip from "./pages/Trip";
import Home from './pages/Home';
import Planner from "./pages/Planner";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { withStyles  } from '@material-ui/core/styles';
import "bootstrap/dist/css/bootstrap.min.css";
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
    color:"#FFFFFF",
    "&:hover": {
      backgroundColor: "transparent",
      color:"#3C6E71",
      textDecoration: "underline transparent"
    }
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    marginLeft: theme.spacing(1),
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

  }
});



export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      routes : ["/","/pages/Poi", "/pages/Trip","/pages/Planner","/pages/Login","/pages/SignUp"],
      auth : false,
      userdata : ""
    };
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);

  }

  handleSuccessfulAuth(data) {

    this.setState({
      auth: true,
    })
    window.alert(data)
  }



  LogInClick= (event) => {
    window.location.href = "/pages/Login";
  };
 
  LogOutClick = (event) => {
    this.setState({
      auth: false
    })
    localStorage.clear();
    window.location.href = "/pages/Login";
  };

  render(){
    const { classes } = this.props;
    return (
      <div className="App">
        <BrowserRouter>
          <Route
            path="/"
            
            render={(history) => (
              <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                  <Icon edge="start" className={classes.menuButton} color="inherit" >
                      <img
                          alt=""
                          src={logo}
                          width="40"
                          height="40"
                          className="d-inline-block align-top"
                      />{' '}
                 
                  </Icon>
                  <Typography variant="h6" className={classes.title}>
                    Tourism Data
                  </Typography>
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
                      {localStorage.getItem('username')}&nbsp;&nbsp;
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
            <Route path="/pages/Login" component={(Login)} exact/>
            <Route path="/pages/SignUp" component={SignUp} exact/>
          </Switch>
        </BrowserRouter>

        
      </div>
    );
}
}


export default withStyles(style)(App);
