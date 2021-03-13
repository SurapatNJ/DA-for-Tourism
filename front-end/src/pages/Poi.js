import React , {Component, useState, setState} from 'react';
import { render } from 'react-dom';
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
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import {Typography,Paper,Grid,TextField,Button,Select,InputLabel,MenuItem,FormControl,Fab,Card,List,ListItem,CardContent,Divider,Box,CardHeader} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RoomIcon from '@material-ui/icons/Room';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import TodayIcon from '@material-ui/icons/Today';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CommuteIcon from '@material-ui/icons/Commute';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import { Map, HeatMap, GoogleApiWrapper,InfoWindow ,Rectangle,Marker} from "google-maps-react";
import axios from "axios";

const mapStyles = {
  width: '80%',
  height: '50%',
  margin:'5%'
};
const gradient = [
  "rgba(0, 255, 255, 0)",
  "rgba(0, 255, 255, 1)",
  "rgba(0, 191, 255, 1)",
  "rgba(0, 127, 255, 1)",
  "rgba(0, 63, 255, 1)",
  "rgba(0, 0, 255, 1)",
  "rgba(0, 0, 223, 1)",
  "rgba(0, 0, 191, 1)",
  "rgba(0, 0, 159, 1)",
  "rgba(0, 0, 127, 1)",
  "rgba(63, 0, 91, 1)",
  "rgba(127, 0, 63, 1)",
  "rgba(191, 0, 31, 1)",
  "rgba(255, 0, 0, 1)"
];
export function CityName({addCity}) {
  const defaultProps = {
    options: cityOptions,
    getOptionLabel: (option) => option.cname_th +" ("+ option.cname_en +")",
  }
  return (
    <div style={{ width:'100%',marginTop:-18}}>
      <Autocomplete
        {...defaultProps}
        id="cityName"
        autoComplete
        includeInputInList
        renderInput={(params) => <TextField {...params} label="ชื่อจังหวัด"/>}
        onInputChange={(event, value) => {
          addCity(value)
          console.log("value:",value)
      }}
      />
    </div>
  );
}
export function PlaceName({addPlace}) {
  const defaultProps = {
    options: placeOptions,
    getOptionLabel: (option) => option.pname,
    renderOption: (option) => (
      <React.Fragment>
        {option.pname}
      </React.Fragment>
    ),
  }
  return (
    <div style={{ width: '100%',marginTop:-18}}>
      <Autocomplete
        {...defaultProps}
        id="placeName"
        autoComplete
        includeInputInList
        InputLabelProps={{
          shrink: true,
        }}
        renderInput={(params) => <TextField  
          {...params} label="ชื่อสถานที่ท่องเที่ยว"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password',
          }}/>}
        onChange={(event, value) => {
          console.log("value:",value)
          addPlace(value.pname,value.lat,value.lon)
      }}
      />
    </div>
  );
}
function convert(date){
  var datearray = date.split("-");
  var newdate = datearray[0] + '-' + datearray[1] + '-' + datearray[2];
  return newdate;
  
}
export function DateStart({addDatestart}) {
  return (
    <form noValidate>
    <TextField
      id="dateStart"
      label="วันที่เริ่มต้น"
      type="date"
      required id="standard-required" 
      style={{width:'100%'}}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(event, value) => {
        addDatestart(convert(event.target.value))
        console.log("value:",convert(event.target.value))
    }}
    />
  </form>
  );
}
export function DateEnd({addDateend}) {
  return (
    <form noValidate>
      <TextField
        id="dateEnd"
        label="วันที่สิ้นสุด"
        type="date"
        required id="standard-required" 
        style={{ width:'100%'}}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event, value) => {
          addDateend(convert(event.target.value))
          console.log("value:",convert(event.target.value))
      }}
      />
    </form>
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

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '60%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
}));

