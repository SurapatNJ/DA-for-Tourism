import React , {Component, Fragment, useRef } from 'react';
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
import {Typography,Button,Paper,Grid,Tab,Tabs,Box,TextField,Select,InputLabel,MenuItem,FormControl,Fab,IconButton,Card,CardContent,Divider,Avatar,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TableFooter,TablePagination,Collapse,Portal,Checkbox,FormControlLabel,Radio,RadioGroup,FormGroup} from "@material-ui/core";


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
//Google Map
import { Map, GoogleApiWrapper,Rectangle,HeatMap,Marker} from 'google-maps-react';
import { ThumbDownAltRounded, ThumbsUpDownOutlined } from '@material-ui/icons';



//------------------ Input -----------------------//
export function CityName() {
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
      />
    </div>
  );
}


export function HotelName() {
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
        style={{width:'55%',marginTop:-18}}
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
        style={{width:'55%',marginTop:-18}}
        InputLabelProps={{
          shrink: true,
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
    <div style={{ width: '100%'}}>
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
/*
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
*/



//----------------- Table ----------------//
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontFamily: 'csPrajad',
    fontSize: 18,
    fontWeight: 'bold',
    width:'30%'
  },
  body: {
    fontSize: 16,
    fontFamily: 'csPrajad'
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(tripName, dateAndTime, updateData) {
  return { tripName, dateAndTime, updateData };
}

const useStyles = makeStyles({
  table: {
    Width: '100%',
  },
});
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  alert: {

    margin: theme.spacing(1, 3),
  },
}));

const rows = [
  /////ex data
  createData('ชลบุรี', '30/01/2021 10:52AM'),
  createData('ทริป', '31/01/2021 18:21PM'),
  createData('ทริป101', '04/02/2021 01:23AM'),
];

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function CustomizedTables() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ชื่อทริป</StyledTableCell>
            <StyledTableCell align="center">วัน-เวลาที่สร้าง</StyledTableCell>
            <StyledTableCell align="center">แก้ไข/ลบ</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.tripName}
              </StyledTableCell>
              <StyledTableCell align="center">{row.dateAndTime}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton aria-label="edit" size="small"><EditRoundedIcon/></IconButton>   <IconButton aria-label="delete" size="small"><DeleteForeverRoundedIcon/></IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 63 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TablePagination
                count={rows.length}
                labelRowsPerPage=''
                rowsPerPageOptions=''
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}



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
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div>
      <Paper elevation={0}>
      <Scrollbars style={{height:550}}>
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
            <form className={classes2.form} noValidate>
              <Grid container spacing={2} style={{marginTop:-20}}>
                <Grid item xs={12}>
                  <InputGroup>
                    <AssistantOutlinedIcon/>
                    <Typography style={{fontFamily:"csPrajad" ,fontSize:20}}>แนะนำทริป</Typography>
                  </InputGroup>
                </Grid>
                <Grid item xs={12}>
                    <Place_cat/>
                </Grid>
                <Grid item xs={12}>
                     <RatingClick/>
                </Grid>
                  <Divider style={{marginTop:5}}/>
                <Grid item xs={4}>
                <Typography style={{fontFamily:"csPrajad" ,fontSize:14,marginBottom:15}}>8.00.00-11.00</Typography>
                </Grid>
                <Grid item xs={8}>   
                    <PlaceName/>
                </Grid>
                <Grid item xs={4}>
                    <Typography style={{fontFamily:"csPrajad" ,fontSize:14,marginBottom:15}}>11.00-12.00</Typography>
                </Grid>    
                <Grid item xs={8}>   
                    <PlaceName/>
                </Grid>
                <Grid item xs={4}>
                    <Typography style={{fontFamily:"csPrajad" ,fontSize:14,marginBottom:15}}>12.00-15.00</Typography>
                </Grid>
                <Grid item xs={8}>   
                    <PlaceName/>
                </Grid>
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
            <form className={classes2.form} noValidate>
              <Grid container spacing={2} style={{marginTop:-20}}>
                <Grid item xs={12}>
                  <InputGroup>
                    <AssistantOutlinedIcon/>
                    <Typography style={{fontFamily:"csPrajad" ,fontSize:20}}>แนะนำทริป</Typography>
                  </InputGroup>
                </Grid>
                <Grid item xs={12}>
                    <Place_cat/>
                </Grid>
                <Grid item xs={12}>
                     <RatingClick/>
                </Grid>
                <Grid item xs={4}>
                    <Typography style={{fontFamily:"csPrajad" ,fontSize:14,marginBottom:15}}>08.00-11.00</Typography>
                </Grid>
                <Grid item xs={8}>   
                    <PlaceName/>
                </Grid>
                <Grid item xs={4}>
                    <Typography style={{fontFamily:"csPrajad" ,fontSize:14,marginBottom:15}}>11.00-12.00</Typography>
                </Grid>    
                <Grid item xs={8}>   
                    <PlaceName/>
                </Grid>
                <Grid item xs={4}>
                    <Typography style={{fontFamily:"csPrajad" ,fontSize:14,marginBottom:15}}>12.00-15.00</Typography>
                </Grid>
                <Grid item xs={8}>   
                    <PlaceName/>
                </Grid>
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

}));

export function PlannerForm() {
  const classes = plannerUseStyles();
  return(
    <Container fluid noGutters={true}>
    <div className={classes.paper}>
      <form className={classes.form} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16}}>ชื่อทริป :</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField required id="standard-required" label="ชื่อทริป" style={{width:'100%',marginTop:-18}}/>
          </Grid>
          <Grid item xs={3}>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16}}>ชื่อจังหวัด :</Typography>
          </Grid>
          <Grid item xs={9}>
            <CityName/>
          </Grid>
          <Grid item xs={3}>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16}}>วันที่ไป :</Typography>
          </Grid>
          <Grid item xs={9}>
            <DateStart/>
          </Grid>
          <Grid item xs={3}>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16}}>วันที่กลับ :</Typography>
          </Grid>
          <Grid item xs={9}>
            <DateEnd/>
          </Grid>
          <Grid item xs={3}>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16}}>ที่พัก :</Typography>
          </Grid>
          <Grid item xs={9}>
            <HotelName/>
          </Grid>
        </Grid>
      </form>
    </div>
  </Container>

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
      <Container fluid >
             
      <Row>
          <Paper elevation={5} style={{width:'30%',minHeight:637,height:'90%',marginTop:'5%',marginBottom:'5%',marginLeft:'3%'}}>
            <Card style={{backgroundColor:'#284B63',width:'auto'}}>
              <CardContent style={{color:'white'}}>
                <Typography style={{margin:10, fontFamily:"csPrajad" ,fontSize:20,fontWeight:'bold'}}>ข้อมูลทริป และเลือกที่พัก</Typography>
              </CardContent>
            </Card>
            <PlannerForm/>
            <InputGroup style={{width:'100%',height:180}}>
              {/*    Hotel Map    */}
                <Map
                google={this.props.google}
                zoom={17}
                style={{width:'95%',height:'100%',margin:'2.5%'}}
                disableDefaultUI ={true}
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
              >
            {hotelOptions.map(hotelOptions=>(
              <Marker key={hotelOptions.Hotel_name[1]} position={{lat:hotelOptions.lat,lng:hotelOptions.lng}} />
            ))}
              </Map>     
            </InputGroup>
            <InputGroup style={{width:'80%'}}>
              <Button
                    variant="contained"
                    color="primary"
                    style={{width:'30%',height:'8%',margin:'5%',marginLeft:'45%',marginTop:'7%'}}
                >Submit</Button>
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


