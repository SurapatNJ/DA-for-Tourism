/*import React , {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
//import TabPane from 'react-bootstrap/TabPane'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Poi from './pages/Poi';
import Trip from './pages/Trip';
import Home from './pages/Home';
import Navigation from './Navigation';
 

function App() {
  
  return (
      <BrowserRouter>
      <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossorigin="anonymous"
      />
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/pages/Poi" component={Poi} exact/>
             <Route path="/pages/Trip" component={Trip} exact/>
           </Switch>
    </div>
    </BrowserRouter>
    );
  }


export default App;

/*
function App() {
  
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossorigin="anonymous"
      />
   
      <header className="App-header">

      </header>

      <section className="App-section">
      <Container>
        <Row>
          <Tabs defaultActiveKey="dashboard" className="tabsetting">
            <Tab eventKey="dashboard" title="Dashboard"></Tab>
            <Tab eventKey="poi" title="สถานที่ท่องเที่ยวยอดนิยม"></Tab>
            <Tab eventKey="trip" title="ทริปยอดนิยม"></Tab>
          </Tabs>

        </Row>
        <Row></Row>

      </Container>
      </section>

    </div>
  );
}

export default App; */

/*
import React,{Component} from "react";
import { BrowserRouter as Router, Route , Switch } from "react-router-dom";
import Poi from "./pages/Poi";
import Navigation from "./Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
class App extends Component {
  render() {
    return (      
       <Router>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Poi} exact/>
           </Switch>
        </div> 
      </Router>
    );
  }
}
 
export default App;
*/


import React from "react";
import './App.css';
import { Tabs, Tab, AppBar, Toolbar,Typography ,IconButton,Button} from "@material-ui/core";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import Poi from "./pages/Poi";
import Trip from "./pages/Trip";
import Home from './pages/Home';
import Planner from "./pages/Planner";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { makeStyles } from '@material-ui/core/styles';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './location.svg';
import { render } from "@testing-library/react";

const useStyles = makeStyles((theme) => ({
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
}));

export default function App() {
const routes = ["/","/pages/Poi", "/pages/Trip","/pages/Planner","/pages/Login","/pages/SignUp"];
const classes = useStyles();

const [auth, setAuth] = React.useState(true);
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);

const handleChange = (event) => {
  setAuth(false);
};

  return (
    <div className="App">
      <BrowserRouter>
        <Route
          path="/"
          render={(history) => (
            <AppBar position="fixed">
              <Toolbar className={classes.toolbar}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" href="/pages/Poi">
                    <img
                        alt=""
                        src={logo}
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
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
                    value={routes[1]}
                    label="Point of Interest"
                    component={Link}
                    to={routes[1]}
                    className={classes.tab}
                  />
                  <Tab
                    value={routes[2]}
                    label="Trip Planner"
                    disabled={!auth}
                    component={Link}
                    to={routes[2]}
                    className={classes.tab}
                  />
                </Tabs>
                {!auth && (
                    <div>
                    <Button color="inherit" className={classes.button} component={Link} to="/pages/Login" >Log in</Button>
                    </div>
                  )}
                {auth && (
                    <div>
                    <Button color="inherit" className={classes.button}  onClick={handleChange}>Log out</Button>
                    </div>
                  )}
                </Toolbar>
            </AppBar>
          )}
        />

        <Switch>
          <Route path="/" component={Poi} exact/>
          <Route path="/pages/Poi" component={Poi} exact/>
          <Route path="/pages/Trip" component={Trip} exact/>
          <Route path="/pages/Planner" component={Planner} exact/>
          <Route path="/pages/Login" component={Login} exact/>
          <Route path="/pages/SignUp" component={SignUp} exact/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