export function PoiForm({setStatistics,setPlaces,setHeatmaps}) {
  const [submitvalues,setSubmitvalues] = useState({
    city:'',
    lat:0.0,
    lon:0.0,
    place:'',
    datestart:Date,
    dateend:Date
  })
  function callHeatmap(data) {
    // this.map = map;
    // console.log(this.map.getBounds());
    //setTimeout(() =>{console.log(this.map.getBounds());},10)
    // this.bounds = this.map.getBounds();
    // console.log(this.bounds,this.bounds.getNorthEast().lat(),this.bounds.getNorthEast().lng(),this.bounds.getSouthWest().lat(),this.bounds.getSouthWest().lng())
    console.log('HeatmapInput:',data)
    axios
      .post("http://104.248.7.194:8000/api/heatMap/",{
        lat_en: (data.lat+0.02).toString(),
        lng_en: (data.lon+0.02).toString(),
        lat_ws: (data.lat-0.02).toString(),
        lng_ws: (data.lon-0.02).toString(),
        date_start:data.datestart,
        date_end:data.dateend
    },{
        headers: {
          'Content-Type': 'application/json'
    }})
      .then(function (response) {
      console.log('HeatmapResponse:',response.data);
      setHeatmaps(response.data)
    })
      .catch(function (error) {
      console.log('HeatmapError:',error);
    });
}
  function submitForm(data) {
    console.log('submitform: ',data)
    setPlaces(data)
    callHeatmap(data)
    axios.post("http://104.248.7.194:8000/api/tourist_place/",{
      lat_en: (data.lat+0.02).toString(),
      lng_en: (data.lon+0.02).toString(),
      lat_ws: (data.lat-0.02).toString(),
      lng_ws: (data.lon-0.02).toString(),
      date_start:data.datestart,
      date_end:data.dateend
    },{
      headers: {
        'Content-Type': 'application/json'
    }})
    .then(function (response) {
      console.log('FormResponse: ',response.data)
      setStatistics(response.data)
    })
    .catch(function (error) {
      console.log('FormError: ',error);
    });
  }

  const classes = useStyles();

  function addCity(p){
    setSubmitvalues({...submitvalues, city: p})  
  }
  function addPlace(p,la,lo){
    setSubmitvalues({...submitvalues, place: p,lat: la, lon: lo})  
  }
  function addDatestart(p){
    setSubmitvalues({...submitvalues, datestart: p})  
  }
  function addDateend(p){
    setSubmitvalues({...submitvalues, dateend: p})  
  }
  
  return(
    <Container fluid noGutters={true}>
    <Paper elevation={5} style={{width:'90%',height:'auto',margin:'5%'}}>
    <div className={classes.paper}>
      <Typography style={{fontFamily:'csPrajad' ,fontSize:22,marginTop:'5%'}}>สถิติของสถานที่ท่องเที่ยว</Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography style={{fontFamily:'csPrajad' ,fontSize:18}}>จังหวัด :</Typography>
          </Grid>
          <Grid item xs={9}>
              <CityName
              addCity = {addCity}/>
          </Grid>
          <Grid item xs={3}>
            <Typography style={{fontFamily:'csPrajad' ,fontSize:17}}>สถานที่ท่องเที่ยว :</Typography>
          </Grid>
          <Grid item xs={9}>
              <PlaceName
              addPlace = {addPlace}
              />
          </Grid>
          <Grid item xs={6}>
            <DateStart
            addDatestart = {addDatestart}
            />
          </Grid>
          <Grid item xs={6}>
             <DateEnd
             addDateend = {addDateend}
             />
          </Grid>
          <Grid item xs={12}>
              {/*Submit Button        */ }
              <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    style={{width:'20%',height:60,marginLeft:'80%',borderRadius:50}}
                    onClick={() => {
                      submitForm(submitvalues) 
                    }}
              >
                Submit
              </Button>
          </Grid>
        </Grid>
      </form>
    </div>
    </Paper>
  </Container>

  );
}

{/*     ////////       main     ///////    */ }

