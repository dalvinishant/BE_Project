//Imports
import React, { useState,Component, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import mdb from 'mdbreact';
import { MDBFileInput } from "mdbreact";
import './search.css'
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import "mdbreact/dist/css/mdb.css";
import {Link,Redirect} from 'react-router-dom';
import axios from 'axios'
import {Modal,ModalHeader,ModalFooter,ModalBody} from "reactstrap";
import {Launcher} from 'react-chat-window';
import ChatBot from 'react-simple-chatbot';
import CustomChatbot from './customChatBot'
import TextField from '@material-ui/core/TextField';
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
    }
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
            modalShow:false,
            filterModal:false,
            setModalShow:true,
            searchTerm : '  ',
            setSearchTerm: '',
            grievance : 
            {
                studentid:1345,
                title:'',
                category:'',
                subcategory:'',
                description:'',
                files:['file1', 'file2'],
                action:[]
            },
            go:false,
            listening: false,
            term:'',
            db_book:[],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange_category = this.handleChange_category.bind(this);
        this.handleChange_sub_category = this.handleChange_sub_category.bind(this);

        this.toggleListen = this.toggleListen.bind(this);
        this.handleListen = this.handleListen.bind(this);
        this.handleChange_voice=this.handleChange_voice.bind(this);
        this.submit = this.submit.bind(this);
    }
    
///////////////////////////////////////////////////////////New Functions



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
    this.state.grievance.sub_category = e.target.value;     
    // console.log(this.state.grievance.sub_category);
    
}
handleChange_description(e)
{
    // console.log(this.state.grievance.description);
    this.state.grievance.description = e.target.value; 
    
}

