import React , {Component, Fragment, useRef, useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import options from '../data/PlaceData';
import Jumbotron from 'react-bootstrap/Jumbotron';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import { Scrollbars } from 'react-custom-scrollbars';
import {Typography,Button,Paper,Grid,Tab,Tabs,Box,TextField,InputLabel,MenuItem,FormControl,Select,Fab,IconButton,Card,CardContent,Divider,Avatar,List,ListItem,ListItemIcon,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TableFooter,TablePagination,Collapse,Portal,Checkbox,FormControlLabel,Radio,RadioGroup,FormGroup} from "@material-ui/core";
import { green } from '@material-ui/core/colors'; 
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import PropTypes from 'prop-types';
import placeOptions from '../data/PlaceData';
import cityOptions from '../data/CityData';
import modeOptions from '../data/modeOptions';
import hotelOptions from '../data/hotelOptions';
import { withStyles, makeStyles,useTheme } from '@material-ui/core/styles';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import AssistantOutlinedIcon from '@material-ui/icons/AssistantOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import axios from 'axios';

//Google Map
import { Map, GoogleApiWrapper,Rectangle,HeatMap,Marker} from 'google-maps-react';
import { ThumbDownAltRounded, ThumbsUpDownOutlined } from '@material-ui/icons';



//------------------ Input -----------------------//

export function TripName(val) {
  return (console.log(val))
}

export function CityName({setCitycode}) {
  const defaultProps = {
    options: cityOptions,
    getOptionLabel: (option) => option.cname_th +" ("+ option.cname_en +")",
  }
  return (
    <div style={{ width: '100%'}}>
      <Autocomplete
        {...defaultProps}
        id="cityName"
        autoComplete
        includeInputInList
        renderInput={(params) => <TextField {...params} label="ชื่อจังหวัด"   required id="standard-required" style={{marginTop:-18}}/>}
        onChange={(event, value) => {       
          setCitycode(value.city_code)
          console.log("value:",value)
        }}
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
    <div style={{ width: '100%',marginTop:-22}}>
      <Autocomplete
        {...defaultProps}
        id="placeName"
        autoComplete
        includeInputInList
        renderInput={(params) => <TextField  {...params} label="ชื่อสถานที่ท่องเที่ยว" />}
        onChange={(event, value) => {
          console.log("value:",value)
        }}
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
    <div style={{ width: '60%' ,height:'20%'}}>
      <Autocomplete
        {...defaultProps}
        id="modeName"
        autoComplete
        includeInputInList
        renderInput={(params) => <TextField {...params} label="โหมดสถานที่"  required id="standard-required"  style={{marginLeft:10,marginTop:5}}/>}
        onChange={(event, value) => {
          console.log("value:",value)
        }}
      />
    </div>
  );
}


export function HotelName({setHotelname}) {
  const defaultProps = {
    options: hotelOptions,
    getOptionLabel: (option) => option.Hotel_name,
  }
  return (
    <div style={{ width: '100%',marginTop:-19}}>
      <Autocomplete
        {...defaultProps}
        id="hotelName"
        autoComplete
        includeInputInList
        renderInput={(params) => <TextField {...params} label="ชื่อโรงแรม/ที่พัก"  required id="standard-required"/>}
        onChange={(event, value) => {
          console.log("value:",value)
          if (value){
            setHotelname(value.Id,parseFloat(value.lat),value.lng)
          }
          else {
            setHotelname(0,0,0)
          }
        }}
      />
    </div>
  );
}

export function DateStart({addDatestart}) {
  return (
    <form noValidate>
      <TextField
        id="dateStart"
        label="วันที่เริ่มต้น"
        type="date"
        required id="standard-required" 
        style={{width:'55%',marginTop:-18}}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event, value) => {
          addDatestart(event.target.value)
          console.log("value:",event.target.value)
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
        style={{width:'55%',marginTop:-18}}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event, value) => {
          addDateend(event.target.value)
          console.log("value:",event.target.value)
        }}
      />
    </form>
  );
}