export class MapContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
         statistics:[{
          lat: 0,
          lng: 0,
          pname_en: "",
          pname_th: "",
          poi: "",
          pop_dayofweek: 0,
          pop_month: 0,
          pp_afternoon: 0,
          pp_all: 0,
          pp_all_in_year: 0,
          pp_evening: 0,
          pp_last_night: 0,
          pp_morning: 0,
          pp_night: 0,
          travel_time: 0
        }],
        places:[{
          pid: 0,
          pname: "",
          lat: 0,
          lon: 0
        }],
        heatmaps:[{
          lat: 0,
          lng: 0
        }]
    }
  }

  setStatistic(p){
    this.setState({statistics:p})
  }
  setPlace(p){
    this.setState({places:p})
  }
  setHeatmap(p){
    this.setState({heatmaps:p})
  }
  state = {
    isHeatVisible : true
  };
  toggleHeatmap = () => {
    this.setState({isHeatVisible: !this.state.isHeatVisible});
  }

  render(){
    let heat = <HeatMap
            //gradient={gradient}
            positions={this.state.heatmaps}
            opacity={1}
            radius={10}
            maxIntensity = {5}
          />
    // this.handleMapMount = this.handleMapMount.bind(this);
    this.setStatistic = this.setStatistic.bind(this);
    this.setPlace = this.setPlace.bind(this);
    this.setHeatmap = this.setHeatmap.bind(this);
    return(
      <div className="Poi">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossOrigin="anonymous"
      />

      <header className="App-header">
      </header>

      <section className="App-section">

      <Container fluid noGutters={true}>
        <PoiForm 
        setStatistics={this.setStatistic}
        setPlaces={this.setPlace}
        setHeatmaps={this.setHeatmap}
        >
        </PoiForm>
        <Paper elevation={5} style={{width:'90%',height:'auto',margin:'5%'}}>
          <Row noGutters>
            <Col xs={6}>
              <InputGroup style={{width:'100%',height:'90%'}}>
                <Map
                  style={{borderRadius:'1%'}}
                  google={this.props.google}
                  className={"map"}
                  zoom={14}
                  // disableDefaultUI ={true}
                  scrollwheel={false}
                  disableDoubleClickZoom = {true}
                  draggable={false}
                  zoomControl={false}
                  initialCenter={{ lat:13.301 , lng: 100.901 }}
                  center={{ lat:this.state.places.lat, lng: this.state.places.lon}}
                  onReady={this.handleMapReady}
                  // onBounds_changed={this.callHeatmap(this.state.places)}
                  //onCenter_changed={this.callHeatmap(this.state.places)}
                >      
                  <Marker
                    onMouseover={this.onMouseoverMarker}
                    // onClick={this.onMarkerClick}
                    name = {'Current location'}
                    position={{ lat:this.state.places.lat, lng: this.state.places.lon}}
                  />
                  <InfoWindow onClose={this.onInfoWindowClose}
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                      <div>
                        <h1>{this.state.places.pname}</h1>
                      </div>
                  </InfoWindow>
                  {this.state.isHeatVisible ? heat: null}
                </Map>
              </InputGroup>
              <InputGroup style={{height:'10%'}}>
              <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            style={{width:'100%'}}
                            onClick={this.toggleHeatmap}
                          >
                              Open Heat Map
                            
              </Button>
              </InputGroup>
            </Col>
            <Col xs={6}>
              <Card>
                <CardContent>
                  <Typography style={{fontFamily:"csPrajad" ,fontSize:20}}>
                    สถิติของสถานที่ท่องเที่ยว
                  </Typography>
                  <Typography color="textSecondary" style={{fontFamily:"csPrajad",fontSize:18}}>
                    Tourism Statistics 
                  </Typography>
                  <br />
                  <Divider/>
                  <Typography style={{fontFamily:"csPrajad",fontSize:16}}>
                    <br />
                    <AccountBalanceIcon />
                    ชื่อสถานที่ :   {`${this.state.places.place}`}
                  </Typography>
                  <br />
                  <Divider/>
                  <Typography style={{fontFamily:"csPrajad",fontSize:16}}>
                    <br />
                    <RoomIcon/>
                    ละติจูด-ลองจิจูด :  {`${this.state.places.lat}-${this.state.places.lon}`}
                  </Typography>
                  <br />
                  <Divider/>

                  <Typography style={{fontFamily:"csPrajad",fontSize:16}}>
                    <br />
                    <LoyaltyIcon />
                    ความนิยม 
                  </Typography>
                  <List style={{marginLeft:'5%'}}>
                     <ListItem>
                        <Typography style={{fontFamily:"csPrajad",fontSize:16}}>
                        <CommuteIcon />
                        จำนวนรถนักท่องเที่ยว(คัน) : {`${this.state.statistics[0].pp_all}`}
                      </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography style={{fontFamily:"csPrajad",fontSize:16}}>
                        <TodayIcon />
                        วันที่นิยม : {`${this.state.statistics[0].pop_dayofweek}`}
                      </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography style={{fontFamily:"csPrajad",fontSize:16}}>
                        <DateRangeIcon />
                        เดือนที่นิยม : {`${this.state.statistics[0].pop_month}`}
                      </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography style={{fontFamily:"csPrajad",fontSize:16}}>
                        <TimelapseIcon />
                        เวลาเฉลี่ยในการท่องเที่ยว : {`${this.state.statistics[0].travel_time}`}
                      </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography style={{fontFamily:"csPrajad",fontSize:16}}>
                        <AccessTimeIcon />
                        ช่วงเวลาที่นิยม : {`${this.state.statistics[0]}`}
                      </Typography>
                    </ListItem>
                  </List>

                  <br />
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