submit()
{
    console.log(this.state.grievance)
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: this.state.grievance,
        url:'http://127.0.0.1:5000/student/124'
      }
  
      console.log("Sending Query: "+String(this.state.grievance.title));
     //  console.log(this.send_book[0])
      var result = axios(options).then(res=>{
           console.log('Posted');
           console.log(res.data);
      }).catch(error=>{
        console.log('Not Posted');
        console.log(error.response)
      })
      this.state.go=true;
}











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
            filterModal:!this.state.filterModal
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
            <div className="leftpane centered p-3 font_custom">
                <center style={{height:"90%", width:"80%", borderRadius:"20px",background:"#f2f2f2"}} className="shadow bg-white">
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
                            <tr onClick={this.toggleModalShow.bind(this)}>
                                <td className="p-2" style={{textAlign:"center", width:"30%"}}>
                                    <img src={trending}  style = {{height : "40px",width :"40px"}} 
                                       ></img>
                                </td>
                                <td className="p-2">
                                <tr><strong><h6 style={{fontSize:"18px"}}><b>View Grievances</b></h6></strong></tr>
                                    <tr><h7>View all submitted grievances</h7></tr>
                                </td>
                            </tr>
                            <tr onClick={this.toggleModalShow.bind(this)}>
                                <td className="p-2" style={{textAlign:"center"}}>
                                <img src={trending}  style = {{height : "40px",width :"40px"}} 
                                       ></img>
                                </td>
                                <td className="p-2">
                                    <tr><strong><h6 style={{fontSize:"18px"}}><b>Response</b></h6></strong></tr>
                                    <tr><h7>View the responses for submitted grivances</h7></tr>
                                </td>
                            </tr> <tr onClick={this.toggleModalShow.bind(this)}>
                                <td className="p-2" style={{textAlign:"center"}}>
                                    <img src={trending}  style = {{height : "40px",width :"40px"}} 
                                       ></img>
                                </td>
                                <td className="p-2">
                                <tr><strong><h6 style={{fontSize:"18px"}}><b>Debared Grievances</b></h6></strong></tr>
                                    <tr><h7>View the debared grievances</h7></tr>
                                </td>
                            </tr>
                            
                        </table>
                        
                        <hr/>
                    </div>
                    </div>
                </center>
            </div>
            {/* MIDDLEPANE */}
            <div className="middlePane" id="middlePane">
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
                    <div className="shadow-lg bg-white p-3" style={{borderRadius:"10px"}}>
                        <form onSubmit = {this.handleSubmit} > 
                            <table className = "w-100">
                                <tr>
                                    <td colSpan={2} >
                                        {/* <input name="input_search" id="input_search" defaultValue={term} type="text" placeholder="Title" onChange = {this.handleChange} contentEditable='true' aria-label="Search" style={{fontSize: '20px',border:"0px",paddingLeft:"30px",height: '70px',backgroundColor:"transparent", outlineColor:"transparent", width: "100%"}} /> */}
                                        <TextField id="book_title" className="w-100" name="add_book" label="Title" variant="outlined" onChange = {this.handleChange_title.bind(this)} style={{marginBottom:"15px", height:"40px !important"}}  InputProps={{
                                        classes: {
                                        border:classes.border,
                                        notchedOutline: classes.notchedOutline
                                        }
                                        }}/> 
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
                                    onChange = {this.handleChange_description.bind(this)} label="Description" variant="outlined" multiline rows="4" style={{marginBottom:"15px", height:"40px !important"}}  InputProps={{
                                        classes: {
                                        border:classes.border,
                                        notchedOutline: classes.notchedOutline
                                        }
                                        }}/>
                                     <hr/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="image-upload">
                                        <Center>
                                            {/* <Button input="file" id = "chat_button" style= {{textTransform:"none",borderRadius:"60%"}}>
                                                <i class="fas fa-paperclip" aria-hidden="true"></i>
                                            </Button> */}
                                             <label for="file-input">
                                                 {/* <img src={clip} */}
                                            </label> 
                                            <input id="file-input" type="file" />
                                            {/* <MDBFileInput multiple btnColor="info" /> */}
                                            </Center>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <Center>
                                            <Button className="w-50" id = "chat_button" style= {{textTransform:"none"}} onClick = {this.submit}>
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
                    <table width="90%" style= {{marginTop:"10px"}}>
                       <tr>
                            <td>
                                <h3 className = "font_custom" style= {{textAlign:"left", verticalAlign:"bottom"}}>
                                    <b>Exam Feed</b>
                                    <hr/>
                                </h3>
                            </td>
                       </tr>
                    </table>
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
                        <hr width="90%"/>
                        <h3 className = "font_custom" width="90%" style= {{textAlign:"left", verticalAlign:"bottom",marginLeft:"15px"}}>
                                    <b>Suggestion</b>
                        </h3>
                        <hr width="90%"/>
                        <textarea cols="7" rows="5" placeholder="Type your suggestion here . . . " style = {{resize:"none",height:"40%",width:"90%",border:"none",background:"#f2f2f2",borderRadius:"20px",outline:"none",padding:"5px",paddingLeft:"15px",paddingTop:"15px"}}>
                        </textarea>
                        <hr width="90%"/>
                        <Button className="w-50" id = "chat_button" style= {{textTransform:"none"}}>
                            Submit
                        </Button>
                    </div>
                </center>
            </div>
           {/* <Search_Result name={searchTerm}/> */}

           <Modal
            isOpen = {this.state.filterModal}
            centered = {true}
            size='lg'
           >
               <div class="modal_filter" style={{display:"flex", alignItems: "center", justifyContent:"space-between"}}>
               <div class="font_custom">
                   <h3 className="p-3">Add Filters</h3>
               </div>
               <div>
                    <IconButton id="close" className="closeItem p-3" onClick={this.toggleFilterModal}>    
                    <CloseIcon className="text-right" style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
                    </IconButton>
               </div>
               </div>
                <div>
                <hr/>
                    <div className="p-3">
                        {/* <TextField id="book_title" defaultValue=" " name="add_book"  className="w-50 font_custom" label="Author" variant="outlined"  style={{height:"40px !important"}}  InputProps={{
                        classes: {
                        border:classes.border,
                        notchedOutline: classes.notchedOutline
                        }
                        }}/> */}
                        <Autocomplete
                        id="categoryFilter"
                        options={categories}
                        // // onChange={handleChange}
                        // value={category}
                        groupBy={option => option.firstLetter}
                        filterSelectedOptions
                        getOptionLabel={option => option.title}
                        style={{ width: "50%"}}
                        renderInput={params => (
                            <TextField {...params} label="Categories" variant="outlined" fullWidth />
                        )}
                        />
                    </div>
                </div>
           </Modal>

           {/* Chatbot */}
           {/* <CustomChatbot /> */}
           {/* <Launcher
                agentProfile={{
                teamName: 'Library Support',
                imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}
                onMessageWasSent={this._onMessageWasSent.bind(this)}
                messageList={this.state.messageList}
                showEmoji>
                <div id="sc-launcher" className="sc-launcher">
                    <img className="sc-open" src={chaticon}/>
                   
                </div>
            </Launcher> */}
         {/* Main division ends */}
         {/* <iframe src="https://assistant-chat-eu-gb.watsonplatform.net/web/public/9610c1c7-a1ce-4520-9ac6-0800c91a1142" style = {{height:"40%",width:"50%"}}></iframe> */}
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