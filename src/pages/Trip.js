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
import {Typography,Button,Paper,Tab,Tabs,Box,TextField,Select,InputLabel,MenuItem,FormControl,Fab,IconButton,Card,CardContent,Divider,Avatar,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TableFooter,TablePagination,Collapse} from "@material-ui/core";
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

//Google Map
import { Map, GoogleApiWrapper,Rectangle,HeatMap,Marker} from 'google-maps-react';




//------------------ Input -----------------------//
export function CityName() {
  const defaultProps = {
    options: cityOptions,
    getOptionLabel: (option) => option.cname_th +" ("+ option.cname_en +")",
  }
  return (
    <div style={{ width: '60%' ,height:'20%'}}>
      <Autocomplete
        {...defaultProps}
        id="cityName"
        autoComplete
        includeInputInList
        renderInput={(params) => <TextField {...params} label="ชื่อจังหวัด"   required id="standard-required" style={{marginLeft:10}}/>}
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
    <div style={{ width: '75%' ,height:'20%'}}>
      <Autocomplete
        {...defaultProps}
        id="placeName"
        autoComplete
        includeInputInList
        renderInput={(params) => <TextField  {...params} label="ชื่อสถานที่ท่องเที่ยว"  style={{marginLeft:10}}/>}
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
        renderInput={(params) => <TextField {...params} label="โหมดสถานที่"  required id="standard-required"  style={{marginLeft:10}}/>}
      />
    </div>
  );
}


export function HotelName() {
  const defaultProps = {
    options: hotelOptions,
    getOptionLabel: (option) => option.hname,
  }
  return (
    <div style={{ width: '60%' ,height:'20%'}}>
      <Autocomplete
        {...defaultProps}
        id="hotelName"
        autoComplete
        includeInputInList
        renderInput={(params) => <TextField {...params} label="โรงแรม/ที่พัก"  required id="standard-required"  style={{marginLeft:10}}/>}
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
        style={{width:'100%',marginLeft:'13%'}}
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
        style={{width:'100%',marginLeft:'5%'}}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
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
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Paper elevation={0} style={{height:'50%'}}>

      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}> 
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
                  <InputGroup>
                      <Button
                          variant="contained"
                          color="primary"
                          style={{margin:'5%',width:100}}
                      >สุ่มทริป</Button>
                  </InputGroup>
                  <InputGroup>
                    <Typography style={{fontFamily:"csPrajad" ,fontSize:14,padding:5,marginTop:15,marginBottom:15}}>08.00-11.00</Typography>
                    <PlaceName/>
                  </InputGroup>
                  <InputGroup>
                    <Typography style={{fontFamily:"csPrajad" ,fontSize:14,padding:5,marginTop:15,marginBottom:15}}>11.00-12.00</Typography>
                    <PlaceName/>
                  </InputGroup>
                  <InputGroup>
                    <Typography style={{fontFamily:"csPrajad" ,fontSize:14,padding:5,marginTop:15,marginBottom:15}}>12.00-15.00</Typography>
                    <PlaceName/>
                  </InputGroup>
                </Paper>
        </AccordionDetails>
      </Accordion>
    
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
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
                  <InputGroup>
                      <Button
                          variant="contained"
                          color="primary"
                          style={{margin:'5%',width:100}}
                      >สุ่มทริป</Button>
                  </InputGroup>
                  <InputGroup>
                    <Typography style={{fontFamily:"csPrajad" ,fontSize:14,padding:5,marginTop:15,marginBottom:15}}>08.00-11.00</Typography>
                    <PlaceName/>
                  </InputGroup>
                  <InputGroup>
                    <Typography style={{fontFamily:"csPrajad" ,fontSize:14,padding:5,marginTop:15,marginBottom:15}}>11.00-12.00</Typography>
                    <PlaceName/>
                  </InputGroup>
                  <InputGroup>
                    <Typography style={{fontFamily:"csPrajad" ,fontSize:14,padding:5,marginTop:15,marginBottom:15}}>12.00-15.00</Typography>
                    <PlaceName/>
                  </InputGroup>
                </Paper>
        </AccordionDetails>
      </Accordion>
      

      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{backgroundColor:'#3C6E71',color:'white'}}
        >
          <Typography style={{fontFamily:'csPrajad',fontSize:'18',fontWeight:'bold'}}>วันที่ 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Paper elevation={0} style={{width:'100%'}}>
                  <InputGroup>
                      <Button
                          variant="contained"
                          color="primary"
                          style={{margin:'5%',width:100}}
                      >สุ่มทริป</Button>
                  </InputGroup>
                  <InputGroup>
                    <Typography style={{fontFamily:"csPrajad" ,fontSize:14,padding:5,marginTop:15,marginBottom:1}}>08.00-11.00</Typography>
                    <PlaceName/>
                  </InputGroup>
                  <InputGroup>
                    <Typography style={{fontFamily:"csPrajad" ,fontSize:14,padding:5,marginTop:15,marginBottom:15}}>11.00-12.00</Typography>
                    <PlaceName/>
                  </InputGroup>
                  <InputGroup>
                    <Typography style={{fontFamily:"csPrajad" ,fontSize:14,padding:5,marginTop:15,marginBottom:15}}>12.00-15.00</Typography>
                    <PlaceName/>
                  </InputGroup>
                </Paper>
        </AccordionDetails>
      </Accordion>
      
        <Row>
        <Col md={{ span: 6, offset: 6 }}>
            <InputGroup style={{margin:'5%'}}>
            <Button
                    variant="outlined"
                    color="primary"
                    
                >สุ่มทริป</Button>
            <Button
                    variant="contained"
                    color="primary"
                    style={{marginInline:'10%'}}
                >บันทึก</Button>
            </InputGroup>
            </Col>
        </Row>
      </Paper>
    </div>
  );
}


