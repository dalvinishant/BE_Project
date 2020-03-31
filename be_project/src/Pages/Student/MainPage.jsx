//Imports
import React, { useState,Component, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';
import mdb from 'mdbreact';
import { MDBFileInput } from "mdbreact";
import ReactLoading from 'react-loading';
import './search.css'
import IconButton from '@material-ui/core/IconButton';
import { Code } from 'react-content-loader'
import InputAdornment from '@material-ui/core/InputAdornment';
import "mdbreact/dist/css/mdb.css";
import {Link,Redirect} from 'react-router-dom';
import axios from 'axios'
import {Modal,ModalHeader,ModalFooter,ModalBody} from "reactstrap";
import {Launcher} from 'react-chat-window';
import ChatBot from 'react-simple-chatbot';
import CustomChatbot from './customChatBot'
import TextField from '@material-ui/core/TextField';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Center from 'react-center';

//Import images
import MicIcon from '@material-ui/icons/Mic';
import CloseIcon from '@material-ui/icons/Close';
import trending from './Assets/Icon/trending.svg';
import letter from './Assets/Icon/letter.svg';
import dollar from './Assets/Icon/subscription.svg';
import clock from './Assets/Icon/clock.svg';
import clock1 from './Assets/Icon/clock_1.svg';
import contract from './Assets/Icon/contract.svg';
import history from './Assets/Icon/history.svg';
import ruppee from './Assets/Icon/ruppee.png';
import voice_search from './Assets/Icon/voice-search.svg';
import logo from './Assets/Icon/logo_i2it_2.png';
import ray from './Assets/ray.JPG';
import nocover from './Assets/No_Cover.jpg';
import tfios from './Assets/thefault.jpg';
import background from './Assets/Icon/background.png';
import { withStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import checklist from './Assets/Icon/checklist.svg';
import chaticon from './Assets/Icon/comment.png';
import view_all from './Assets/Icon/view.png';
import response from './Assets/Icon/writing.png';
import cancel from './Assets/Icon/cancel_1.png';
import track from './Assets/Icon/track_1.png';
import selectedTrack from './Assets/Icon/selected_milestone.svg';
import unselectedTrack from './Assets/Icon/unselected_milestone.svg';
//import clip from './Assets/Icon/paperclip.png'


import Search_Result from './SearchResult'
//Function definitions

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

const styles = theme => ({
    notchedOutline: {
       borderWidth: "1px",
       borderColor: "#2b2b2b !important"
    },
    customBadge: {
       backgroundColor: "#ef5350",
       width: "2px",
    },
    input: {
        display: 'none',
      },
 });

 const theme=createMuiTheme({
    overrides: {
        MuiAutocomplete: {
            notchedOutline: {
                borderWidth: "1px",
                borderColor: "#2b2b2b !important"
             }
        }
    }
 })

 const categories = [
    { title: 'Biographies and Memoirs'},
    { title: 'Health, Mind and Body'},
    { title: 'History'},
    { title: 'Fiction and Literature'},
    { title: 'Business and Investing'},
    { title: 'Engineeting'},
    { title: 'Mystery and Thrillers'},
    { title: 'Religion and Spirituality'},
    { title: 'Romance'}
 ];

class Student_MainPage extends Component{

    constructor(props)
    {
        super(props)
        this.state={
            selected:false,
            selected_1:true,
            selected_2:false,
            modalShow:false,
            filterModal1:false,
            trackModal:false,
            viewResponses:false,
            viewDebarred:false,
            setModalShow:true,
            searchTerm : '  ',
            setSearchTerm: '',
            grievance : 
            {
                studentid:1348,
                chainid:'',
                title:'',
                category:'',
                subcategory:'',
                description:'',
                track : {
                    level:"Committee",
                    action:"",
                    time:"",
                    
                },
                // files:['file1', 'file2'],
                status:"In-Progress",
                satisfy:""
            },

            list_grievance:{
                Data:[]
            },
            megatrack:[],
            last_track_index : 0,
            isloading:false,
            go:false,
            listening: false,
            term:'',
            db_book:[],
            flag : -1,
            success:false

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange_category = this.handleChange_category.bind(this);
        this.handleChange_sub_category = this.handleChange_sub_category.bind(this);
        this.fetch_grievance = this.fetch_grievance.bind(this);
        this.fetch_responses = this.fetch_responses.bind(this);
        this.fetch_debarred = this.fetch_debarred.bind(this);
        this.fetch_track_grievance = this.fetch_track_grievance.bind(this);
        this.toggle_selection_track = this.toggle_selection_track.bind(this);
        this.toggle_grievance_details = this.toggle_grievance_details.bind(this);
        this.toggle_status_details=this.toggle_status_details.bind(this);
        this.send_feedback = this.send_feedback.bind(this);

        this.toggleListen = this.toggleListen.bind(this);
        this.handleListen = this.handleListen.bind(this);
        this.handleChange_voice=this.handleChange_voice.bind(this);
        this.submit = this.submit.bind(this);


        this.determineStyle=this.determineStyle.bind(this)
    }
    
///////////////////////////////////////////////////////////New Functions

determineStyle=(i)=>{
    const item_selected=this.state.selected===i;
    return item_selected? "abs":"sad";
}

handleChange_title(e)
{
    // console.log(this.state.grievance.sub_category);
    // console.log(this.state.grievance.title);
    this.state.grievance.title = e.target.value;        
    
}
handleChange_category(e)
{
    // console.log(this.state.grievance.category);
    this.state.grievance.category = e.target.value;     
    
}
handleChange_sub_category(e)
{
    this.state.grievance.subcategory = e.target.value;     
    // console.log(this.state.grievance.sub_category);
    
}
handleChange_description(e)
{
    // console.log(this.state.grievance.description);
    this.state.grievance.description = e.target.value; 
    
}
// toggleTrackModal = () =>
// {
//     console.log("Flag: ",this.state.flag)
//     if (this.state.flag == 0)
//     {
//         this.setState({
//             filterModal1:!this.state.filterModal1,
//             trackModal:!this.state.trackModal
//             });
//     }

//     if (this.state.flag == 1)
//     {
//         this.setState({
//             viewResponses:!this.state.viewResponses,
//             trackModal:!this.state.trackModal
//             });
            
//     }

//     if (this.state.flag == 2)
//     {
//         this.setState({
//             viewDebarred:!this.state.viewDebarred,
//             trackModal:!this.state.trackModal
//             });
//     }
//     this.setState({
//         flag:-1
//     })
// }

toggleTrackModal = () =>
{
    this.setState({
        filterModal1:!this.state.filterModal1,
        trackModal:!this.state.trackModal
    });
    this.setState({
        viewResponses:!this.state.viewResponses,
        trackModal:!this.state.trackModal
    });
    this.setState({
        viewDebarred:!this.state.viewDebarred,
        trackModal:!this.state.trackModal
    })
}

// ------ Sending Grievance 

submit()
{
    //console.log(this.state.grievance)
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: this.state.grievance,
        url:'http://127.0.0.1:5000/student/1008'
      }
  
      console.log("Sending Query: "+String(this.state.grievance.title));
      console.log(this.state.grievance)
      var result = axios(options).then(res=>{
           console.log('Posted');
           console.log(res.data);
      }).catch(error=>{
        console.log('Not Posted');
        console.log(error.response)
      })
      //this.state.go=true;
}

// --------- Sending Feedback
send_feedback=(e)=>{
    
    var response = ''
    if (e){
        response += 'yes'
    }
    else
    {
        response += 'no'
    }
    const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        data: {satisfy:response},
        url:'http://127.0.0.1:5000/student/'+this.state.grievance.chainid
      }
      console.log(options.data)
    var result = axios(options).then(res=>{
    console.log(res.data);
    this.setState({
        success:true
    })
    // this.toggleModelDel();
    // this.set_display_del();
 
    //this.state.ddisplay_m = true;
    // abc = res.data;
    // console.log(res.data.Books)
    // this.setState({db_book:{books:res.data.Books}});
        //this.state.db_book.push(e);
 
 
    }).catch(error=>{
        console.log(error.response)
    })
 
 }

// ------ Fetching All Grivances

fetch_grievance = async() => {
    this.setState({
        filterModal1: true,
        isloading:true
    })
    let res = await axios.get("http://127.0.0.1:5000/studentAll/990")
    .then(res=>{
        console.log(res.data);
        this.setState({
            list_grievance:res.data,
            isloading:false
        })
        console.log(this.state.list_grievance);
        // abc = res.data;
        // console.log(res.data.Books)
        //this.setState({db_book:{books:res.data.Books}});
        // console.log(this.state.db_book)
           //this.state.db_book.push(e);
        }).catch(error=>{
           console.log(error.response)
        }) 
        
};


fetch_responses = () => {
    this.setState({
        viewResponses: true,
        isloading:true
    })
    let res = axios.get("http://127.0.0.1:5000/studentAll/990")
    .then(res=>{
        console.log(res.data);
        this.setState({
            list_grievance:res.data,
            isloading:false
        })
        console.log(this.state.list_grievance);
        // abc = res.data;
        // console.log(res.data.Books)
        //this.setState({db_book:{books:res.data.Books}});
        // console.log(this.state.db_book)
           //this.state.db_book.push(e);
        }).catch(error=>{
           console.log(error.response)
        }) 
        
};

fetch_debarred = () => {
    this.setState({
        viewDebarred: true,
        isloading:true
    })
    let res = axios.get("http://127.0.0.1:5000/studentAll/990")
    .then(res=>{
        console.log(res.data);
        this.setState({
            list_grievance:res.data,
            isloading:false
        })
        console.log(this.state.list_grievance);
        // abc = res.data;
        // console.log(res.data.Books)
        //this.setState({db_book:{books:res.data.Books}});
        // console.log(this.state.db_book)
           //this.state.db_book.push(e);
        }).catch(error=>{
           console.log(error.response)
        }) 
        
};

// ----------- Fetching All Grivances Ends 

//  ------------- Fetching Track Grievance 
fetch_track_grievance = (item) => {
    // this.setState({
    //     filterModal1: true,
    //     isloading:true
    // })
    this.toggleTrackModal()
    console.log(item.chainid)
    let res = axios.get("http://127.0.0.1:5000/student/"+String(item.chainid))
    .then(res=>{
        console.log(res.data);
        this.setState({
            grievance : {
                studentid : res.data.details.studentid,
                chainid : res.data.details.chainid,
                title : res.data.details.title,
                category : res.data.details.category,
                subcategory : res.data.details.subcategory,
                description : res.data.details.description,
                track : {
                    level:res.data.details.track.level,
                    action:res.data.details.track.track,
                    time:res.data.details.track.time,
                    
                },
                // files:['file1', 'file2'],
                status:res.data.details.status,
                satisfy:res.data.details.satisfy
            },
            megatrack: res.data.megatrack,
            last_track_index:res.data.megatrack.length - 1 
        })
        
        console.log("Printing",this.state.grievance)
        // this.setState({
        //     list_grievance:res.data,
        //     isloading:false
        // })
        }).catch(error=>{
           console.log(error.response)
        }) 
        
};
//  ------------- Fetching Track Grievance Ends

// --------------- Toggle Selection Track Grievance 

toggle_selection_track = (index) => {
    // this.state.megatrack[index].is_selected = !this.state.megatrack[index].is_selected;
    // this.setState({
    //     megatrack:[
    //         index=!this.state.megatrack[index].is_selected
    //     ]
    // })
    console.log("last index : ",this.state.last_track_index)
    console.log("Megatrack : ",this.state.megatrack)
    this.state.megatrack[this.state.last_track_index].is_selected = false
    this.state.selected = false
    this.state.selected_1 = false
    this.state.megatrack[index].is_selected = true
    this.state.selected_2 = true
    this.state.last_track_index = index
    this.forceUpdate()
    // console.log("index : ", index)
    // console.log("last index : ",this.state.last_track_index)
    // console.log(this.state.megatrack[index].is_selected)
}

toggle_grievance_details = () => {
    console.log("last index : ",this.state.last_track_index)
    console.log("Megatrack : ",this.state.megatrack)
    if (this.state.megatrack.length>0)
    this.state.megatrack[this.state.last_track_index].is_selected = false
    
    this.forceUpdate()
    this.setState({
        selected:true,
        selected_1:false,
        selected_2 : false
    })
    console.log(this.state.selected)
}

toggle_status_details = () => {
    if (this.state.megatrack.length>0)
    this.state.megatrack[this.state.last_track_index].is_selected = false
    
    this.forceUpdate()
    this.setState({
        selected:false,
        selected_1:true,
        selected_2:false
    })
    // console.log(this.state.selected)
}
// --------------- Toggle Selection Track Grievance Ends 



////////////////////////////////////////////////////////////New Functions ends

    // setModalShow(){
    //     this.setState({
    //         modalShow : !this.state.modalShow
    //     });
    // }

    toggleModalShow = () =>
    {
        this.setState({
            modalShow:!this.state.modalShow,
            setModalShow:!this.state.setModalShow
        });
    }

    toggleFilterModal = () =>
    {
        this.setState({
            filterModal1:!this.state.filterModal1
        });
    }

    toggleviewResponses = () => {
        this.setState({
            viewResponses:!this.state.viewResponses
        });
    }

    toggleviewDebarred = () => {
        this.setState({
            viewDebarred:!this.state.viewDebarred
        });
    }
    // handleChange = event => {
    //     setCategory(event.target.value);
    //   };

    handleChange_voice(e){
        
        
        this.setState({
            searchTerm: document.getElementById('input_search').value
            
        });
        
    }
    handleChange(e){
        this.setState({searchTerm: e.target.value});
    }
    API_URL = `http://localhost:5000/studentbook`;
    handleSubmit(e){
        this.setState({ go: true});
        // console.log(document.getElementById('categoryFilter').value)
    }

    _onMessageWasSent(message) {
        this.setState({
          messageList: [...this.state.messageList, message]
        })
      }
     
      _sendMessage(text) {
        if (text.length > 0) {
          this.setState({
            messageList: [...this.state.messageList, {
              author: 'them',
              type: 'text',
              data: { text }
            }]
          })
        }
      }
      toggleListen() {
        
        this.setState({
          listening: !this.state.listening
            
        }, this.handleListen)
    
      }
      handleListen(){
               
        // handle speech recognition here 
        if (this.state.listening) 
            recognition.start()
         
        else recognition.stop()
          

        let finalTranscript = '';
        recognition.onresult = event => {
        let interimTranscript = '';
    
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) finalTranscript += transcript + ' '
            else interimTranscript += transcript;
          }

           this.setState({
            term: finalTranscript
          
          })
         
        
        //    document.getElementById("input_search").innerHTML =  document.getElementById('final').innerHTML;
           
        this.handleChange_voice()
        console.log(this.searchTerm)

       
      }
    }
    render() {
        //const [modalShow, setModalShow] = React.useState(false);
        // const [category, setCategory] = React.useState('');
        const { classes } = this.props;
        const modalShow = this.state;
        const setModalShow = this.state;
        const {go} = this.state;
        const {searchTerm} = this.state;
        const {term}=this.state;

        if(go)
        {
            return(
                <Redirect to={{
                    pathname: "/",
                    state:{searchTerm:searchTerm}
                }}/>
            )
        }
    return(
        <div className="centered" id = "div_container">
            <head>
                <title>BRAIT Library</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous"/>
                {/* <link href="https://fonts.googleapis.com/css?family=Exo+2:700&display=swap" rel="stylesheet"/> */}
                {/* <link href="https://fonts.googleapis.com/css?family=Exo&display=swap" rel="stylesheet"></link> */}
            </head>
            {/* LEFTPANE */}
            <div className="leftpane centered font_custom">
                <center style={{height:"90%", width:"90%", borderRadius:"20px",background:"#f2f2f2"}} className="shadow bg-white">
                    <div id="leftpane" className="p-3" style={{height:"330px"}}>
                        <table>
                            <tr>
                                <td>
                                    <img className="shadow" style={{width:"80px", height:"80px", borderRadius:"50%"}}src={ray}/>
                                </td>
                                <td>
                                    <h4 className="font_custom" style = {{marginTop:"10px", verticalAlign:"middle", paddingLeft:"10px"}}>Rakshitha Shettigar</h4>
                                </td>
                            </tr>
                        </table>
                        <center>    
                            <table id="studentDetails" style = {{marginTop: "20px", borderRadius:"10px",background:"#f2f2f2"}}>
                                <tr>
                                    <td><h6>College ID</h6></td>
                                    <td><h6>C-16-10</h6></td>
                                </tr>
                                <tr>
                                    <td><h6>College</h6></td>
                                    <td><h6>I<sup>2</sup>IT, Pune</h6></td>
                                </tr>
                                <tr>
                                    <td><h6>Mobile</h6></td>
                                    <td><h6>+91-9890358113</h6></td>
                                </tr>
                            </table>
                        </center>
                    
                    <div id="actions" >
                        <hr/>
                        <h5 className = "font_custom" style={{textAlign:"left",paddingLeft:"20px"}}>
                                <b>Actions</b>
                        </h5>
                        <hr />
                        <table id="grievanceDetails">
                            <tr onClick={this.fetch_grievance.bind(this)}>
                                <td className="p-2" style={{textAlign:"center", width:"30%"}}>
                                    <img src={view_all}  style = {{height : "40px",width :"40px"}} 
                                       ></img>
                                </td>
                                <td className="p-2">
                                <tr><strong><h6 style={{fontSize:"18px"}}><b>View Grievances</b></h6></strong></tr>
                                    <tr><h7>View all submitted grievances</h7></tr>
                                </td>
                            </tr>
                            <tr onClick={this.fetch_responses.bind(this)}>
                                <td className="p-2" style={{textAlign:"center"}}>
                                <img src={response}  style = {{height : "40px",width :"40px"}} 
                                       ></img>
                                </td>
                                <td className="p-2">
                                    <tr><strong><h6 style={{fontSize:"18px"}}><b>Response</b></h6></strong></tr>
                                    <tr><h7>View the responses for submitted grivances</h7></tr>
                                </td>
                            </tr> <tr onClick={this.fetch_debarred.bind(this)}>
                                <td className="p-2" style={{textAlign:"center"}}>
                                    <img src={cancel}  style = {{height : "40px",width :"40px"}} 
                                       ></img>
                                </td>
                                <td className="p-2">
                                <tr><strong><h6 style={{fontSize:"18px"}}><b>Debarred Grievances</b></h6></strong></tr>
                                    <tr><h7>View the debarred grievances</h7></tr>
                                </td>
                            </tr>
                            
                        </table>
                    </div>
                    </div>
                </center>
            </div>
            {/* MIDDLEPANE */}
            <div className="middlePane ml-3" id="middlePane">
                <center> 
                <table>
                    <tr>
                        <td><img style={{width:"100px",verticalAlign:"center",}}src={logo}/></td>
                        <td>
                            <h2 style={{verticalAlign:"center", textAlign:"left",marginLeft:"20px", marginTop:"10px"}} id='title'>International Institute of<br/>Information Technology</h2>
                            <div style = {{borderTop:"2px solid #ff0000", width:'70%', marginLeft : '20px'}}>
                            <h4 id = "title" style = {{ marginTop:"1px"}}> Grievance Portal</h4>
                            </div>
                        </td>
                    </tr>
                </table>
                </center>
                <mdb md="6">
                    <div className="shadow-lg bg-white p-3 mt-3" style={{borderRadius:"10px"}}>
                        <form onSubmit = {this.handleSubmit} > 
                            <table className = "w-100">
                                <tr>
                                    <td colSpan={2} >
                                        <TextField id="book_title" className="w-100" name="add_book" label="Title" variant="outlined" onChange = {this.handleChange_title.bind(this)} style={{marginBottom:"15px", height:"40px !important"}}/> 
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        
                                        <Autocomplete
                                            id="sub_category"
                                            options={categories}
                                            // // onChange={handleChange}
                                            // value={category}
                                            autoSelect = {true}
                                            onSelect = {this.handleChange_category.bind(this)}
                                            groupBy={option => option.firstLetter}
                                            filterSelectedOptions
                                            getOptionLabel={option => option.title}
                                            renderInput={params => (
                                                <ThemeProvider theme={theme}>
                                                <TextField {...params}  label="Category" variant="outlined" fullWidth/>
                                                </ThemeProvider>
                                            )}
                                        />
                                        
                                    </td>
                                    <td>
                                        <Autocomplete
                                            id="categoryFilter"
                                            
                                            options={categories}
                                            // // onChange={handleChange}
                                            // value={category}
                                            autoSelect = {true}
                                            onSelect = {this.handleChange_sub_category.bind(this)}
                                            classes={{
                                                border:classes.border,
                                                notchedOutline: classes.notchedOutline
                                                }}
                                            groupBy={option => option.firstLetter}
                                            filterSelectedOptions
                                            getOptionLabel={option => option.title}
                                            renderInput={params => (
                                                <TextField {...params} label="Sub Category" variant="outlined" fullWidth />
                                            )}
                                            
                                        />
                                    </td>
                                </tr>
                                <tr><td colSpan={2}><hr/></td></tr>
                                <tr>
                                    <td colSpan={2}>
                                    <TextField id="book_title" className="w-100" name="add_book" 
                                    onChange = {this.handleChange_description.bind(this)} label="Description" variant="outlined" multiline rows="4" style={{marginBottom:"15px", height:"40px !important"}}/>
                                     <hr/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <Center>
                                            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" multiple />
                                            <label htmlFor="icon-button-file">
                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                <AttachFileIcon style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
                                                </IconButton>
                                            </label>
                                        </Center>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <Center>
                                            <Button className="w-25" id = "chat_button" style= {{textTransform:"none"}} onClick = {this.submit}>
                                                Submit
                                            </Button>
                                        </Center>
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>
                </mdb>
            </div>
            {/* RIGHTPANE */}
            <div className="rightpane centered p-3">
                <center style={{height:"95%", width:"80%", borderRadius:"20px"}} className="shadow bg-white">
                    {/* <table width="90%" style= {{marginTop:"10px"}}>
                       <tr>
                            <td>
                                <h3 className = "font_custom" style= {{textAlign:"left", verticalAlign:"bottom"}}>
                                    <b>Exam Feed</b>
                                </h3>
                            </td>
                       </tr>
                    </table>
                    <hr width="85%"/>
                    <div>
                        <table width="95%" style = {{background:"#f2f2f2",borderRadius:"15px"}}>
                            <tr id = "exam_feed"  style = {{borderBottom : "1px solid #D8D8D8"}}>
                                <td className="p-2 pl-4" width="70%">
                                    <tr><strong><h5><b>Data Structures</b></h5></strong></tr>
                                    <tr><h6>TE Computer</h6></tr>
                                    <tr><h7>13/12/2020</h7></tr>
                                </td>
                                <td className="p-2 ">
                                <tr><strong><h6><b>43</b></h6></strong></tr>
                                </td> 
                            </tr>
                            <tr id = "exam_feed">
                                <td className="p-2 pl-4">
                                <tr><strong><h5><b>Discrete Maths</b></h5></strong></tr>
                                    <tr><h6>SE Computer</h6></tr>
                                    <tr><h7>15/12/2020</h7></tr>
                                </td>
                                <td className="p-2 ">
                                    <tr><strong><h6><b>18</b></h6></strong></tr>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <hr width="85%"/> */}
                    <table width="90%" style= {{marginTop:"10px"}}>
                       <tr>
                            <td>
                                <h3 className = "font_custom" style= {{textAlign:"left", verticalAlign:"bottom"}}>
                                    <b>Notifications</b>
                                </h3>
                            </td>
                       </tr>
                    </table>
                    <hr width="85%"/>
                    <div>
                        <table width="95%" style = {{background:"#f2f2f2",borderRadius:"15px"}}>
                            <tr id = "exam_feed" style = {{borderBottom : "1px solid #D8D8D8"}}>
                                <td className="p-2 pl-4">
                                    <tr><h5><b>Grievance Resolved</b></h5></tr>
                                    <tr><h7>Your grievance has been resolved. Please review the solution and revert to us if needed.</h7></tr>
                                </td>
                            </tr>
                            <tr id = "exam_feed">
                                <td className="p-2 pl-4">
                                <tr><h5><b>Grievance Submitted</b></h5></tr>
                                    <tr><h7>Your grievance has been submitted successfully. We will get back to you shortly.</h7></tr>
                                </td>
                            </tr>
                        </table>
                        <hr width = "85%"/>
                    </div>
                </center>
            </div>

            {/* View Grievances Modal starts */}
            <Modal
                isOpen = {this.state.filterModal1}
                centered = {true}
                size='lg'
            >
               <div class="modal_filter" style={{display:"flex", alignItems: "center", justifyContent:"space-between"}}>
               <div class="font_custom">
                   <h3 className="p-3"><b>View Grievances</b></h3>
               </div>
               <div>
                    <IconButton id="close" className="closeItem p-3" onClick={this.toggleFilterModal}>    
                    <CloseIcon className="text-right" style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
                    </IconButton>
               </div>
               </div>
                <div>
                <hr/>
                    <div className="p-3" id="modalScroll">
                    {
                        this.state.isloading?
                        <Center>
                        <Code 
                                 height={210}
                                 backgroundColor={'#f2f2f2'}
                                 foregroundColor={'#fff'}
                                 style = {{paddingTop:"100px"}}
                                 /></Center>
                        :
                        <table className = "w-100 p-1 font_custom" >
                            <tr style = {{textAlign:"center", borderRadius : "10px", background:"#f2f2f2"}}>
                            <th style = {{width:"8%",fontSize:"18px", borderRight:"1.5px solid #dadada"}}>
                                <b>ID</b>
                            </th>
                            <th style = {{width:"38%",fontSize:"18px",borderRight:"1.5px solid #dadada"}}>
                                <b>Title</b>
                            </th>
                            <th style = {{width:"18%", fontSize:"18px",borderRight:"0.5px solid #dadada"}}>
                                <b>Status</b>
                            </th>
                            <th style = {{width:"12%", fontSize:"18px", borderRight:"0.5px solid #dadada"}}>
                                <b>Level</b>
                            </th>
                            <th style = {{width:"12%", fontSize:"18px"}}>
                                <b>Date</b>
                            </th>
                            <th style = {{width:"12%", fontSize:"18px"}}>
                                <b>Track</b>
                            </th>
                            </tr>
                            {/* Listing Grievance Starts */}
                            
                                {
                                    // this.state.filterModal ?console.log('Printing',this.state.list_grievance.Data):null
                                   this.state.list_grievance.Data.map((item, index) => {
                                    //    if (this.state.list_grievance)
                                    //    console.log("Printing ",this.state.list_grievance.Data[index])
                                       return(
                                        <tr>
                                            <td className="pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                            {index+1}
                                            </td>
                                            <td className = "pl-2 pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada"}}>
                                                {item.title}
                                            </td>
                                            {
                                                item.status == "In-Progress"?
                                                    <td className=" pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                    <div className="shadow inProgress">
                                                        <b>In-Progess</b>
                                                    </div>
                                                    </td>
                                                :item.status == "Resolved"?
                                                    <td className="pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                        <div className="shadow resolved">
                                                            <b>Resolved</b>
                                                        </div>
                                                    </td>
                                                :item.status == "Debarred"?
                                                    <td className="pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                        <div className="shadow debared">
                                                            <b>Debarred</b>
                                                        </div>
                                                    </td>
                                                :item.status == "Response"?
                                                    <td className="pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                        <div className="shadow response">
                                                            <b>Response</b>
                                                        </div>
                                                    </td>
                                                :item.status == "Raised"?
                                                    <td className="pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                        <div className="shadow raised">
                                                            <b>Raised</b>
                                                        </div>
                                                    </td>
                                                :null
                                            }
                                            
                                            <td className="pt-2" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                {item.level}
                                            </td>
                                            <td className="pt-2" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                {item.date}
                                            </td>
                                            <td className="p-3" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                                <button style = {{border:"none",background:"none",outline:"none"}} onClick={this.fetch_track_grievance.bind(this,item)}>
                                                    <img src={track}  style = {{height : "25px",width :"25px", align:"center"}}></img>
                                                </button>
                                            </td>
                                        </tr>
                                            );
                                        })    
                                }
                                {/* Listing Grievance Ends */}                            
                        </table>
                            }
                    </div>
                </div>
           </Modal>
           {/* View Grievances Modal ends */}
           


            {/* View Responses Modal starts */}
            <Modal
                isOpen = {this.state.viewResponses}
                centered = {true}
                size='lg'
            >
               <div class="modal_filter" style={{display:"flex", alignItems: "center", justifyContent:"space-between"}}>
               <div class="font_custom">
                   <h3 className="p-3"><b>View Responses</b></h3>
               </div>
               <div>
                    <IconButton id="close" className="closeItem p-3" onClick={this.toggleviewResponses}>    
                    <CloseIcon className="text-right" style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
                    </IconButton>
               </div>
               </div>
                <div>
                <hr/>
                    <div className="p-3" id="modalScroll">
                    {
                        this.state.isloading?
                        <Center>
                        <Code 
                                 height={210}
                                 backgroundColor={'#f2f2f2'}
                                 foregroundColor={'#fff'}
                                 style = {{paddingTop:"100px"}}
                                 /></Center>
                        :
                        <table className = "w-100 p-1 font_custom" >
                            <tr style = {{textAlign:"center", borderRadius : "10px", background:"#f2f2f2"}}>
                            <th style = {{width:"8%",fontSize:"18px", borderRight:"1.5px solid #dadada"}}>
                                <b>ID</b>
                            </th>
                            <th style = {{width:"38%",fontSize:"18px",borderRight:"1.5px solid #dadada"}}>
                                <b>Title</b>
                            </th>
                            <th style = {{width:"18%", fontSize:"18px",borderRight:"0.5px solid #dadada"}}>
                                <b>Status</b>
                            </th>
                            <th style = {{width:"12%", fontSize:"18px", borderRight:"0.5px solid #dadada"}}>
                                <b>Level</b>
                            </th>
                            <th style = {{width:"12%", fontSize:"18px"}}>
                                <b>Date</b>
                            </th>
                            <th style = {{width:"12%", fontSize:"18px"}}>
                                <b>Track</b>
                            </th>
                            </tr>
                            {/* Listing Grievance Starts */}
                            
                                {
                                    // this.state.filterModal ?console.log('Printing',this.state.list_grievance.Data):null
                                   this.state.list_grievance.Data.map((item, index) => {
                                    //    if (this.state.list_grievance)
                                    //    console.log("Printing ",this.state.list_grievance.Data[index])
                                        if (item.status == "Response") { 
                                       return(
                                        <tr>
                                            <td className="pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                            {index+1}
                                            </td>
                                            <td className = "pl-2 pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada"}}>
                                                {item.title}
                                            </td>
                                            {
                                                item.status == "In-Progress"?
                                                    <td className=" pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                    <div className="shadow inProgress">
                                                        <b>In-Progess</b>
                                                    </div>
                                                    </td>
                                                :item.status == "Resolved"?
                                                    <td className="pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                        <div className="shadow resolved">
                                                            <b>Resolved</b>
                                                        </div>
                                                    </td>
                                                :item.status == "Debarred"?
                                                    <td className="pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                        <div className="shadow debared">
                                                            <b>Debarred</b>
                                                        </div>
                                                    </td>
                                                :item.status == "Response"?
                                                    <td className="pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                        <div className="shadow response">
                                                            <b>Response</b>
                                                        </div>
                                                    </td>
                                                :item.status == "Raised"?
                                                    <td className="pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                        <div className="shadow raised">
                                                            <b>Raised</b>
                                                        </div>
                                                    </td>
                                                :null
                                            }
                                            
                                            <td className="pt-2" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                {item.level}
                                            </td>
                                            <td className="pt-2" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                {item.date}
                                            </td>                                                                                                                                                               
                                            <td className="p-3" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                                <button style = {{border:"none",background:"none",outline:"none"}} onClick={this.fetch_track_grievance.bind(this,item)}>
                                                    <img src={track}  style = {{height : "25px",width :"25px", align:"center"}}></img>
                                                </button>
                                            </td>
                                        </tr>
                                            );}
                                        })    
                                }
                                {/* Listing Grievance Ends */}                            
                        </table>
                            }
                    </div>
                </div>
           </Modal>
            {/* View Responses Modal ends */}

            {/* View Debared Modal starts*/}
            <Modal
                isOpen = {this.state.viewDebarred}
                centered = {true}
                size='lg'
            >
               <div class="modal_filter" style={{display:"flex", alignItems: "center", justifyContent:"space-between"}}>
               <div class="font_custom">
                   <h3 className="p-3"><b>View Debarred</b></h3>
               </div>
               <div>
                    <IconButton id="close" className="closeItem p-3" onClick={this.toggleviewDebarred}>    
                    <CloseIcon className="text-right" style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
                    </IconButton>
               </div>
               </div>
                <div>
                <hr/>
                    <div className="p-3" id="modalScroll">
                    {
                        this.state.isloading?
                        <Center>
                        <Code 
                                 height={210}
                                 backgroundColor={'#f2f2f2'}
                                 foregroundColor={'#fff'}
                                 style = {{paddingTop:"100px"}}
                                 /></Center>
                        :
                        <table className = "w-100 p-1 font_custom" >
                            <tr style = {{textAlign:"center", borderRadius : "10px", background:"#f2f2f2"}}>
                            <th style = {{width:"8%",fontSize:"18px", borderRight:"1.5px solid #dadada"}}>
                                <b>ID</b>
                            </th>
                            <th style = {{width:"38%",fontSize:"18px",borderRight:"1.5px solid #dadada"}}>
                                <b>Title</b>
                            </th>
                            <th style = {{width:"18%", fontSize:"18px",borderRight:"0.5px solid #dadada"}}>
                                <b>Status</b>
                            </th>
                            <th style = {{width:"12%", fontSize:"18px", borderRight:"0.5px solid #dadada"}}>
                                <b>Level</b>
                            </th>
                            <th style = {{width:"12%", fontSize:"18px"}}>
                                <b>Date</b>
                            </th>
                            <th style = {{width:"12%", fontSize:"18px"}}>
                                <b>Track</b>
                            </th>
                            </tr>
                            {/* Listing Grievance Starts */}
                            
                                {
                                    // this.state.filterModal ?console.log('Printing',this.state.list_grievance.Data):null
                                   this.state.list_grievance.Data.map((item, index) => {
                                    //    if (this.state.list_grievance)
                                    //    console.log("Printing ",this.state.list_grievance.Data[index])
                                        if (item.status == "Debarred") { 
                                       return(
                                        <tr>
                                            <td className="pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                            {index+1}
                                            </td>
                                            <td className = "pl-2 pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada"}}>
                                                {item.title}
                                            </td>
                                            {
                                                item.status == "In-Progress"?
                                                    <td className=" pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                    <div className="shadow inProgress">
                                                        <b>In-Progess</b>
                                                    </div>
                                                    </td>
                                                :item.status == "Resolved"?
                                                    <td className="pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                        <div className="shadow resolved">
                                                            <b>Resolved</b>
                                                        </div>
                                                    </td>
                                                :item.status == "Debarred"?
                                                    <td className="pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                        <div className="shadow debared">
                                                            <b>Debarred</b>
                                                        </div>
                                                    </td>
                                                :item.status == "Response"?
                                                    <td className="pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                        <div className="shadow response">
                                                            <b>Response</b>
                                                        </div>
                                                    </td>
                                                :item.status == "Raised"?
                                                    <td className="pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                        <div className="shadow raised">
                                                            <b>Raised</b>
                                                        </div>
                                                    </td>
                                                :null
                                            }
                                            
                                            <td className="pt-2" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                {item.level}
                                            </td>
                                            <td className="pt-2" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                {item.date}
                                            </td>
                                            <td className="p-3" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                                <button style = {{border:"none",background:"none",outline:"none"}} onClick={this.fetch_track_grievance.bind(this,item)}>
                                                    <img src={track}  style = {{height : "25px",width :"25px", align:"center"}}></img>
                                                </button>
                                            </td>
                                        </tr>
                                            );}
                                        })    
                                }
                                {/* Listing Grievance Ends */}                            
                        </table>
                            }
                    </div>
                </div>
           </Modal>
            {/* View Debared Modal ends */}

            {/* Track Grievance Modal starts */}
            <Modal isOpen = {this.state.trackModal} centered = {true} style={{marginBottom:"10px"}}>
                <div class="modal_filter" style={{display:"flex", alignItems: "center", justifyContent:"space-between", width:"100%"}}>
                    <div class="font_custom">
                    <h3 className="p-3"><b>Track Grievances</b></h3>
                    </div>
                    <div>
                        <IconButton id="close" className="closeItem p-3" onClick={this.toggleTrackModal.bind(this)}>    
                            <CloseIcon className="text-right" style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
                        </IconButton>
                    </div>  
                </div>
                <div id="timeline">
                    <div id="timelineItem" className="p-3" style={{width:"50%"}}>
                        {/* <div id="timelineItemIndiv">
                            <img src={selectedTrack} style={{height:"65%"}} />
                            <div className="selectedMilestone p-3 shadow" style={{lineHeight:"1.5"}}>
                                <b><h4>Lorem ipsum</h4></b>
                                <h6 className="pt-1">dolor sit amet</h6>
                                <p style={{fontSize:"14px", marginBottom:"0px"}} className="pt-1">consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div id="timelineItemIndiv">
                            <img src={selectedTrack} style={{height:"65%"}} />
                            <div className="selectedMilestone p-3 shadow" style={{lineHeight:"1.5"}}>
                                <b><h4>Lorem ipsum</h4></b>
                                <h6 className="pt-1">dolor sit amet</h6>
                                <p style={{fontSize:"14px", marginBottom:"0px"}} className="pt-1">consectetur adipiscing elit.</p>
                            </div>
                        </div> */}
                        <table className="trackTable" id="trackTable" cellPadding='-1' cellSpacing='-1'>
                            <tr onClick = {this.toggle_grievance_details.bind(this)}>
                                <td><img  className={this.state.selected? "selectedTrackImage" :"unselectedTrackImage"} src={this.state.selected? selectedTrack :unselectedTrack}/></td>
                                <td>
                                    <div className={this.state.selected?"selectedMilestone shadow p-2 font_custom" :"unselectedMilestone shadow p-2 font_custom"} style = {{height:"90%"}}>
                                    <p style={{fontSize:"20px",fontWeight:"bold"}} className="font_custom">Grievance Submitted</p>
                                        <p style={{fontSize:"14px"}} className="pt-1 font_custom">{this.state.grievance.category} | {this.state.grievance.subcategory}</p>
                                        <p style={{fontSize:"12px", marginBottom:"0px"}} className="pt-1 pb-1">Rakshitha Shettigar | 10 / 02 / 2020</p>
                                    </div>
                                </td>
                            </tr>
                            {/* ----- Mapping Timeline  */}
                            {
                                this.state.megatrack.map((item, index)=>{
                                //     console.log(index)
                                //     console.log(this.state.megatrack.length)
                                //   this.state.selected= (index==this.state.megatrack.length-1)
                                    
                                    // const toggle_selection_track = (i) => {
                                    //     console.log("Clicked ",i)
                                    // }
                                    // console.log(index)
                                        
                                        return(
                                            // <tr onClick = {this.toggle_selection_track.bind(this,index)}>
                                            
                                            <tr onClick = {() => {this.toggle_selection_track(index)}}>
                                                <td>
                                                    <img className={this.state.megatrack[index].is_selected? "selectedTrackImage" :"unselectedTrackImage"} src={this.state.megatrack[index].is_selected? selectedTrack :unselectedTrack} style={{height:"65%"}} /></td>
                                                <td>
                                                    <div className={item.is_selected?"selectedMilestone shadow p-2 font_custom" :"unselectedMilestone shadow p-2 font_custom"} style = {{height:"90%"}}>
                                                        <p style={{fontSize:"20px",fontWeight:"bold"}} className="font_custom">{item.level}</p>
                                                        <p style={{fontSize:"14px"}} className="pt-1 font_custom">{item.action}</p>
                                                        <p style={{fontSize:"12px", marginBottom:"0px"}} className="pt-1 pb-1">Shaurya Shanoy | {item.date}</p>
                                                    </div>
                                                </td>
                                            </tr>    
                                        );
                                })
                            }
                            {
                                this.state.grievance.status == "Response"?
                                <tr onClick = {this.toggle_status_details.bind(this)}>
                                    <td>
                                        <img className={this.state.selected_1? "selectedTrackImage" :"unselectedTrackImage"} src={this.state.selected_1? selectedTrack :unselectedTrack} style={{height:"65%"}} /></td>
                                    <td>
                                        <div className={this.state.selected_1? "selectedResponse p-3 shadow" : "unselectedResponse p-3 shadow"}>
                                            <p style={{fontSize:"20px",fontWeight:"bold",color: "#f2f2f2"}} className="font_custom">Awaiting Response</p>
                                            <p style={{fontSize:"14px", color:"#f2f2f2"}} className="font_custom">Please provide feedback </p>
                                        </div>
                                    </td>
                                </tr>
                                :
                                this.state.grievance.status == "In-Progress"?
                                <tr onClick = {this.toggle_status_details.bind(this)}>
                                    <td>
                                        <img className={this.state.selected_1? "selectedTrackImage" :"unselectedTrackImage"} src={this.state.selected_1? selectedTrack :unselectedTrack} style={{height:"65%"}} /></td>
                                    <td>
                                        <div className={this.state.selected_1? "selectedInProgress p-3 shadow" : "unselectedInProgress p-3 shadow"}>
                                            <p style={{fontSize:"20px",fontWeight:"bold",color: "#f2f2f2"}} className="font_custom">{this.state.grievance.status}</p>
                                            <p style={{fontSize:"14px", color:"#f2f2f2"}} className="font_custom">Your grievance is being administered </p>
                                        </div>
                                    </td>
                                </tr>
                                :
                                this.state.grievance.status == "Resolved"?
                                <tr onClick = {this.toggle_status_details.bind(this)}>
                                    <td>
                                        <img className={this.state.selected_1? "selectedTrackImage" :"unselectedTrackImage"} src={this.state.selected_1? selectedTrack :unselectedTrack} style={{height:"65%"}} /></td>
                                    <td>
                                        <div className={this.state.selected_1? "selectedResolved p-3 shadow" : "unselectedResolved p-3 shadow"}>
                                            <p style={{fontSize:"20px",fontWeight:"bold",color: "#f2f2f2"}} className="font_custom">{this.state.grievance.status}</p>
                                            <p style={{fontSize:"14px", color:"#f2f2f2"}} className="font_custom">Your grievance has been Resolved </p>
                                        </div>
                                    </td>
                                </tr>
                                :this.state.grievance.status == "Debarred"?
                                <tr onClick = {this.toggle_status_details.bind(this)}>
                                    <td>
                                        <img className={this.state.selected_1? "selectedTrackImage" :"unselectedTrackImage"} src={this.state.selected_1? selectedTrack :unselectedTrack} style={{height:"65%"}} /></td>
                                    <td>
                                        <div className={this.state.selected_1? "selectedDebarred p-3 shadow" : "unselectedDebarred p-3 shadow"}>
                                            <p style={{fontSize:"20px",fontWeight:"bold",color: "#f2f2f2"}} className="font_custom">{this.state.grievance.status}</p>
                                            <p style={{fontSize:"14px", color:"#f2f2f2"}} className="font_custom">Your grievance has been Debarred </p>
                                        </div>
                                    </td>
                                </tr>
                                :
                                <tr onClick = {this.toggle_status_details.bind(this)}>
                                <td>
                                    <img className={this.state.selected_1? "selectedTrackImage" :"unselectedTrackImage"} src={this.state.selected_1? selectedTrack :unselectedTrack} style={{height:"65%"}} /></td>
                                <td>
                                    <div className={this.state.selected_1? "selectedRaised p-3 shadow" : "unselectedRaised p-3 shadow"}>
                                        <p style={{fontSize:"20px",fontWeight:"bold",color: "#f2f2f2"}} className="font_custom">{this.state.grievance.status}</p>
                                        <p style={{fontSize:"14px", color:"#f2f2f2"}} className="font_custom">Your grievance has been Debarred </p>
                                    </div>
                                </td>
                            </tr>
                            }
                            {/* <tr>
                                <td><img src={selectedTrack} style={{height:"65%"}} /></td>
                                <td>
                                    <div className="selectedMilestone shadow p-2 font_custom" style = {{height:"90%"}}>
                                    <p style={{fontSize:"20px",fontWeight:"bold"}} className="font_custom">Committee</p>
                                        <p style={{fontSize:"14px"}} className="pt-1 font_custom">We will get back to you</p>
                                        <p style={{fontSize:"12px", marginBottom:"0px"}} className="pt-1 pb-1">Shaurya Shanoy | 10 / 02 / 2020</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><img className="unselectedTrackImage" src={unselectedTrack} /></td>
                                <td>
                                    <div className="unselectedMilestone shadow p-2" style = {{height:"90%"}}>
                                        <b><h4>Lorem ipsum</h4></b>
                                        <h6 className="pt-1">dolor sit amet</h6>
                                        <p style={{fontSize:"14px", marginBottom:"0px"}} className="pt-1">consectetur adipiscing elit.</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><img className="unselectedTrackImage" src={unselectedTrack} /></td>
                                <td>
                                    <div className="unselectedMilestone shadow p-2" style = {{height:"90%"}}>
                                        <b><h4>Lorem ipsum</h4></b>
                                        <h6 className="pt-1">dolor sit amet</h6>
                                        <p style={{fontSize:"14px", marginBottom:"0px"}} className="pt-1">consectetur adipiscing elit.</p>
                                    </div>
                                </td>
                            </tr> */}
                        </table>
                    </div>
                    <div id="timelineItem" style={{width:"50%"}}>
                        <div className="timelineDescription p-4">
                    {/* Track details begin */}
                    { this.state.selected ? 
                            
                            // <Center><h3 className="mb-4">Grievance Details</h3></Center>
                            <table className="w-100">
                                <tr colSpan={2}><Center><p className="mb-4 font_custom" style={{fontSize:"30px", fontWeight:"bold"}}>Grivance Details</p></Center></tr>
                                <tr>
                                    <td colSpan={2}>
                                        <TextField id="trackFormTitle" className="w-100" name="trackFormTitle" label="Title" variant="outlined" style={{marginBottom:"15px", height:"40px !important"}} value = {this.state.grievance.title}/> 
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField id="trackFormCategory" name="trackFormCategory" label="Category" variant="outlined" className="w-100" style={{marginBottom:"15px", height:"40px !important"}} value = {this.state.grievance.category}/> 
                                    </td>
                                    <td>
                                        <TextField id="trackFormSubCategory" name="Sub Category" label="trackFormSubCategory" variant="outlined" value = {this.state.grievance.subcategory} className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <TextField id="trackFormDescription" className="w-100" name="Description" value = {this.state.grievance.description} label="trackFormDescription" variant="outlined" multiline rows="4" style={{marginBottom:"15px", height:"40px !important"}}/>
                                        <hr/>
                                    </td>
                                </tr>
                            </table>
                            :this.state.selected_2? 
                            <table className="w-100">
                                <tr colSpan={2}><Center><p style={{fontSize:"30px", fontWeight:"bold"}} className="mb-4 font_custom">Track Record</p></Center></tr>
                                <tr>
                                    <td colSpan={2}>
                                        <TextField id="trackFormTitle" className="w-100" name="Subject" label="Subject" variant="outlined" value = {this.state.megatrack[this.state.last_track_index].action} style={{marginBottom:"15px", height:"40px !important"}}/> 
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField id="trackFormLevel" name="trackFormLevel" label="Level" variant="outlined" value = {this.state.megatrack[this.state.last_track_index].level} className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
                                    </td>
                                    <td>
                                        <TextField id="trackFormAuthority" name="trackFormAuthority" label="Authority" variant="outlined" value = "Shaurya Shanoy" className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <TextField id="trackForm2Description" className="w-100" name="trackForm2Description" label="Description" value = {this.state.megatrack[this.state.last_track_index].action} variant="outlined" multiline rows="4" style={{marginBottom:"15px", height:"40px !important"}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField id="trackFormDate" name="trackFormDate" label="Date" variant="outlined" value = {this.state.megatrack[this.state.last_track_index].date}  className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
                                    </td>
                                    <td>
                                        <TextField id="trackFormTime" name="trackFormTime" label="Time" variant="outlined" value = {this.state.megatrack[this.state.last_track_index].current_time} className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
                                    </td>
                                    <hr/>
                                </tr>
                            </table>
                            :this.state.selected_1?
                             // Write here 
                             this.state.grievance.status == "Response"?
                            <div className="toggleResponseButton">
                                <div className="areYouSatisfied">
                                    <Center><p className="font_custom mt-3 mb-3" style={{fontSize:"50px", fontWeight:"bold"}}>Are you satisfied?</p></Center>
                                </div>
                                <div className="yesNo">
                                    <div className="yepSatisfied" onClick = {this.send_feedback.bind(this,true)}>
                                        <img src="https://res.cloudinary.com/iketu312/image/upload/v1581523600/undraw_smiley_face_lmgm_mq4hza.svg" style={{width:"150px", height:"150px"}} />
                                    </div>
                                    <div className="notSatisfied" onClick = {this.send_feedback.bind(this,false)}>
                                        <img src="https://res.cloudinary.com/iketu312/image/upload/v1581523603/undraw_feeling_blue_4b7q_zz8ymc.svg" style={{width:"150px", height:"150px"}} />
                                    </div>
                                </div>
                            </div>
                            :null
                            :null
                            }
                    
                            
                        </div>
                    </div>
                </div>
            </Modal>
            {/* Track Grivance Modal ends */}

            
        </div>
    );
}
}

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        isOpen = {props.show}
        className = "font_custom"
        centered = "true"
      >
          <div>
                
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
          <ModalFooter>
            <Button onClick={props.onHide}>Close</Button>
          </ModalFooter>
      </Modal>
    );
  }

  Student_MainPage.propTypes = {
    classes: PropTypes.object.isRequired,
    }


export default withStyles(styles) (Student_MainPage);                          