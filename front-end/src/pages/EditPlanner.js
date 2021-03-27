import React , {Component, Fragment, useEffect, useRef, useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import options from '../data/PlaceData';
import Jumbotron from 'react-bootstrap/Jumbotron';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link, Redirect } from 'react-router-dom';
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
import DeleteIcon from '@material-ui/icons/Delete';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import axios from 'axios';

//Google Map
import { Map, GoogleApiWrapper,Rectangle,HeatMap,InfoWindow,Marker} from 'google-maps-react';
import { ThumbDownAltRounded, ThumbsUpDownOutlined } from '@material-ui/icons';



//------------------ Input -----------------------//

export function TripName(val) {
  return (console.log("TripName:",val))
}

export function CityName({setCitycode,valuedefault}) {
  // console.log(cityOptions.find(e => e.city_code === valuedefault))
  const defaultProps = {
    options: cityOptions,
    getOptionLabel: (option) => option.cname_th +" ("+ option.cname_en +")",
  }
  var format = 
    [{
      city_code:"",
      cname_th: "",
      cname_en:""
    }]
  if (valuedefault !== "")
  {
    format = 
    [{
      city_code:valuedefault,
      cname_th:cityOptions.find(e => e.city_code === valuedefault).cname_th,
      cname_en:cityOptions.find(e => e.city_code === valuedefault).cname_en
    }]
    // console.log("format",format)
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
        value={format[0]}
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


export function HotelName({setHotelname,valuedefault}) {
  // console.log(valuedefault,"options",hotelOptions.find(e => e.Id == valuedefault))
  const defaultProps = {
    options: hotelOptions,
    getOptionLabel: (option) => option.Hotel_name,
  }
  var format = 
    [{
      Id:0,
      Hotel_name: "",
      Coordinate:"",
      lat:"",
      lng: 0,
      Attitude:"",
    }]
  if (valuedefault !== "")
  {
    format = 
    [{
      Id:hotelOptions.find(e => e.Id == valuedefault).Id,
      Hotel_name: hotelOptions.find(e => e.Id == valuedefault).Hotel_name,
      Coordinate:"",
      lat:hotelOptions.find(e => e.Id == valuedefault).lat,
      lng: hotelOptions.find(e => e.Id == valuedefault).lng,
      Attitude:""
    }]
    console.log("format",format)
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
        value = {format[0]}
      />
    </div>
  );
}

export function DateStart({addDatestart,valuedefault}) {
  return (
    <form noValidate>
      <TextField
        id="dateStart"
        label="วันที่เริ่มต้น"
        type="date"
        required id="standard-required" 
        style={{width:'100%',marginTop:-18}}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event, value) => {
          addDatestart(event.target.value)
          console.log("value:",event.target.value)
        }}
        value={valuedefault}
      />
    </form>
  );
}