export function NewTripClick(){
  const [clicked, setClicked] = React.useState(false);
  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div>
      <Fab
        variant="extended"
        size="large"
        color="secondary"
        aria-label="Add"
        style={{minWidth:80,width:'30%',height:60,margin:10,marginLeft:'65%'}}
        onClick={handleClick}
        >
          New Trip
        </Fab>
        {clicked? (
        <Collapse in={clicked}>
                 
               
        <Row>
          <Paper elevation={3} style={{width:'30%',height:'100%',marginTop:'5%',marginBottom:'5%',marginLeft:'3%'}}>
            <Card style={{backgroundColor:'#284B63',width:'auto'}}>
              <CardContent style={{color:'white'}}>
                <Typography style={{margin:10, fontFamily:"csPrajad" ,fontSize:20,fontWeight:'bold'}}>ข้อมูลทริป และเลือกที่พัก</Typography>
              </CardContent>
            </Card>
            <Box p={1}>
            <InputGroup>
              <Typography style={{fontFamily:"csPrajad" ,fontSize:16,padding:5,marginTop:15,marginBottom:-15}}>ชื่อทริป :</Typography>
              <TextField required id="standard-required" label="ชื่อทริป"/>
            </InputGroup>
            </Box>
            <Box p={1}>
            <InputGroup>
              <Typography style={{fontFamily:"csPrajad" ,fontSize:16,padding:5,marginTop:15}}>จังหวัด :</Typography>
              <CityName/>
            </InputGroup>
            </Box>
            <Box p={1}>
            <InputGroup>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16,padding:5,marginTop:15}}>วันที่ไป :</Typography>
            <DateStart/>
            </InputGroup>
            </Box>
            <Box p={1}>
            <InputGroup>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16,padding:5,marginTop:15}}>วันที่กลับ :</Typography>
            <DateEnd/>
            </InputGroup>
            </Box>
            <Box p={1}>
            <InputGroup>
            <Typography style={{fontFamily:"csPrajad" ,fontSize:16,padding:5,marginTop:15}}>ที่พัก :</Typography>
            <HotelName/>
            </InputGroup>
            </Box>
            <InputGroup style={{width:'100%',height:150}}>
              {/*    Hotel Map    */}

            </InputGroup>
            <InputGroup style={{width:'80%'}}>
              <Button
                    variant="contained"
                    color="primary"
                    style={{width:'30%',height:'8%',margin:'5%',marginLeft:'45%'}}
                >Submit</Button>
            </InputGroup>
          </Paper>

          <Paper elevation={3} style={{width:'30%',minHeight:637,height:'90%',marginTop:'5%',marginBottom:'5%',marginLeft:'1%'}}>
            <Card style={{backgroundColor:'#284B63',width:'auto'}}>
              <CardContent style={{color:'white'}}>
              <Typography style={{margin:10, fontFamily:"csPrajad" ,fontSize:20,fontWeight:'bold'}}>จัดการทริป</Typography>
              </CardContent>
            </Card>

            {/*test Accordion--------*/}
            <CreateAccordion/>
          </Paper> 

          <Paper elevation={3} style={{width:'30%',minHeight:637,height:'90%',marginTop:'5%',marginBottom:'5%',marginLeft:'1%'}}>
            <Card style={{backgroundColor:'#284B63',width:'auto'}}>
              <CardContent style={{color:'white'}}>
              <Typography style={{margin:10, fontFamily:"csPrajad" ,fontSize:20,fontWeight:'bold'}}>แผนที่ทริป</Typography>
              </CardContent>
            </Card>
            <InputGroup style={{width:'100%',minHeight:547}}>
              {/*    Hotel Map    */}
                 
            </InputGroup>
          </Paper>  
        </Row>  
        </Collapse>
        ) : null}
    </div>
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
        <Row >
          <Paper elevation={5} style={{width:'90%',height:'50%',margin:'5%'}}>
            <Row>
            <Col>
            <Box p={5}>
            <Card style={{backgroundColor:'#3C6E71',width:'90%',height:'auto'}}>
              <CardContent style={{color:'white'}}>
              <Row>
                <Avatar alt="User" src="/" style={{maxWidth:'100%' , marginLeft:10}}/>
                <Typography style={{fontFamily:"csPrajad" ,padding:5,fontSize:24,fontWeight:'bold'}}>Profile</Typography>
              </Row>
              <Divider style={{margin:10}}/>
              <Typography style={{fontFamily:"csPrajad" ,fontSize: 18, marginTop:5}}>ชื่อในระบบ :</Typography>
              <Typography style={{fontFamily:"csPrajad" ,fontSize: 18, marginTop:5}}> E-mail :</Typography>
              </CardContent>
            </Card>
            </Box>
            <Box ml={'14%'}>
              <Button
                  variant="contained"
                  color="secondary"
                  style={{width:'75%',height:50}}
              >My Trip</Button>
            </Box>
            <Box ml={'14%'} py={2}>
              <Button
                  variant="contained"
                  color="primary"
                  style={{width:'75%',height:50}}
              >Recommended Trip</Button>
            </Box>
            </Col>
            <Col>
            <Box py={5} ml={'-10%'}>
            <Card style={{backgroundColor:'#284B63',width:'90%'}}>
              <CardContent style={{color:'white'}}>
                <CustomizedTables/>
              </CardContent>
            </Card>
           
            <Button
              variant="contained"
              size="large"
              color="secondary"
              aria-label="Add"
              style={{width:'30%',height:60,margin:10,marginLeft:'60%',borderRadius:50}}
              component={Link}
              to="/pages/Planner" 
              >
                New Trip
              </Button>

            </Box>
            </Col>
            </Row>
          {/*<NewTripClick/>*/}

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


