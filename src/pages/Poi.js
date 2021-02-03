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
import {Typography,Paper,TextField,Button,Select,InputLabel,MenuItem,FormControl,Fab,Card,CardContent,Divider,Box} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RoomIcon from '@material-ui/icons/Room';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
//import axios from "axios";

//Google Map
import { Map, GoogleApiWrapper,Rectangle,HeatMap,Marker} from 'google-maps-react';



const mapStyles = {
  width: '80%',
  height: '50%',
  margin:'5%'
};



export function CityName() {
  const defaultProps = {
    options: cityOptions,
    getOptionLabel: (option) => option.cname_th +" ("+ option.cname_en +")",
  }
  return (
    <div style={{ width:'25%' ,height:20,marginTop:-10}}>
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
    <div style={{ width: '40%',marginTop:-10}}>
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
      required id="standard-required" 
      style={{width:'100%',marginLeft:'2%'}}
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
        required id="standard-required" 
        style={{ width:'100%',marginLeft:'2%'}}
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
      <FormControl style={{marginLeft:10,marginRight:'5%'}}>
        <InputLabel id="startTime">เวลาเริ่มต้น</InputLabel>
        <Select
          labelId="selectStartTime"
          id="selectStartTime"
          value={startTime}
          onChange={handleChange}
          style={{width:'100%',minWidth:100}}
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
      <FormControl style={{marginLeft:20,marginRight:'5%'}}>
        <InputLabel id="endTime">เวลาสิ้นสุด</InputLabel>
        <Select
          labelId="selectEndTime"
          id="selectEndTime"
          value={endTime}
          onChange={handleChange}
          style={{width:'100%',minWidth:100}}
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

      <Container fluid noGutters={true}>
      <Paper elevation={5} style={{width:'90%',margin:'5%'}}>

        <Row style={{margin:'1%'}} noGutters={true}>
   
            <InputGroup style={{marginTop:15}}>
                <InputGroup.Prepend>
                  <InputGroup.Text style={{backgroundColor:"#284B63",color:"#FFFFFF",borderRadius:5}}>City</InputGroup.Text>
                </InputGroup.Prepend>
                <CityName/>
            </InputGroup>
 
        </Row>
        <Row style={{margin:'1%'}} noGutters={true}>
          
            <InputGroup style={{marginTop:15}}>
                <InputGroup.Prepend>
                  <InputGroup.Text style={{backgroundColor:"#284B63",color:"#FFFFFF",borderRadius:5}}>Point of Interest</InputGroup.Text>
                </InputGroup.Prepend>
              <PlaceName/>
            </InputGroup>
        </Row>
        <Row style={{margin:'1%'}} noGutters={true}>
          <InputGroup style={{marginTop:15}}>
            <InputGroup.Prepend>
                  <InputGroup.Text style={{backgroundColor:"#284B63",color:"#FFFFFF",marginTop:10,marginRight:'5%',borderRadius:5}}>From</InputGroup.Text>
                  <DateStart/>
                  <StartTime/>
              </InputGroup.Prepend>
          </InputGroup>
        </Row>
        <Row style={{margin:'1%'}} noGutters={true}>
          <Col>
            <InputGroup style={{marginTop:15}}>
                <InputGroup.Prepend>
                  <InputGroup.Text style={{backgroundColor:"#284B63",color:"#FFFFFF",marginTop:10,marginRight:'5%',borderRadius:5}}>To</InputGroup.Text>
                  <DateEnd/>
                  <EndTime/>          
                </InputGroup.Prepend>
            </InputGroup>

            </Col>
            <Col>
              {/*Submit Button        */ }
              <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    style={{width:'20%',height:60,margin:'2%',marginLeft:'75%',borderRadius:50}}
              >
                Submit
              </Button>
            </Col>
        </Row>
        </Paper>
        
        <Paper elevation={5} style={{width:'90%',height:'35%',margin:'5%',marginTop:'-4%'}}>
          <InputGroup style={{width:'100%' ,height:'90%'}}>
          <Map
                google={this.props.google}
                zoom={9}
                style={{width:'100%',height:'auto'}}
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
     
          </Map>
          </InputGroup>
          <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        style={{width:'100%',height:'10%'}}
                        onClick={this.toggleHeatmap}
                      >
                          Open Heat Map
                </Button>
        </Paper>
        <Paper elevation={5} style={{width:'90%',minHeight:'20%',height:'auto',margin:'5%',marginTop:'-4%',marginBottom:'30%'}}>
          <Row>
            <Col>
                <Skeleton style={{margin:'5%',width:'90%',height:'95%',marginTop:'-1%'}} />
            </Col>
            <Col>
              <Card>
                <CardContent >
                  <Typography style={{fontFamily:"csPrajad" ,fontSize:18}}>
                    สถิติของสถานที่ท่องเที่ยว
                  </Typography>
                  <Typography color="textSecondary" style={{fontFamily:"csPrajad",fontSize:16}}>
                    Tourism Statistics
                  </Typography>
                  <br />
                  <Divider/>
                  <Typography style={{fontFamily:"csPrajad",fontSize:16}}>
                    <br />
                    <AccountBalanceIcon />
                    ชื่อสถานที่ : 
                  </Typography>
                  <br />
                  <Divider/>
                  <Typography style={{fontFamily:"csPrajad",fontSize:16}}>
                    <br />
                    <RoomIcon/>
                    ละติจูด-ลองจิจูด : 
                  </Typography>
                  <br />
                  <Divider/>
                  <Typography style={{fontFamily:"csPrajad",fontSize:16}}>
                    <br />
                    <LoyaltyIcon />
                    ความนิยม : 
                  </Typography>
                  <br />
                  <Divider/>
                </CardContent>
              </Card>

            </Col>
          </Row>
        </Paper>
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