export function DateEnd({addDateend,valuedefault}) {
  return (
    <form noValidate>
      <TextField
        id="dateEnd"
        label="วันที่สิ้นสุด"
        type="date"
        required id="standard-required" 
        style={{width:'100%',marginTop:-18}}
        InputLabelProps={{
          shrink: true,
        }}
        // value={defaultDateend}
        onChange={(event, value) => {
          addDateend(event.target.value)
          console.log("value:",event.target.value)
        }}
        value={valuedefault}
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

export function Place_cat({addCattype}) {
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
        onChange={(event, value) => {
          console.log("value:",value)
          addCattype(value)
      }}
     />
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

export function CreateAccordion({datainterval,setMarker,setRedirect,setData}){
  const [submitvalues,setSubmitvalues] = useState({
    trip_type:[],
    trip_data:[{
      datetime_start:"",
      date_end:"",
      poi:"",
      lat:0,
      lon:0,
      locked:true
    }],
    start:"2020-11-29",
    end:"2020-12-03",
    hotel_id:"",
    trip_name:"",
    city_code: '',
    rating_point: ''
  })
  const [rowdatas,setRowdatas] = useState({
    date:[{
      id:0,
      trips:[{
        id:0,
        start: "09:00",
        end: "12:00",
        place: ""
      },
      {
        id:1,
        start: "12:00",
        end: "15:00",
        place: ""
      },
      {
        id:2,
        start: "15:00",
        end: "18:00",
        place: ""
      }]
    }]
  })
  useEffect(() => { 
    const fetch = () => { 
      if (setData.trip_data.length != 0)
      {
        setRowdatas({...rowdatas,date:setData.trip_data})
        console.log("rowdatas",rowdatas)
      }
    }
    fetch()
  },[setData])

  const classes2 = plannerUseStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  function SetTime({time,index,id,type}) {
    const [starttime, setStarttime] = React.useState("00:00");
    var arraysettime = rowdatas.date
    // console.log(arraysettime)
    useEffect(() => {
      const fetch = () => {
        setStarttime(time)
      }
      // console.log(starttime)
      fetch()
      },[time])
      // rowdatas.date[index].trips[id].place
    const handleChangeSetTime = (event) => {
      if (type == 'start'){
        setStarttime(event.target.value);
        arraysettime[index].trips[id].start = event.target.value
      }
      else if (type == 'end' && event.target.value > rowdatas.date[index].trips[id].start){
        setStarttime(event.target.value);
        arraysettime[index].trips[id].end = event.target.value
      }
      else alert("เวลาไม่ถูกต้อง")
      // rowdatas.date[index].trips[id] = arraysettime[index].trips[id]   
    };
    // console.log(arraysettime[index].trips[id])
    return (
      <div>
        <FormControl  size="small" >
          <Select
            labelId="selectStartTime"
            id="selectStartTime"
            onChange={handleChangeSetTime}
            value={starttime}
          >
            <MenuItem value={"00:00"}>00:00</MenuItem>
            <MenuItem value={"01:00"}>01:00</MenuItem>
            <MenuItem value={"02:00"}>02:00</MenuItem>
            <MenuItem value={"03:00"}>03:00</MenuItem>
            <MenuItem value={"04:00"}>04:00</MenuItem>
            <MenuItem value={"05:00"}>05:00</MenuItem>
            <MenuItem value={"06:00"}>06:00</MenuItem>
            <MenuItem value={"07:00"}>07:00</MenuItem>
            <MenuItem value={"08:00"}>08:00</MenuItem>
            <MenuItem value={"09:00"}>09:00</MenuItem>
            <MenuItem value={"10:00"}>10:00</MenuItem>
            <MenuItem value={"11:00"}>11:00</MenuItem>
            <MenuItem value={"12:00"}>12:00</MenuItem>
            <MenuItem value={"13:00"}>13:00</MenuItem>
            <MenuItem value={"14:00"}>14:00</MenuItem>
            <MenuItem value={"15:00"}>15:00</MenuItem>
            <MenuItem value={"16:00"}>16:00</MenuItem>
            <MenuItem value={"17:00"}>17:00</MenuItem>
            <MenuItem value={"18:00"}>18:00</MenuItem>
            <MenuItem value={"19:00"}>19:00</MenuItem>
            <MenuItem value={"20:00"}>20:00</MenuItem>
            <MenuItem value={"21:00"}>21:00</MenuItem>
            <MenuItem value={"22:00"}>22:00</MenuItem>
            <MenuItem value={"23:00"}>23:00</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
  function RatingClick({data,rowdata,heading}) {
    const [show, setShow] = React.useState(false);
    const container = React.useRef(null);
    const handleClick = () => {
      let daycount = 0
      const tripdatas = []
      for (var d = new Date(data.start); d <= new Date(data.end); d.setDate(d.getDate() + 1)){
        var format = new Date(d).getFullYear() +"-"+ ("0"+(new Date(d).getMonth()+1)).slice(-2) +"-"+ ("0"+new Date(d).getDate()).slice(-2)
        for (var j = 0; j< rowdata.date[daycount].trips.length; j++){
        // console.log(format+" "+rowdata.date[daycount].trips[j].start)
        if(rowdata.date[daycount].trips[j].place !== "" && placeOptions.find(x => x.id === rowdata.date[daycount].trips[j].place) !== undefined){ 
          tripdatas.push({
          datetime_start:format+" "+rowdata.date[daycount].trips[j].start+":00",
          datetime_end:format+" "+rowdata.date[daycount].trips[j].end+":00",
          trip_type:"",
          poi:placeOptions.find(el => el.id === rowdata.date[daycount].trips[j].place).poi,
          // lat:placeOptions.find(el => el.id === rowdata.date[daycount].trips[j].place).lat.toFixed(3),
          // lon:placeOptions.find(el => el.id === rowdata.date[daycount].trips[j].place).lon.toFixed(3),
          lat:0,
          lon:0,
          locked:true
          })
        }
        else if(rowdata.date[daycount].trips[j].place !== "" && placeOptions.find(x => x.trip_type === rowdata.date[daycount].trips[j].place) !== undefined){ 
          tripdatas.push({
            datetime_start:format+" "+rowdata.date[daycount].trips[j].start+":00",
            datetime_end:format+" "+rowdata.date[daycount].trips[j].end+":00",
            trip_type:placeOptions.find(el => el.trip_type === rowdata.date[daycount].trips[j].place).trip_type,
            poi:"",
            // lat:placeOptions.find(el => el.id === rowdata.date[daycount].trips[j].place).lat.toFixed(3),
            // lon:placeOptions.find(el => el.id === rowdata.date[daycount].trips[j].place).lon.toFixed(3),
            lat:0,
            lon:0,
            locked:false
            })
        }
          else{
            tripdatas.push({
            datetime_start:format+" "+rowdata.date[daycount].trips[j].start+":00",
            datetime_end:format+" "+rowdata.date[daycount].trips[j].end+":00",
            trip_type:"",
            poi:"",
            lat:0,
            lon:0,
            locked:false
            })
          }
        }
        daycount+=1
      }
      setShow(true);
      console.log("\ntrip_type:",data.trip_type,
        "\ndate_start:",data.start,
        "\ndate_end:",data.end,
        "\nhotel_id:",data.hotel_id,
        "\ntrip_data:",tripdatas,
        "\ndate_analysis:",heading)
      axios.post("http://104.248.7.194:8000/api/trip_detail_analysis/",{
        trip_type:data.trip_type,
        date_start:data.start,
        date_end:data.end,
        hotel_id:data.hotel_id,
        trip_data:tripdatas,
        date_analysis:heading
      },{
        headers: {
          'Content-Type': 'application/json'
      }})
      .then(function (response) {
        console.log('FormResponse: ',response.data)
        var daycount = 0
        var responsecount = 0
        var array=[...rowdatas.date]
        for (var d = new Date(response.data[0].datetime_start); d <= new Date(response.data[response.data.length-1].datetime_start); d.setDate(d.getDate() + 1)){
          for (var f=0;f < (rowdatas.date[daycount].trips.length);f++){
            if (response.data[responsecount].poi!==""){
            console.log ("daycount",daycount)
            console.log ("f",f)
            console.log ("rescount",responsecount)
            console.log ("poi",response.data[responsecount].poi)
            console.log ("Input",placeOptions.find(el => el.poi === response.data[responsecount].poi).id)
            console.log ("InitialOutput:",array[daycount].trips[f].place)
            // console.log (
            //   "daycount",daycount,
            //   "f",f,"rescount",responsecount,
            //   "poi",response.data[responsecount].poi,
            //   "Input",placeOptions.find(el => el.poi === response.data[responsecount].poi).id,
            //   "InitialOutput:",array[daycount].trips[f].place
            // )
            // if (daycount==2)
            array[daycount].trips[f].place = placeOptions.find(el => el.poi === response.data[responsecount].poi).id
            responsecount+=1
            }
           // console.log(response.data[responsecount].poi,placeOptions.find(el => el.poi === response.data[responsecount].poi).id)
          }
          // console.log("X:",daycount,array[daycount])
          daycount+=1
        }
        rowdatas.date = array
        // console.log(rowdatas,array)
        alert("Trip Calculated")
        setMarker(rowdatas)
      })
      .catch(function (error) {
        console.log('FormError: ',error);
        // alert(error)
      });
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
  
  function RatingAllClick({data,rowdata}) {
    const [show, setShow] = React.useState(false);
    const container = React.useRef(null);
    const handleClick = () => {
      let daycount = 0
      const tripdatas = []
      for (var d = new Date(data.start); d <= new Date(data.end); d.setDate(d.getDate() + 1)){
        // console.log(d)
        var format = new Date(d).getFullYear() +"-"+ ("0"+(new Date(d).getMonth()+1)).slice(-2) +"-"+ ("0"+new Date(d).getDate()).slice(-2)
        for (var j = 0; j< rowdata.date[daycount].trips.length; j++){
        // console.log(format+" "+rowdata.date[daycount].trips[j].start)
          if(rowdata.date[daycount].trips[j].place !== "" && placeOptions.find(x => x.id === rowdata.date[daycount].trips[j].place) !== undefined){ 
            tripdatas.push({
            datetime_start:format+" "+rowdata.date[daycount].trips[j].start+":00",
            datetime_end:format+" "+rowdata.date[daycount].trips[j].end+":00",
            trip_type:"",
            poi:placeOptions.find(el => el.id === rowdata.date[daycount].trips[j].place).poi,
            // lat:placeOptions.find(el => el.id === rowdata.date[daycount].trips[j].place).lat.toFixed(3),
            // lon:placeOptions.find(el => el.id === rowdata.date[daycount].trips[j].place).lon.toFixed(3),
            lat:0,
            lon:0,
            locked:true
            })
          }
          else if(rowdata.date[daycount].trips[j].place !== "" && placeOptions.find(x => x.trip_type === rowdata.date[daycount].trips[j].place) !== undefined){ 
            tripdatas.push({
              datetime_start:format+" "+rowdata.date[daycount].trips[j].start+":00",
              datetime_end:format+" "+rowdata.date[daycount].trips[j].end+":00",
              trip_type:placeOptions.find(el => el.trip_type === rowdata.date[daycount].trips[j].place).trip_type,
              poi:"",
              // lat:placeOptions.find(el => el.id === rowdata.date[daycount].trips[j].place).lat.toFixed(3),
              // lon:placeOptions.find(el => el.id === rowdata.date[daycount].trips[j].place).lon.toFixed(3),
              lat:0,
              lon:0,
              locked:false
              })
          }
          else{
            tripdatas.push({
            datetime_start:format+" "+rowdata.date[daycount].trips[j].start+":00",
            datetime_end:format+" "+rowdata.date[daycount].trips[j].end+":00",
            trip_type:"",
            poi:"",
            lat:0,
            lon:0,
            locked:false
            })
          }
        }
        daycount+=1
      }
      setShow(true);
      console.log("\ntrip_type:",data.trip_type,
        "\ndate_start:",data.start,
        "\ndate_end:",data.end,
        "\nhotel_id:",data.hotel_id,
        "\ntrip_data:",tripdatas,
        "\ndate_analysis:","")
      axios.post("http://104.248.7.194:8000/api/trip_detail_analysis/",{
        trip_type:data.trip_type,
        date_start:data.start,
        date_end:data.end,
        hotel_id:data.hotel_id,
        trip_data:tripdatas,
        date_analysis:""
      },{
        headers: {
          'Content-Type': 'application/json'
      }})
      .then(function (response) {
        console.log('FormResponse: ',response.data)
        var daycount = 0
        var responsecount = 0
        var array=[...rowdatas.date]
        for (var d = new Date(response.data[0].datetime_start); d <= new Date(response.data[response.data.length-1].datetime_start); d.setDate(d.getDate() + 1)){
          for (var f=0;f < (rowdatas.date[daycount].trips.length);f++){
            console.log (
              "daycount",daycount,
              "f",f,"rescount",responsecount,
              "poi",response.data[responsecount].poi,
              "Input",placeOptions.find(el => el.poi === response.data[responsecount].poi).id,
              "InitialOutput:",array[daycount].trips[f].place
            )
            // if (daycount==2)
            array[daycount].trips[f].place = placeOptions.find(el => el.poi === response.data[responsecount].poi).id
            responsecount+=1
           // console.log(response.data[responsecount].poi,placeOptions.find(el => el.poi === response.data[responsecount].poi).id)
          }
          // console.log("X:",daycount,array[daycount])
          daycount+=1
        }
        rowdatas.date = array
        // console.log(rowdatas,array)
        alert("Trip Calculated")
        setMarker(rowdatas)
      })
      .catch(function (error) {
        console.log('FormError: ',error);
        alert(error)
      });
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
  //บันทึก
  function submitForm(data,rowdata) {
    const tripdatas = []
      let daycount = 0
      for (var d = new Date(data.start); d <= new Date(data.end); d.setDate(d.getDate() + 1)){
        // console.log(d)
        var format = new Date(d).getFullYear() +"-"+ ("0"+(new Date(d).getMonth()+1)).slice(-2) +"-"+ ("0"+new Date(d).getDate()).slice(-2)
        for (var j = 0; j< rowdata.date[daycount].trips.length; j++){
        // console.log(format+" "+rowdata.date[daycount].trips[j].start)
          if(rowdata.date[daycount].trips[j].place !== ""){ 
            console.log(rowdata.date[daycount].trips[j].place) 
            tripdatas.push({
            datetime_start:format+" "+rowdata.date[daycount].trips[j].start+":00",
            datetime_end:format+" "+rowdata.date[daycount].trips[j].end+":00",
            //trip_type:"",
            poi:placeOptions.find(el => el.id === rowdata.date[daycount].trips[j].place).poi,
            lat:placeOptions.find(el => el.id === rowdata.date[daycount].trips[j].place).lat,
            lon:placeOptions.find(el => el.id === rowdata.date[daycount].trips[j].place).lng,
            locked:true
            })
          }
          else{
            tripdatas.push({
            datetime_start:format+" "+rowdata.date[daycount].trips[j].start+":00",
            datetime_end:format+" "+rowdata.date[daycount].trips[j].end+":00",
            //trip_type:"",
            poi:"",
            lat:0,
            lon:0,
            locked:false
            })
          }
        }
        daycount+=1
      }
    console.log("DataSaved",
      "\nid:",setData.id,
      "\nuser_id:",localStorage.getItem('user_id'),
      "\ntrip_name:",data.trip_name,
      "\ncity_code:", data.city_code,
      "\nstart_trip_date:",data.start,
      "\nend_trip_date:",data.end,
      "\nhotel_id:",data.hotel_id,
      "\ntrip_data:",JSON.stringify(tripdatas))
    axios.put("http://104.248.7.194:8000/api/trip_title_api/"+setData.id,{
      user_id:localStorage.getItem('user_id'),
      trip_name:data.trip_name,
      city_code: data.city_code,
      start_trip_date:data.start,
      end_trip_date:data.end,
      hotel_id:data.hotel_id,
      trip_data:JSON.stringify(tripdatas)
    },{
      headers: {
        'Content-Type': 'application/json'
    }})
    .then(function (response) {
      console.log('FormResponse: ',response.data)
      setRedirect(response.data.id)
    })
    .catch(function (error) {
      alert(error)
      console.log('FormError: ',error);
    });
  }
  const [test,setTest] = useState(false)
  const handleToggle= (selected) => {
  setTest(!test)
    console.log("dateID",rowdatas.date[selected].id,"AddID:",Math.max.apply(Math,rowdatas.date[selected].trips.map(o => o.id))+1)
    var array=[...rowdatas.date[selected].trips]
    array.push({
      id: Math.max.apply(Math,rowdatas.date[selected].trips.map(o => o.id))+1,
      start: "00:00",
      end: "00:00",
      place: ""
    })
    rowdatas.date[selected].trips = array
  console.log("addData:",rowdatas)
  // setRowdatas(rowdatas)
  }

  const handleDelete= (selected,id) => {
    setTest(!test)
    if(id!==0){
      var array=[...rowdatas.date[selected].trips]
      if(array.length > 1)
        {
          console.log("DelID:",array.find(o => o.id === id).id)
          if (array.find(o => o.id === id).id === id)
          {
            array=array.filter(x => x.id !== id);
            console.log("POPsucessID:",id)
            rowdatas.date[selected].trips = [...array]
          }
          console.log("NewData:",rowdatas.date[selected])
        } 
    }
  }
  const [accordion_data,setAccordion_data] = useState([]);

  useEffect(() => {
    const fetch = () => {
      if (datainterval.start !== ""){
        setSubmitvalues({...submitvalues, 
          start: datainterval.start, 
          end:datainterval.end,
          hotel_id:datainterval.hotel_id,
          trip_name:datainterval.trip_name,
          city_code: datainterval.city_code,
          rating_point: datainterval.rating_point}) 
        console.log("submit:",submitvalues)
      }
      pushday(datainterval.start,datainterval.end)
      // console.log(accordion_data)
    } 
      // setRowdatas({...initialArray})
    fetch()
  },[datainterval])

  // useEffect(()=> {
  //   const fectchMarker = () => {
  //     console.log("123")
  //   }
  //   fectchMarker()
  // },[rowdatas])
  // const start = submitvalues.start
  // const end = submitvalues.end                                                        

  var daysOfYear = [];
  var daysOfYearOld = [];
  

  function pushday(start,end){
    const diffDate = (new Date(end) - new Date(start))/ (1000 * 60 * 60 * 24)
    // var temprowdatas = rowdatas;
    var tempaccordion_data = []
    for (var d = new Date(start); d <= new Date(end); d.setDate(d.getDate() + 1)) {
      var format = ("0"+new Date(d).getDate()).slice(-2) +"/"+ ("0"+(new Date(d).getMonth()+1)).slice(-2) +"/"+ new Date(d).getFullYear()
      var formatOld = new Date(d).getFullYear() +"-"+ ("0"+(new Date(d).getMonth()+1)).slice(-2) +"-" + ("0"+new Date(d).getDate()).slice(-2)
      daysOfYear.push(format);
      daysOfYearOld.push(formatOld);
    }           
    for(var i=0;i<=diffDate;i++){
      // console.log("temp",rowdatas,"\nrow",rowdatas)
      tempaccordion_data.push(
        {id: i,
        heading: daysOfYear[i],
        // date: daysOfYear[i].replaceAll("/","-")}
        date: daysOfYearOld[i]}
      )
      //console.log("i:",i,"rowdatas:",rowdatas)
      if (rowdatas.date.find(o => o.id === i)=== undefined )
      {
        rowdatas.date.push(
          {
            id: i,
            trips:[{
              id:0,
              start: "09:00",
              end: "12:00",
              place: ""
            },
            {
              id:1,
              start: "12:00",
              end: "15:00",
              place: ""
            },
            {
              id:2,
              start: "15:00",
              end: "18:00",
              place: ""
            }]
          }
        )
      }
    }
    setAccordion_data(tempaccordion_data)
    // setRowdatas({rowdatas})
  }
  

  function addCattype(p){
    setSubmitvalues({...submitvalues, trip_type: p})  
  }
  function addPlace(index,id,p){
    rowdatas.date[index].trips[id].place = p
    // console.log(rowdatas.date[index])
  }
  function PlaceName({index,id,placedefault}) {
    //setMarker(rowdatas)
    const defaultProps = {
      options: placeOptions,
      getOptionLabel: (option) => option.pname,
      groupBy:(option) => option.trip_type!=null? "ประเภทของสถานที่" : "ชื่อสถานที่ท่องเที่ยว"
    }
    var nameplace = placedefault
    console.log("TE",placedefault)
    if(placeOptions.find(x => x.id === rowdatas.date[index].trips[id].place) === undefined)
    {
      nameplace = placeOptions.find(x => x.trip_type === rowdatas.date[index].trips[id].place)
    }
    else nameplace = placeOptions.find(x => x.id === rowdatas.date[index].trips[id].place)
    console.log("TE2",nameplace)
    return (
      <div style={{ width: '100%',marginTop:-22}}>
        <Autocomplete
          {...defaultProps}
          autoComplete
          includeInputInList
          renderInput={(params) => <TextField  {...params} label="ชื่อสถานที่ท่องเที่ยว" />}
          value = {nameplace}
          onChange={(event, value)=>{
            if (value){
              console.log("value:",value,"index",index,"id",id)
              {value.trip_type==null? addPlace(index,id,value.id):addPlace(index,id,value.trip_type)}
              console.log("addPlace:",rowdatas.date[index])
            }
            else 
            {
              console.log("value:","","index",index,"id",id)
              rowdatas.date[index].trips[id].place = ""
              console.log("addPlace:","")
            }
            setTest(!test) 
            setMarker(rowdatas)
          }}
        />
      </div>
    );
  }
  function generateRows(index){
    return rowdatas.date[index].trips.map((d,i) => {
      // console.log("rowdatasIndex&D",index,d,i)
      return(
        <ListItem >
          <Grid item xs={4}>
          <InputGroup>
            <SetTime
            time={rowdatas.date[index].trips[i].start}
            index = {index}
            id = {i}
            type = "start"/>
            <Typography style={{marginTop:2,fontSize:20,marginLeft:5,marginRight:5}}>
              -
            </Typography>
            <SetTime 
            time={rowdatas.date[index].trips[i].end} 
            index = {index}
            id = {i}
            type = "end"/>
          </InputGroup>
          </Grid>
          <Grid item xs={7}>   
              <PlaceName 
              placedefault = {rowdatas.date[index].trips[i].place}
              index = {index}
              id = {i}/>
          </Grid>
          <Grid item xs={1}>
            {(Math.max.apply(Math,rowdatas.date[index].trips.map(o => o.id)) == d.id)? (
              <ListItemIcon>
                {(Math.max.apply(Math,rowdatas.date[index].trips.map(o => o.id)) == 4)? (
                  <IconButton size="small"></IconButton>
                  ):(
                    <IconButton size="small"><AddBoxIcon style={{ color: green[500]}} onClick={()=>handleToggle(index)}/></IconButton>
                  )
                }
                {(Math.max.apply(Math,rowdatas.date[index].trips.map(o => o.id)) == 0)? (
                  <IconButton size="small"></IconButton>
                  ):(
                    <IconButton size="small"><DeleteIcon onClick={()=>handleDelete(index,d.id)}/></IconButton>
                  )
                }
              </ListItemIcon>
              ):(
                <ListItemIcon> </ListItemIcon>
              )
            }
          </Grid>
        </ListItem>
      )
    })
  }
  // console.log("rowdatasinGenerate:",rowdatas)
  // console.log(accordion_data)
  return (
    <div>
      <Paper elevation={0}>
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
            <Place_cat
            addCattype = {addCattype}/>
           </Grid>
          </Grid>
        </form>
        </div>
        <Scrollbars style={{height:415}}>
        {accordion_data.map((accordion,index) => {
        const { id, heading,date} = accordion;
        // console.log("Accordian:",accordion)
        return ( 
          <Accordion
          expanded={expanded === id}
          key={id}
          onChange={handleChange(id)}
        >
          <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id={"panel1bh-header"}
              style={{backgroundColor:'#3C6E71',color:'white'}}
            >
              <Typography style={{fontFamily:'csPrajad'}}>วันที่ {heading}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper elevation={0} style={{width:'100%'}}>
                <div ClassName={classes2.paper}>
                <form className={classes2.form2} noValidate>
                  <Grid container style={{marginTop:-20}} >
                    <Grid item xs={12}>
                        <RatingClick
                        heading = {date}
                        data={submitvalues} 
                        rowdata={rowdatas}/>
                    </Grid>
                      <Divider style={{marginTop:5}}/>
                    <List style={{width:'100%',marginLeft:'-1%'}}>
                      {generateRows(index)}
                    </List>
                      <Divider style={{marginTop:15}}/>
                    </Grid>
                  </form>
                  </div>
                  </Paper>
              </AccordionDetails>
          </Accordion>
        );
      })}
        <Divider/>
        <div className={classes2.paper}>
        <form className={classes2.form} noValidate>
        <Grid container>
        <Grid item xs={10}><RatingAllClick data={submitvalues} rowdata={rowdatas}/></Grid>
        <Grid item xs={2}>
        <Button
              variant="contained"
              color="Secondary"
              style={{height:30}}
              onClick={() => {
                submitForm(submitvalues,rowdatas) 
              }}
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

const plannerUseStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  form2: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },

}));

export function PlannerForm({setPlaces,setDateIntervals,setRedirect,setData}) {
  const [submitvalues,setSubmitvalues] = useState({
    id: 0,
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
  useEffect(() => {
    const fetch = () => { 
      if (setData.trip_data.length != 0)
      {
        console.log("trip_data:", setData.trip_data)
        var arraychangepoi = setData
        // console.log("trip_data:", arraychangepoi.trip_data[0].trips[0])
        for (let daycount = 0; daycount < setData.trip_data.length; daycount++){
          for (let placecount = 0; placecount < setData.trip_data[daycount].trips.length; placecount++){
            if(arraychangepoi.trip_data[daycount].trips[placecount].place !== ""){
            var poitoplace = placeOptions.find(el => el.poi === arraychangepoi.trip_data[daycount].trips[placecount].place).id
            setData.trip_data[daycount].trips[placecount].place = poitoplace
            // console.log(setData)
            }   
          }
        }
      }
      console.log("SetDataPF:",setData)
      setSubmitvalues({...submitvalues, 
        trip_name: setData.trip_name,
        city_code: setData.city_code,
        start_trip_date:setData.start_trip_date,
        end_trip_date: setData.end_trip_date,
        hotel_id: setData.hotel_id,
        id: setData.id,
        trip_data: setData.trip_data
      })  
      // console.log("UseEffect(setData):",submitvalues)
    }
    fetch()
  },[setData])
  const classes = plannerUseStyles();
  function setId(p){
    setSubmitvalues({...submitvalues, id: p})  
  }
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
  // ยืนยัน
  function submitForm(data) {
    setPlaces(data.lat,data.lng)
    console.log('submitform: ',data)
    if(data.hotel_id !== '' && data.trip_name !== '')
    {   
      setDateIntervals(data)
      console.log("DataSent",
      "\nuser_id:", data.user_id,
      "\ntrip_name:", data.trip_name,
      "\ncity_code:", data.city_code,
      "\nstart_trip_date:", data.start_trip_date,
      "\nend_trip_date:", data.end_trip_date,
      "\nhotel_id:", data.hotel_id,
      "\nrating_point:", data.rating_point,
      "\ntrip_data:", data.trip_data,)
    //   axios.post("http://104.248.7.194:8000/api/trip_title_api/",
    //   {
    //     id: data.id,
    //     user_id: data.user_id,
    //     trip_name: data.trip_name,
    //     city_code: data.city_code,
    //     start_trip_date: data.start_trip_date,
    //     end_trip_date: data.end_trip_date,
    //     hotel_id: data.hotel_id,
    //     rating_point: data.rating_point,
    //     trip_data: data.trip_data,
    //   },{
    //     headers: {
    //       'Content-Type': 'application/json'
    //   }})
    //     .then(function (response) {
    //       console.log('TripResponse:',response.data);
    //       setRedirect(response.data.id)
    //     })
    //     .catch(function (error) {
    //     console.log('TripError:',error);
    //   });
    }
    else{
      alert("กรุณากรอบข้อมูลให้ครบถ้วน")
    }
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
              // console.log(setData)
            }} 
            value = {submitvalues.trip_name}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16}}>ชื่อจังหวัด :</Typography>
          </Grid>
          <Grid item xs={9}>
            <CityName 
            setCitycode={setCitycode}
            // value = {
            //   // submitvalues.city_code
            //   city_code:"CBI",
            //   cname_th:"ชลบุรี",
            //   cname_en:"Chon Buri"
            // }
            valuedefault = {submitvalues.city_code}
            />
            
          </Grid>
          <Grid item xs={3}>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16}}>วันที่ไป :</Typography>
          </Grid>
          <Grid item xs={9}>
            
            <DateStart
            addDatestart = {addDatestart}
            valuedefault  = {submitvalues.start_trip_date}  
            />
          </Grid>
          <Grid item xs={3}>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16}}>วันที่กลับ :</Typography>
          </Grid>
          <Grid item xs={9}>
            <DateEnd
             addDateend = {addDateend}
             valuedefault = {submitvalues.end_trip_date}
             />
          </Grid>
          <Grid item xs={3}>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16}}>ที่พัก :</Typography>
          </Grid>
          <Grid item xs={9}>
            <HotelName
            setHotelname={setHotelname}
            valuedefault = {submitvalues.hotel_id}
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
                      console.log(submitvalues)
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
    this.id = this.props.match.params.id
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      editdata:{
        id: 0,
        user_id: 0,
        trip_name: "",
        city_code: "",
        end_trip_date: "",
        hotel_id: "",
        trip_data: [],
        last_updated: "",
        created: ""
      },
      places:{
        lat: 0,
        lng: 0,
      },
      dateinterval:{
        start:'',
        end:'',
        hotel_id: '',
        trip_name: '',
        city_code: '',
        rating_point: ''
      },
      markerdata:{
        date:[{
          id:0,
            trips:[{
            id:0,
            start: "09:00",
            end: "12:00",
            place: ""
            },
            {
            id:1,
            start: "12:00",
            end: "15:00",
            place: ""
            },
            {
            id:2,
            start: "15:00",
            end: "18:00",
            place: ""
            }]
        }]
      },
      redirect: 0
    }
  }
  /*change to edit planner*/
  setRedirect = (id) => {
    this.setState({
      redirect: id
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={"/pages/EditPlanner/"+ this.state.redirect} />
    }
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
  setPlace(p,q){
    console.log("PQ:",p,q)
    this.setState({places:{lat:p ,lng:q+0.0022141 }})
  }
  setDateInterval(p){
    console.log("DI:",p)
    this.setState({dateinterval:{
      start:p.start_trip_date,
      end:p.end_trip_date,
      hotel_id:p.hotel_id,
      trip_name:p.trip_name,
      city_code:p.city_code,
      rating_point:p.rating_point
    }})
  }
  setMarker(data){
    this.setState({markerdata:data})
    // console.log(data,this.state.rowdatas)
  }
  async componentDidMount(){ 
    await axios 
        .get("http://104.248.7.194:8000/api/login/") 
        .then((res) => { 
            if(localStorage.getItem('username')==null){
              this.props.history.push('/pages/Login')
            }
        }) 
        .catch((err) => {}); 
    await axios 
        .get("http://104.248.7.194:8000/api/trip_title_api/"+this.id) 
        .then((res) => { 
            console.log("response data: ",res.data)
            this.setState({editdata:res.data})
            console.log("edit data: ",this.state.editdata)
        }) 
        .catch((err) => {}); 
  } 

  render() {
    this.setPlace = this.setPlace.bind(this);
    this.setDateInterval = this.setDateInterval.bind(this);
    this.setMarker = this.setMarker.bind(this);
    if (!this.state.editdata) {
      return "loading data";
    }
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

      
      <div>
        {this.renderRedirect()}
      </div>

      <section className="App-section">
      <Container fluid noGutters={true}>
      <Row>
      <Paper elevation={5} style={{width:'40%',height:'auto',marginTop:'5%',marginLeft:'7.5%'}}>
            <Card style={{backgroundColor:'#284B63',width:'auto'}}>
              <CardContent style={{color:'white'}}>
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                <Typography style={{margin:10, fontFamily:"csPrajad" ,fontSize:20,fontWeight:'bold'}}>ข้อมูลทริป และเลือกที่พัก</Typography>
              </Grid>
              </CardContent>
            </Card>
            <PlannerForm 
              setPlaces={this.setPlace}
              setDateIntervals={this.setDateInterval}
              setRedirect={this.setRedirect}
              setData={this.state.editdata}
            >
            </PlannerForm>
            <InputGroup style={{width:'100%',height:180}}>
              {/*    Hotel Map    */}
                <Map
                google={this.props.google}
                zoom={17}
                style={{width:'100%',height:'100%'}}
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
                icon=
                // "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              
                {{
                  path:
                  "M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z",                  fillColor: "blue",
                  fillColor: "blue",
                  fillOpacity: 1,
                  strokeWeight: 1,
                  strokeOpacity: 1,
                  rotation: 0,
                  scale: 2,
                  anchor: new this.props.google.maps.Point(11.5, 20),
                }}
              />
              </Map>     
            </InputGroup>
      </Paper>

      <Paper elevation={5} style={{width:'40%',height:'auto',marginTop:'5%',marginLeft:'5%'}}>   
        <Card style={{backgroundColor:'#284B63',width:'auto'}}>
                <CardContent style={{color:'white'}}>
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                <Typography style={{margin:10, fontFamily:"csPrajad" ,fontSize:20,fontWeight:'bold'}}>จัดการทริป</Typography>
                </Grid>
                </CardContent>
              </Card>
              <CreateAccordion 
              setRedirect={this.setRedirect}
              datainterval={this.state.dateinterval}
              setMarker={this.setMarker}
              setData={this.state.editdata}
              />
      </Paper>
      </Row>   


      <Paper elevation={5} style={{width:'90%',height:'auto',margin:'5%'}}>
        <Row noGutters>
            <Col xs={12}>
            <Card style={{backgroundColor:'#284B63',width:'auto'}}>
              <CardContent style={{color:'white'}}>
              <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
              <Typography style={{margin:10, fontFamily:"csPrajad" ,fontSize:20,fontWeight:'bold'}}>แผนที่ทริป</Typography>
              </Grid>
              </CardContent>
            </Card>
            <InputGroup style={{width:'100%',minHeight:547}}>
              {/*    แผนที่ทริป */}
                <Map
                google={this.props.google}
                zoom={10}
                style={{width:'100%',height:'auto'}}
                // streetViewControl= {false}
                //disableDefaultUI ={true}
                // scrollwheel={false}
                // disableDoubleClickZoom = {true}
                onClick={this.onMapClicked}
                // draggable={false}
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
                {this.state.markerdata.date.map((date,dateindex) => { 
                  return(
                  date.trips.map((trips,tripsindex) => {
                    // console.log("Test2:",trips)
                    // console.log(placeOptions.find(el => el.id === trips.place))
                    if(trips.place!== ""&&placeOptions.find(el => el.id === trips.place) !== undefined){
                      return(
                        <Marker
                        onClick={this.onMarkerClick}
                        // onClick={trips[tripsindex].onMarkerClick}
                        date = {trips.id+1}
                        start = {trips.start}
                        end = {trips.end}
                        name = {placeOptions.find(el => el.id === trips.place).pname}
                        position={{ lat:placeOptions.find(el => el.id === trips.place).lat, lng: placeOptions.find(el => el.id === trips.place).lon}}
                        />
                      )
                    }
                  }))
                })}
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onInfoWindowClose}>
                    <div>
                      <p>วันที่{this.state.selectedPlace.date}</p>
                      <p>เวลา: {this.state.selectedPlace.start} - {this.state.selectedPlace.end}</p>
                      <p>ชื่อสถานที่: {this.state.selectedPlace.name}</p>
                    </div>
                </InfoWindow>

                </Map>
            </InputGroup>
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