const p_cat = [
  { pcat: 'ธรรมชาติ'},
  { pcat: 'วัฒนธรรม'},
  { pcat: 'นันทนาการ'},
  { pcat: 'ทะเล'},
  { pcat: 'ป่าชายเลน'},
  { pcat: 'ภูเขา'},
  { pcat: 'น้ำตก'},
  { pcat: 'ถ้ำ'},
  { pcat: 'อนุสรณ์สถาน'},
  { pcat: 'พิพิธภัณฑ์'},
  { pcat: 'วัด'},
  { pcat: 'ศาสนสถาน'},
  { pcat: 'ตลาด'},
  { pcat: 'สวนสนุก'},
  { pcat: 'ฟาร์ม'},
];

export function Place_cat() {
  const defaultProps = {
    options: p_cat,
    getOptionLabel: (option) => option.pcat,
  }
  return (
    <div style={{ width: '100%',marginLeft:'3%',marginTop:'-2%'}}>
      <Autocomplete
        {...defaultProps}
        multiple
        id="placeCat"
        autoComplete
        includeInputInList
        renderInput={(params) => <TextField {...params} label="ประเภทของสถานที่ท่องเที่ยว"  required id="standard-required"  style={{marginLeft:10,marginBottom:10,marginTop:-5}}/>}
      />
    </div>
  );
}

export function SetTime() {
  const [startTime, setStartTime] = React.useState(1);
  const handleChange = (event) => {
    setStartTime(event.target.value);
  };
  return (
    <div>
      <FormControl  size="small" >
        <Select
          labelId="selectStartTime"
          id="selectStartTime"
          value={startTime}
          onChange={handleChange}
          style={{width:'120'}}
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

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  alert: {

    margin: theme.spacing(1, 3),
  },
}));

