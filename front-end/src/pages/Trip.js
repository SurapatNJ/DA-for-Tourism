import React , {Component, Fragment, useRef ,useEffect } from 'react';
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
import {Typography,Button,Paper,Tab,Tabs,Box,TextField,Select,InputLabel,MenuItem,FormControl,Fab,TableSortLabel,IconButton,Card,CardContent,Divider,Avatar,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TableFooter,TablePagination,Collapse} from "@material-ui/core";
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
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

//Google Map
import { Map, GoogleApiWrapper,Rectangle,HeatMap,Marker} from 'google-maps-react';
import { ControlPointDuplicateOutlined, HeadsetMicRounded } from '@material-ui/icons';

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



//----------------- Table ----------------//
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontFamily: 'csPrajad',
    fontSize: 18,
    fontWeight: 'bold',

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }
  const [groups, setGroups] = React.useState([]);
  const [myGroups, setmyGroups] = React.useState([]);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage,groups.length - page * rowsPerPage);
  const [myTrip, setMyTrip] = React.useState(true);
  

  const getIndex= (value, arr, prop)=>{
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  const handleDelete = (myid,i) => {
    var k = getIndex(myid,groups,'id')
    setmyGroups(myGroups.filter((row, j) => j !== i))
    setGroups(groups.filter((row, j) => j !== k))
    /*axios.delete("http://104.248.7.194:8000/api/trip_title_api/" + myid).catch((err)=> {
    });*/

  }
  
  const handleMyTrip = () => {
    setMyTrip(true);
    setPage(0);
  }

  const handleRecTrip = () => {
    setMyTrip(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('http://104.248.7.194:8000/api/trip_title_api/')
      .then((res) => {
        setGroups(res.data.sort((a, b) => (a.created < b.created) ? 1 : -1))
        setmyGroups(res.data.filter(item=>item.user_id==localStorage.getItem('user_id')).sort((a, b) => (a.created < b.created) ? 1 : -1))
      })
      .catch((err) => {
        console.log(err)
      }) 
    }

    fetchData()
  }, [])
  
  return (
    
    <TableContainer component={Paper}>
       <Button
                  variant="contained"
                  color="secondary"
                  style={{width:'50%',height:50}}
                  onClick={handleMyTrip}
              >My Trip</Button>
         <Button
                  variant="contained"
                  color="primary"
                  style={{width:'50%',height:50}}
                  onClick={handleRecTrip}
              >Recommended Trip</Button>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ชื่อทริป</StyledTableCell>
            <StyledTableCell align="center">วัน/เวลาที่สร้าง</StyledTableCell>
            <StyledTableCell align="center">แก้ไข/ลบ</StyledTableCell>
          </TableRow>
        </TableHead>
       
        {myTrip==true? 
         <TableBody>
         {(rowsPerPage > 0
             ? myGroups.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
             : myGroups).map((row,index) => ( 
             <StyledTableRow key={index}>
               <StyledTableCell component="th" scope="row">
                 {row.trip_name}
               </StyledTableCell>
               <StyledTableCell align="center">{row.created.replace('T'," ").split("",19)}</StyledTableCell>
               <StyledTableCell align="center">
                 <IconButton aria-label="edit" size="small" 
                  componen t={Link}
                  to={"/pages/EditPlanner/"+row.id}
                 ><EditRoundedIcon/></IconButton>  
                 <IconButton aria-label="delete" size="small" onClick={() => handleDelete(myGroups[index].id,index)}><DeleteForeverRoundedIcon/></IconButton>
               </StyledTableCell>
             </StyledTableRow>
           ))}
           {emptyRows > 0 && (
             <TableRow style={{ height: 63 * emptyRows }}>
               <TableCell colSpan={6} />
             </TableRow>
           )}
         </TableBody>
        :
        <TableBody>
        {(rowsPerPage > 0
            ? groups.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : groups).map((row,index) => (        
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.trip_name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.created.replace('T'," ").split("",19)}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton size="small"><SearchIcon/></IconButton>  
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 63 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        }
       
        <TableFooter>
        {myTrip==true? 
          <TablePagination
            count={myGroups.length}
            labelRowsPerPage=''
            rowsPerPageOptions=''
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            ActionsComponent={TablePaginationActions}
              />
              :
              <TablePagination
              count={groups.length}
              labelRowsPerPage=''
              rowsPerPageOptions=''
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
            }
        </TableFooter>
      </Table>
    </TableContainer>
    
  );
}





{/*     ////////       main     ///////    */ }
export class MapContainer extends Component {

  componentDidMount() { 
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
                <Avatar alt={localStorage.getItem('username')} src="/" style={{maxWidth:'100%' , marginLeft:10,backgroundColor:'#284B63'}}/>
                <Typography style={{fontFamily:"csPrajad" ,padding:5,fontSize:24,fontWeight:'bold'}}>Profile</Typography>
              </Row>
              <Divider style={{margin:10}}/>
              <Typography style={{fontFamily:"csPrajad" ,fontSize: 18, marginTop:5}}>ชื่อในระบบ : {localStorage.getItem('username')}</Typography>
              <Typography style={{fontFamily:"csPrajad" ,fontSize: 18, marginTop:5}}> E-mail : {localStorage.getItem('email')}</Typography>
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


