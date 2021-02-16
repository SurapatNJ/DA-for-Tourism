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
    <div style={{ width:'100%',marginTop:-18}}>
      <Autocomplete
        {...defaultProps}
        id="cityName"
        autoComplete
        includeInputInList
        renderInput={(params) => <TextField {...params} label="ชื่อจังหวัด"/>}
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
    <div style={{ width: '100%',marginTop:-18}}>
      <Autocomplete
        {...defaultProps}
        id="placeName"
        autoComplete
        includeInputInList
        renderInput={(params) => <TextField  {...params} label="ชื่อสถานที่ท่องเที่ยว"/>}
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
      style={{width:'100%'}}
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
        style={{ width:'100%'}}
        InputLabelProps={{
          shrink: true,
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


export function PoiForm() {
  const classes = useStyles();
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
              <CityName/>
          </Grid>
          <Grid item xs={3}>
            <Typography style={{fontFamily:'csPrajad' ,fontSize:17}}>สถานที่ท่องเที่ยว :</Typography>
          </Grid>
          <Grid item xs={9}>
              <PlaceName/>
          </Grid>
          <Grid item xs={6}>
            <DateStart/>
          </Grid>
          <Grid item xs={6}>
             <DateEnd/>
          </Grid>
          <Grid item xs={12}>
              {/*Submit Button        */ }
              <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    style={{width:'20%',height:60,marginLeft:'80%',borderRadius:50}}
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
        <PoiForm/>
        
        
        <Paper elevation={5} style={{width:'90%',height:'auto',margin:'5%'}}>
          <Row noGutters>
            <Col xs={6}>
              <InputGroup style={{width:'100%',height:'90%'}}>
              <Map
                    style={{borderRadius:'1%'}}
                    google={this.props.google}
                    zoom={9}
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
                    ความนิยม 
                  </Typography>
                  <List style={{marginLeft:'5%'}}>
                     <ListItem>
                        <Typography style={{fontFamily:"csPrajad",fontSize:16}}>
                        <CommuteIcon />
                        Popularity : 
                      </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography style={{fontFamily:"csPrajad",fontSize:16}}>
                        <TodayIcon />
                        Day-of-Week : 
                      </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography style={{fontFamily:"csPrajad",fontSize:16}}>
                        <DateRangeIcon />
                        Favourite Month :
                      </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography style={{fontFamily:"csPrajad",fontSize:16}}>
                        <TimelapseIcon />
                        Time Ranges :
                      </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography style={{fontFamily:"csPrajad",fontSize:16}}>
                        <AccessTimeIcon />
                        Times of the Day :
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