//--------------- Accordion ------------------/

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export function CreateAccordion(){
  const classes = useStyles1();
  const classes2 = plannerUseStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [added, setAdded] = React.useState([]);
  const handleToggle= () => {
    return (
      <Typography>ddd</Typography>
    );
  }

  return (
    <div>
      <Paper elevation={0}>
      <Scrollbars style={{height:550}}>
      <div ClassName={classes2.paper}>
        <form className={classes2.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputGroup style={{marginLeft:'5%'}}>
                <AssistantOutlinedIcon/>
                <Typography style={{fontFamily:"csPrajad" ,fontSize:20}}>แนะนำทริป</Typography>
              </InputGroup>
            </Grid>
           <Grid item xs={12}>
            <Place_cat/>
           </Grid>
          </Grid>
        </form>
        </div>

      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')} > 
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{backgroundColor:'#3C6E71',color:'white'}}
        >
          <Typography style={{fontFamily:'csPrajad',fontSize:'18',fontWeight:'bold'}}>วันที่ 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Paper elevation={0} style={{width:'100%'}}>
            <div ClassName={classes2.paper}>
            <form className={classes2.form2} noValidate>
              <Grid container spacing={2} style={{marginTop:-20}}>
                <Grid item xs={12}>
                     <RatingClick/>
                </Grid>
                  <Divider style={{marginTop:5}}/>
                <List style={{width:'100%'}}>
                  <ListItem>
                    <Grid item xs={5}>
                    <InputGroup><SetTime/><Typography style={{marginTop:2,fontSize:20,marginLeft:5,marginRight:5}}>-</Typography><SetTime/></InputGroup>
                    </Grid>
                    <Grid item xs={6}>   
                        <PlaceName/>
                    </Grid>
                    <Grid item xs={1}/>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={5}>
                    <InputGroup><SetTime/><Typography style={{marginTop:2,fontSize:20,marginLeft:5,marginRight:5}}>-</Typography><SetTime/></InputGroup>
                    </Grid>
                    <Grid item xs={6}>   
                        <PlaceName/>
                    </Grid>
                    <Grid item xs={1}/>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={5}>
                    <InputGroup><SetTime/><Typography style={{marginTop:2,fontSize:20,marginLeft:5,marginRight:5}}>-</Typography><SetTime/></InputGroup>
                    </Grid>
                    <Grid item xs={6}>   
                        <PlaceName/>
                    </Grid>
                    <Grid item xs={1}>
                      <ListItemIcon>
                        <IconButton size="small"><AddBoxIcon style={{ color: green[500]}} onClick={handleToggle}/></IconButton>
                        <IconButton size="small"><IndeterminateCheckBoxIcon color="action"/></IconButton>
                      </ListItemIcon>
                    </Grid>
                  </ListItem>
                </List>
                  <Divider style={{marginTop:15}}/>
                </Grid>
              </form>
              </div>
              </Paper>
        </AccordionDetails>
      </Accordion>

      
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')} > 
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{backgroundColor:'#3C6E71',color:'white'}}
        >
          <Typography style={{fontFamily:'csPrajad',fontSize:'18',fontWeight:'bold'}}>วันที่ 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Paper elevation={0} style={{width:'100%'}}>
            <div ClassName={classes2.paper}>
            <form className={classes2.form2} noValidate>
              <Grid container spacing={2} style={{marginTop:-20}}>
                <Grid item xs={12}>
                     <RatingClick/>
                </Grid>
                  <Divider style={{marginTop:5}}/>
                <List style={{width:'100%'}}>
                  <ListItem>
                    <Grid item xs={5}>
                    <InputGroup><SetTime/><Typography style={{marginTop:2,fontSize:20,marginLeft:5,marginRight:5}}>-</Typography><SetTime/></InputGroup>
                    </Grid>
                    <Grid item xs={6}>   
                        <PlaceName/>
                    </Grid>
                    <Grid item xs={1}/>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={5}>
                    <InputGroup><SetTime/><Typography style={{marginTop:2,fontSize:20,marginLeft:5,marginRight:5}}>-</Typography><SetTime/></InputGroup>
                    </Grid>
                    <Grid item xs={6}>   
                        <PlaceName/>
                    </Grid>
                    <Grid item xs={1}/>
                  </ListItem>
                  <ListItem>
                    <Grid item xs={5}>
                    <InputGroup><SetTime/><Typography style={{marginTop:2,fontSize:20,marginLeft:5,marginRight:5}}>-</Typography><SetTime/></InputGroup>
                    </Grid>
                    <Grid item xs={6}>   
                        <PlaceName/>
                    </Grid>
                    <Grid item xs={1}>
                      <ListItemIcon>
                        <IconButton size="small"><AddBoxIcon style={{ color: green[500]}} onClick={handleToggle}/></IconButton>
                        <IconButton size="small"><IndeterminateCheckBoxIcon color="action"/></IconButton>
                      </ListItemIcon>
                    </Grid>
                  </ListItem>
                </List>
                  <Divider style={{marginTop:15}}/>
                </Grid>
              </form>
              </div>
              </Paper>
        </AccordionDetails>
      </Accordion>

        <Divider/>
        <div className={classes2.paper}>
        <form className={classes2.form} noValidate>
        <Grid container>
        <Grid item xs={10}><RatingAllClick/></Grid>
        <Grid item xs={2}>
        <Button
              variant="contained"
              color="Secondary"
              style={{height:30}}
          >บันทึก</Button>
          </Grid>
          </Grid>
        </form>
        </div>
        </Scrollbars>
      </Paper>
    </div>
  );
}

export function RatingClick() {
  const [show, setShow] = React.useState(false);
  const container = React.useRef(null);
  const handleClick = () => {
    setShow(true);
  };
  return(
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
        <Button
        variant="outlined"
        color="primary"
        style={{width:80,height:30}}
        onClick={handleClick}
      >สุ่มทริป</Button>
      </Grid>
      <Grid item xs={9}>
        {show ? (
          <Portal container={container.current}>     
              <InputGroup>
                <Typography style={{fontSize:'12',fontFamily:'csPrajad',marginRight:'3%'}}>ให้คะแนนทริป </Typography>
                  <RadioGroup row>
                    <FormControlLabel style={{marginTop:'-5%'}} control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}/>
                    <FormControlLabel style={{marginTop:'-5%'}} control={<Checkbox icon={<ThumbUpAltOutlinedIcon/>} checkedIcon={<ThumbUpAltIcon />} />}/>
                    <FormControlLabel style={{marginTop:'-5%'}} control={<Checkbox icon={<ThumbDownOutlinedIcon />} checkedIcon={<ThumbDownIcon />} />}/>
                  </RadioGroup>
              </InputGroup>
          </Portal>
          ) : null}
        <div ref={container} />
        </Grid>
        </Grid>
    </div>

  );
}

