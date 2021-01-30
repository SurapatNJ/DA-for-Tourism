import React , {Component} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import placeOptions from '../data/PlaceData';
import cityOptions from '../data/CityData';
import poiOptions from '../data/PoiData';
import {Typography,Paper,TextField,Select,InputLabel,MenuItem,FormControl,Fab,Card,CardContent,Divider} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import RoomIcon from '@material-ui/icons/Room';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
//import axios from "axios";

//Google Map
import { Map, GoogleApiWrapper,Rectangle,HeatMap,Marker} from 'google-maps-react';



const mapStyles = {
  width: '800px',
  height: '500px',
  marginTop: '40px',
  marginLeft: '93px'
};



export function CityName() {
  const defaultProps = {
    options: cityOptions,
    getOptionLabel: (option) => option.cname_th +" ("+ option.cname_en +")",
  }
  return (
    <div style={{ width: 400 ,height:20,marginTop:-10}}>
      <Autocomplete
        {...defaultProps}
        id="cityName"
        autoComplete
        includeInputInList
        renderInput={(params) => <TextField {...params} label="ชื่อจังหวัด" style={{marginLeft:10}}/>}
      />
    </div>
  );
}

export function PlaceName() {
  const defaultProps = {
    options: placeOptions,
    getOptionLabel: (option) => option.pname,
  }
  return (
    <div style={{ width: 800 ,height:20,marginTop:-10}}>
      <Autocomplete
        {...defaultProps}
        id="placeName"
        autoComplete
        includeInputInList
        renderInput={(params) => <TextField  {...params} label="ชื่อสถานที่ท่องเที่ยว" style={{marginLeft:10}}/>}
      />
    </div>
  );
}

