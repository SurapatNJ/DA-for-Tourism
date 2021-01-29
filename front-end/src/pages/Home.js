import React , {Component} from 'react';
import '../App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
//import TabPane from 'react-bootstrap/TabPane'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import InputGroup from 'react-bootstrap/InputGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from "react-router-bootstrap";

const mapStyles = {
  width: '800px',
  height: '500px',
  marginTop: '20px',
  marginLeft: '-150px'
};

export default function Home() {
    return (
      <div className="Home">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossorigin="anonymous"
      />
    
      <header> 
      </header>

      <section className="App-section">
        <Container fluid style={{marginTop:50}}>
            <h5 style={{marginTop:20}}>dashboard page</h5>
        </Container>
      </section>
    </div>
    );
  
}