export function RatingAllClick() {
  const [show, setShow] = React.useState(false);
  const container = React.useRef(null);
  const handleClick = () => {
    setShow(true);
  };
  return(
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
        <Button
        variant="outlined"
        color="primary"
        style={{width:95,height:30}}
        onClick={handleClick}
      >สุ่มทั้งหมด</Button>
      </Grid>
      <Grid item xs={9}>
        {show ? (
          <Portal container={container.current}>     
              <InputGroup>
                <Typography style={{fontSize:'12',fontFamily:'csPrajad',marginRight:'3%',marginLeft:10,marginTop:3}}>ให้คะแนนทริป </Typography>
                  <RadioGroup row>
                    <FormControlLabel style={{marginTop:'-5%'}} control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}/>
                    <FormControlLabel style={{marginTop:'-5%'}} control={<Checkbox icon={<ThumbUpAltOutlinedIcon/>} checkedIcon={<ThumbUpAltIcon />} />}/>
                    <FormControlLabel style={{marginTop:'-5%'}} control={<Checkbox icon={<ThumbDownOutlinedIcon />} checkedIcon={<ThumbDownIcon />} />}/>
                  </RadioGroup>
              </InputGroup>
          </Portal>
          ) : null}
        <div ref={container} />
        </Grid>
        </Grid>
    </div>

  );
}

const plannerUseStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  form2: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },

}));

export function PlannerForm({setPlaces}) {
  const [submitvalues,setSubmitvalues] = useState({
    user_id: localStorage.getItem('user_id'),
    trip_name: '',
    city_code: '',
    start_trip_date: '',
    end_trip_date: '',
    hotel_id: '',
    rating_point: 0,
    trip_data: '',
    lat:0,
    lng:0,
  })
  const classes = plannerUseStyles();
  function setTripname(p){
    setSubmitvalues({...submitvalues, trip_name: p})  
  }
  function setCitycode(p){
    setSubmitvalues({...submitvalues, city_code: p})  
  }
  function setHotelname(p,lat,lng){
    setSubmitvalues({...submitvalues, hotel_id: p, lat:lat, lng:lng}) 
  }
  function addDatestart(p){
    setSubmitvalues({...submitvalues, start_trip_date: p})  
  }
  function addDateend(p){
    setSubmitvalues({...submitvalues, end_trip_date: p})  
  }
  function submitForm(data) {
    setPlaces(data.lat,data.lng)
    console.log('submitform: ',data)  
    axios.post("http://104.248.7.194:8000/api/trip_title_api/",{
      user_id: data.user_id,
      trip_name: data.trip_name,
      city_code: data.city_code,
      start_trip_date: data.start_trip_date,
      end_trip_date: data.end_trip_date,
      hotel_id: data.hotel_id,
      rating_point: data.rating_point,
      trip_data: data.trip_data,
    },{
      headers: {
        'Content-Type': 'application/json'
    }})
      .then(function (response) {
      console.log('TripResponse:',response.data);
    })
      .catch(function (error) {
      console.log('TripError:',error);
    });
  }
  return(
    <Container fluid noGutters={true}>
    <div className={classes.paper}>
      <form className={classes.form} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16}}>ชื่อทริป :</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField required id="standard-required" label="ชื่อทริป" style={{width:'100%',marginTop:-18}}
            onChange={e => {
              setTripname(e.target.value)
            }} 
            />
          </Grid>
          <Grid item xs={3}>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16}}>ชื่อจังหวัด :</Typography>
          </Grid>
          <Grid item xs={9}>
            <CityName 
            setCitycode={setCitycode}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16}}>วันที่ไป :</Typography>
          </Grid>
          <Grid item xs={9}>
            <DateStart
            addDatestart = {addDatestart}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16}}>วันที่กลับ :</Typography>
          </Grid>
          <Grid item xs={9}>
            <DateEnd
             addDateend = {addDateend}
             />
          </Grid>
          <Grid item xs={3}>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16}}>ที่พัก :</Typography>
          </Grid>
          <Grid item xs={9}>
            <HotelName
            setHotelname={setHotelname}
            />
          </Grid>
        </Grid>
        <InputGroup style={{width:'80%'}}>
              <Button
                    variant="contained"
                    color="primary"
                    style={{width:'30%',height:'8%',margin:'5%',marginLeft:'45%',marginTop:'7%'}}
                    onClick={() => {
                      submitForm(submitvalues) 
                    }}
                >ยืนยัน</Button>
            </InputGroup>
      </form>
    </div>
  </Container>

  );
}

