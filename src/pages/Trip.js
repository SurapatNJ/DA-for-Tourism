import React , {Component, Fragment, useRef } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import options from '../data/PlaceData';
import Jumbotron from 'react-bootstrap/Jumbotron';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Scrollbars } from 'react-custom-scrollbars';
import {Typography,Paper,Tab,Tabs,Box,TextField,Select,InputLabel,MenuItem,FormControl,Fab,Card,CardContent,Divider} from "@material-ui/core";
import PropTypes from 'prop-types';
import placeOptions from '../data/PlaceData';
import cityOptions from '../data/CityData';
import modeOptions from '../data/modeOptions';



const mapStyles = {
  width: '800px',
  height: '500px',
  marginTop: '55px',
  marginLeft: '93px'
};


export function CityName() {
  const defaultProps = {
    options: cityOptions,
    getOptionLabel: (option) => option.cname_th +" ("+ option.cname_en +")",
  }
  return (
    <div style={{ width: 320 ,height:20}}>
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
    <div style={{ width: 320 ,height:30}}>
      <Autocomplete
        {...defaultProps}
        multiple
        id="placeName"
        limitTags={1}
        autoComplete
        renderInput={(params) => <TextField  {...params} label="ชื่อสถานที่ท่องเที่ยว" style={{marginLeft:10}}/>}
      />
    </div>
  );
}


export function ModeName() {
  const defaultProps = {
    options: modeOptions,
    getOptionLabel: (option) => option.mname,
  }
  return (
    <div style={{ width: 320 ,height:20}}>
      <Autocomplete
        {...defaultProps}
        id="modeName"
        autoComplete
        includeInputInList
        renderInput={(params) => <TextField {...params} label="โหมดสถานที่" style={{marginLeft:10}}/>}
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


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
function ChooseTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper elevation={0} style={{width:386,marginTop:10,marginLeft:-16}}>
      <Tabs
        value={value}
        indicatorColor="secondary"
        style={{backgroundColor:'#3C6E71'}}
        variant="fullWidth"
        onChange={handleChange}
      >
        <Tab style={{fontFamily:"csPrajad" ,fontSize:18,color:'white'}} label="สถานที่ท่องเที่ยว" {...a11yProps(0)}/>
        <Tab style={{fontFamily:"csPrajad" ,fontSize:18,color:'white'}} label="โรงแรม/ที่พัก" {...a11yProps(1)}/>
      </Tabs>
        <Scrollbars style={{ width: 382, height: 300,marginTop:5}}>
          <TabPanel value={value} index={0} >
              <Typography style={{fontFamily:"csPrajad",fontSize:20}}>
                ชื่อจังหวัด : 
              </Typography>
              <CityName/>
              <br/>
              <Divider style={{marginTop:20}}/>
              <Typography style={{fontFamily:"csPrajad",fontSize:20}}>
              <br/>
                ชื่อสถานที่ : 
              </Typography>
              <PlaceName/>
              <br/>
              <Divider style={{marginTop:20}}/>
              <Typography style={{fontFamily:"csPrajad",fontSize:20}}>
              <br/>
                หมวดสถานที่ : 
              </Typography>
              <ModeName/>
              <br/>
              <Divider style={{marginTop:20}}/>
              <Typography style={{fontFamily:"csPrajad",fontSize:20}}>
              <br/>
                วันที่เริ่มต้น : 
              </Typography>
              <Row style={{marginLeft:10}}><DateStart/><StartTime/></Row>
              <Divider style={{marginTop:20}}/>
              <Typography style={{fontFamily:"csPrajad",fontSize:20}}>
              <br/>
                วันที่สิ้นสุด : 
              </Typography>
              <Row style={{marginLeft:10}}><DateEnd/><EndTime/></Row>              
          </TabPanel>
          <TabPanel value={value} index={1} >
              <Typography style={{fontFamily:"csPrajad",fontSize:20}}>
              <br/>
                โรงแรม/ที่พัก : 
                <Fab
                    variant="extended"
                    size="large"
                    color="secondary"
                    aria-label="Add"
                    style={{width:150,height:50,marginLeft:20,fontFamily:'csPrajad',fontSize:16}}
                   >
                      เลือกโรงแรม/ที่พัก
              </Fab>
              </Typography>
              
          </TabPanel>
        </Scrollbars>
    </Paper>
    
  );
}



{/*     ////////       main     ///////    */ }
export class MapContainer extends Component {
  render() {
    return (
      <div className="Trip">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossorigin="anonymous"
      />
   
      <header className="App-header">
      </header>

      <section className="App-section">
      <Container fluid style={{marginTop:50}}>
        <Row style={{marginTop:5,marginLeft:95}} noGutters={true}>
         
        </Row>
        <Row>
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
              <Paper style={{width:875,height:575,marginLeft:57,marginTop:20}} elevation={5}/>
            </Map>

          </Col>
          <Col style={{marginLeft:800}} md="auto">
            <Jumbotron style={{backgroundSize:'cover' , backgroundColor:'#3C6E71', marginTop:20, marginLeft:150 , width:450}}>
            <Card style={{marginTop:-20}}>
                <CardContent >
                  <Typography style={{fontFamily:"csPrajad" ,fontSize:24}}>
                    แผนการท่องเที่ยว
                  </Typography>
                  <Typography color="textSecondary" style={{fontFamily:"csPrajad",fontSize:16}}>
                    Trip Planner
                  </Typography>
                  <ChooseTabs/>
                  <br />
                  <Divider/>
                </CardContent>
              </Card>
              <Fab
                  variant="extended"
                  size="large"
                  color="secondary"
                  aria-label="Add"
                  style={{width:100,height:50,marginTop:10,marginLeft:280,marginBottom:-28}}
              >
                  Submit
              </Fab>
            </Jumbotron>
              
          </Col>
        </Row>
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