export function DateStart() {
  return (
    <form noValidate>
      <TextField
        id="dateStart"
        label="วันที่เริ่มต้น"
        type="date"
        defaultValue="2020-01-01"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
export function DateEnd() {
  return (
    <form noValidate>
      <TextField
        id="dateEnd"
        label="วันที่สิ้นสุด"
        type="date"
        defaultValue="2020-01-01"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}


export function StartTime() {
  const [startTime, setStartTime] = React.useState('');
  const handleChange = (event) => {
    setStartTime(event.target.value);
  };
  return (
    <div>
      <FormControl style={{marginLeft:10}}>
        <InputLabel id="startTime">เวลาเริ่มต้น</InputLabel>
        <Select
          labelId="selectStartTime"
          id="selectStartTime"
          value={startTime}
          onChange={handleChange}
          style={{width:120}}
        >
          <MenuItem value={1}>00:00</MenuItem>
          <MenuItem value={2}>01:00</MenuItem>
          <MenuItem value={3}>02:00</MenuItem>
          <MenuItem value={4}>03:00</MenuItem>
          <MenuItem value={5}>04:00</MenuItem>
          <MenuItem value={6}>05:00</MenuItem>
          <MenuItem value={7}>06:00</MenuItem>
          <MenuItem value={8}>07:00</MenuItem>
          <MenuItem value={9}>08:00</MenuItem>
          <MenuItem value={10}>09:00</MenuItem>
          <MenuItem value={11}>10:00</MenuItem>
          <MenuItem value={12}>11:00</MenuItem>
          <MenuItem value={13}>12:00</MenuItem>
          <MenuItem value={14}>13:00</MenuItem>
          <MenuItem value={15}>14:00</MenuItem>
          <MenuItem value={16}>15:00</MenuItem>
          <MenuItem value={17}>16:00</MenuItem>
          <MenuItem value={18}>17:00</MenuItem>
          <MenuItem value={19}>18:00</MenuItem>
          <MenuItem value={20}>19:00</MenuItem>
          <MenuItem value={21}>20:00</MenuItem>
          <MenuItem value={22}>21:00</MenuItem>
          <MenuItem value={23}>22:00</MenuItem>
          <MenuItem value={24}>23:00</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export function EndTime() {
  const [endTime, setEndTime] = React.useState('');
  const handleChange = (event) => {
    setEndTime(event.target.value);
  };
  return (
    <div>
      <FormControl style={{marginLeft:10}}>
        <InputLabel id="endTime">เวลาสิ้นสุด</InputLabel>
        <Select
          labelId="selectEndTime"
          id="selectEndTime"
          value={endTime}
          onChange={handleChange}
          style={{width:120}}
        >
          <MenuItem value={1}>00:00</MenuItem>
          <MenuItem value={2}>01:00</MenuItem>
          <MenuItem value={3}>02:00</MenuItem>
          <MenuItem value={4}>03:00</MenuItem>
          <MenuItem value={5}>04:00</MenuItem>
          <MenuItem value={6}>05:00</MenuItem>
          <MenuItem value={7}>06:00</MenuItem>
          <MenuItem value={8}>07:00</MenuItem>
          <MenuItem value={9}>08:00</MenuItem>
          <MenuItem value={10}>09:00</MenuItem>
          <MenuItem value={11}>10:00</MenuItem>
          <MenuItem value={12}>11:00</MenuItem>
          <MenuItem value={13}>12:00</MenuItem>
          <MenuItem value={14}>13:00</MenuItem>
          <MenuItem value={15}>14:00</MenuItem>
          <MenuItem value={16}>15:00</MenuItem>
          <MenuItem value={17}>16:00</MenuItem>
          <MenuItem value={18}>17:00</MenuItem>
          <MenuItem value={19}>18:00</MenuItem>
          <MenuItem value={20}>19:00</MenuItem>
          <MenuItem value={21}>20:00</MenuItem>
          <MenuItem value={22}>21:00</MenuItem>
          <MenuItem value={23}>22:00</MenuItem>
          <MenuItem value={24}>23:00</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}


export function PoiRec() {
  /*const defaultProps = {
    options: poiOptions,
    getOptionLabel: (option) => option.lat+" "+option.lon,
  }
  return (
    <div>

    </div>
  );*/

}




{/*     ////////       main     ///////    */ }

export class MapContainer extends React.Component  {
  render(){
    return(
      <div className="Poi">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossorigin="anonymous"
      />

      <header className="App-header">
      </header>

      <section className="App-section">

      <Container fluid style={{marginTop:60}} noGutters={true}>
        <Paper elevation={5} style={{width:1200,height:180,marginTop:-15,marginLeft:140}}> 
        <Row style={{marginTop:20,marginLeft:40}} noGutters={true}>
        <Col md="auto">
            <InputGroup style={{marginTop:15}}>
                <InputGroup.Prepend>
                  <InputGroup.Text style={{backgroundColor:"#284B63",color:"#FFFFFF",borderRadius:5}}>City</InputGroup.Text>
                </InputGroup.Prepend>
                <CityName/>
            </InputGroup>
          </Col>
        </Row>
        <Row style={{marginLeft:40}} noGutters={true}>
          <Col md="auto">
            <InputGroup style={{marginTop:15}}>
                <InputGroup.Prepend>
                  <InputGroup.Text style={{backgroundColor:"#284B63",color:"#FFFFFF",borderRadius:5}}>Point of Interest</InputGroup.Text>
                </InputGroup.Prepend>
              <PlaceName/>
            </InputGroup>
          </Col>
        </Row>
        <Row style={{marginTop:-5,marginLeft:40}}>
            <InputGroup style={{width:1000,marginTop:15}}>
                <InputGroup.Prepend>
                  <InputGroup.Text style={{backgroundColor:"#284B63",color:"#FFFFFF",marginTop:10,marginRight:10,height:40,borderRadius:5}}>From</InputGroup.Text>
                </InputGroup.Prepend>
                  <DateStart/>
                  <StartTime/>
                <InputGroup.Prepend>
                  <InputGroup.Text style={{backgroundColor:"#284B63",color:"#FFFFFF",marginTop:10,marginLeft:50,marginRight:10,height:40,borderRadius:5}}>To</InputGroup.Text>
                </InputGroup.Prepend>
                  <DateEnd/>
                  <EndTime/>
            </InputGroup>
                <InputGroup.Append style={{marginTop:-40,marginLeft:15}}>
                  {/*Submit Button        */ }
                  <Fab
                    variant="extended"
                    size="large"
                    color="secondary"
                    aria-label="Add"
                    style={{width:100,height:60}}
                   >
                      Submit
                  </Fab>
                </InputGroup.Append>
        </Row>
        </Paper>
        
        <Row style={{marginTop:20}}>

          {/*   /////   Map detail //////   */}

          <Col md="auto">
            <Map
            google={this.props.google}
            zoom={9.5}
            style={mapStyles}
            disableDefaultUI ={true}
            scrollwheel={false}
            disableDoubleClickZoom = {true}
            draggable={false}
            zoomControl={false}
            onReady={this.handleMapReady}
            onBounds_changed={this.handleMapMount}
            initialCenter={
              {
                lat:  13.12,
                lng:  101.20
              }
            }
          >     
          {placeOptions.map(placeOptions=>(
            <Marker key={placeOptions.pname} position={{lat:placeOptions.lat,lng:placeOptions.lon}} />
          ))}
     
        
            <Paper style={{width:875,height:575,marginLeft:57,marginTop:20}} elevation={5}/>
                <Fab
                        variant="extended"
                        size="large"
                        color="secondary"
                        aria-label="Add"
                        style={{width:800,height:40,marginLeft:95,marginTop:-97}}
                        onClick={this.toggleHeatmap}
                      >
                          Open Heat Map
                </Fab>

            </Map>

          </Col>

          {/*      /////     card     ///////    */}
          <Col style={{marginLeft:800}} md="auto">
            <Jumbotron style={{backgroundSize:'cover', backgroundColor:'#3C6E71', marginTop:20, marginLeft:150 , width:450}}>
              <Card >
                <CardContent >
                  <Typography style={{fontFamily:"csPrajad" ,fontSize:24}}>
                    สถิติของสถานที่ท่องเที่ยว
                  </Typography>
                  <Typography color="textSecondary" style={{fontFamily:"csPrajad",fontSize:16}}>
                    Tourism Statistics
                  </Typography>
                  <br />
                  <Divider/>
                  <Typography style={{fontFamily:"csPrajad",fontSize:20}}>
                    <br />
                    <AccountBalanceIcon />
                    ชื่อสถานที่ : 
                  </Typography>
                  <br />
                  <Divider/>
                  <Typography style={{fontFamily:"csPrajad",fontSize:20}}>
                    <br />
                    <RoomIcon/>
                    ละติจูด-ลองจิจูด : 
                  </Typography>
                  <br />
                  <Divider/>
                  <Typography style={{fontFamily:"csPrajad",fontSize:20}}>
                    <br />
                    <LoyaltyIcon />
                    ความนิยม : 
                  </Typography>
                  <br />
                  <Divider/>
                </CardContent>
              </Card>
            </Jumbotron>
          </Col>
        </Row>
        <Row><br/><br/><br/><br/><br/></Row>
        </Container>


  
      </section>
    </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyDf8sqiZUNBWHSQkw3Tqpt5R6LIb4kLdbc',
  language:'th',
  libraries: ["visualization"]
})(MapContainer);