{/*     ////////       main     ///////    */ }
export class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      places:{
        lat: 0,
        lng: 0,
      }
    }
  }
  setPlace(p,q){
    console.log("PQ:",p,q)
    this.setState({places:{lat:p ,lng:q+0.0022141 }})
    console.log("places:",this.state.places)
  }
  componentDidMount(){ 
    let data; 
    axios 
        .get("http://104.248.7.194:8000/api/login/") 
        .then((res) => { 
            if(localStorage.getItem('username')==null){
              this.props.history.push('/pages/Login')
            }
        }) 
        .catch((err) => {}); 
} 

  render() {
    this.setPlace = this.setPlace.bind(this);
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
      <Container fluid >            
      <Row 
      >
          <Paper elevation={5} style={{width:'30%',minHeight:637,height:'90%',marginTop:'5%',marginBottom:'5%',marginLeft:'3%'}}>
            <Card style={{backgroundColor:'#284B63',width:'auto'}}>
              <CardContent style={{color:'white'}}>
                <Typography style={{margin:10, fontFamily:"csPrajad" ,fontSize:20,fontWeight:'bold'}}>ข้อมูลทริป และเลือกที่พัก</Typography>
              </CardContent>
            </Card>
            <PlannerForm 
              setPlaces={this.setPlace}
            >
            </PlannerForm>
            <InputGroup style={{width:'100%',height:180}}>
              {/*    Hotel Map    */}
                <Map
                google={this.props.google}
                zoom={17}
                style={{width:'95%',height:'100%',margin:'2.5%'}}
                //disableDefaultUI ={true}
                scrollwheel={false}
                disableDoubleClickZoom = {true}
                draggable={false}
                zoomControl={false}
                onReady={this.handleMapReady}
                onBounds_changed={this.handleMapMount}
                initialCenter={
                  {
                    lat:  12.9346861,
                    lng:  100.901878
                  }
                }
                center={{ lat:this.state.places.lat, lng: this.state.places.lng}}
              >
              <Marker
                // onClick={this.onMarkerClick}
                //name = {s.pname_th}
                position={{ lat:this.state.places.lat, lng: this.state.places.lng}}
              />
              </Map>     
            </InputGroup>
          </Paper>

          <Paper elevation={5} style={{width:'30%',minHeight:637,height:'90%',marginTop:'5%',marginBottom:'5%',marginLeft:'2%'}}>
            <Card style={{backgroundColor:'#284B63',width:'auto'}}>
              <CardContent style={{color:'white'}}>
              <Typography style={{margin:10, fontFamily:"csPrajad" ,fontSize:20,fontWeight:'bold'}}>จัดการทริป</Typography>
              </CardContent>
            </Card>
            {/*test Accordion--------*/}
            <CreateAccordion/>
          </Paper> 

          <Paper elevation={5} style={{width:'30%',minHeight:637,height:'90%',marginTop:'5%',marginBottom:'5%',marginLeft:'2%'}}>
            <Card style={{backgroundColor:'#284B63',width:'auto'}}>
              <CardContent style={{color:'white'}}>
              <Typography style={{margin:10, fontFamily:"csPrajad" ,fontSize:20,fontWeight:'bold'}}>แผนที่ทริป</Typography>
              </CardContent>
            </Card>
            <InputGroup style={{width:'100%',minHeight:547}}>
              {/*    Hotel Map    */}
                <Map
                google={this.props.google}
                zoom={13}
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
              />     
            </InputGroup>
          </Paper>  
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


