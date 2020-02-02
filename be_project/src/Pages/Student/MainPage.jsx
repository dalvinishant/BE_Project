//Imports
import React, { useState,Component, useEffect } from 'react';
import bootstrap from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import mdb from 'mdbreact';
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
import logo from './Assets/Icon/BRAIT_Transparent_1.png';
import ray from './Assets/ray.JPG';
import nocover from './Assets/No_Cover.jpg';
import tfios from './Assets/thefault.jpg';
import background from './Assets/Icon/background.png';
import { withStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import checklist from './Assets/Icon/checklist.svg';
import chaticon from './Assets/Icon/comment.png';



import Search_Result from './SearchResult'
//Function definitions

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

const styles = theme => ({
    border:"2px solid #2b2b2b",
    notchedOutline: {
       borderWidth: "1px",
       borderColor: "#2b2b2b !important"
    },
    customBadge: {
       backgroundColor: "#ef5350",
       width: "2px",
    }
 });

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
            go:false,
            listening: false,
            term:'',
            db_book:[],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleListen = this.toggleListen.bind(this);
        this.handleListen = this.handleListen.bind(this);
        this.handleChange_voice=this.handleChange_voice.bind(this);
    }
    

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
                    pathname: "/Search_Result",
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
                    
                    <div id="recommendations" >
                        <hr/>
                        <h5 className = "font_custom" style={{textAlign:"left",paddingLeft:"20px"}}>
                                <b>Recommendations</b>
                        </h5>
                        <hr />
                        <table>
                            <tr>
                                <td className="p-2">
                                    <img className="shadow" style={{width:"60px", height:"60px", borderRadius:"70%"}} src={nocover}/>
                                </td>
                                <td className="p-2">
                                <tr><strong><h6><b>Gone Girl</b></h6></strong></tr>
                                    <tr><h7>Gillian Flynn</h7></tr>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2">
                                    <img className="shadow" style={{width:"60px", height:"60px", borderRadius:"70%"}} src={tfios}/>
                                </td>
                                <td className="p-2">
                                    <tr><strong><h6><b>The Fault in our Stars</b></h6></strong></tr>
                                    <tr><h7>John Green</h7></tr>
                                </td>
                            </tr>
                        </table>
                        <hr/>
                    </div>
                    <Button className="w-75" id = "chat_button" style= {{textTransform:"none"}}>
                        Chat
                    </Button>
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
                            <h2 style={{verticalAlign:"center", textAlign:"left",marginLeft:"20px", marginTop:"10px"}} id='title'>Dr. B. R. Ambedkar<br/>Institute of Technology</h2>
                            <div style = {{borderTop:"2px solid #ff0000", width:'70%', marginLeft : '20px'}}>
                            <h4 id = "title" style = {{ marginTop:"1px"}}> Library</h4>
                            </div>
                        </td>
                    </tr>
                </table>
                </center>
                <mdb md="6">
                    <div>
                        {/* <div className="w-50"> */}
                    <form onSubmit = {this.handleSubmit} > 
                        <table className = "w-100">
                            <tr>
                            <div id='search_bar' className="mb-4 w-100 shadow-lg w-responsive mx-auto mt-4 rounded-pill" style = {{ backgroundColor:"#ffffff"}}>
                                <td width="92%">
                                <input name="input_search" id="input_search" defaultValue={term} type="text" placeholder="Search" onChange = {this.handleChange} contentEditable='true' aria-label="Search" style={{fontSize: '20px',border:"0px",paddingLeft:"30px",height: '70px',backgroundColor:"transparent", outlineColor:"transparent", width: "100%"}} /></td>
                                <td style={{alignSelf:"right",verticalAlign:"middle",paddingRight:"10px"}}>
                                    <IconButton id="filter">    
                                        <i style={{color:"#2b2b2b"}} class="fas fa-filter" onClick = {this.toggleFilterModal}></i>
                                    </IconButton>  
                                </td> 
                                <td style={{alignSelf:"right",verticalAlign:"middle",paddingRight:"10px"}}>
                                    <IconButton id="mic" onClick={this.toggleListen}>    
                                        <MicIcon   className="text-right" style = {{height : "30px",width :"30px",color : "#2b2b2b"}}/>
                                    </IconButton>  
                                </td>  
                          </div>
                          </tr>
                          </table>
                    </form>
                          <center>
                          <table className = "w-75" id="actionIcons">
                          <tr>
                                <td>
                                    <div id="service" style= {{backgroundColor:"transparent"}}>  
                                       <IconButton style = {{outline:"none"}} onClick={this.toggleModalShow.bind(this)}> <img src={trending}  style = {{height : "40px",width :"40px"}} 
                                       ></img></IconButton>
                                        <p className="font_custom" style={{fontFamily:"Exo 2"}}>
                                        &nbsp;&nbsp;45</p>  
                                    </div>  
                                </td>
                                <td>
                                    <div id="service" style= {{backgroundColor:"transparent"}}>  
                                       <IconButton style = {{outline:"none"}} onClick={this.toggleModalShow.bind(this)}> <img  src={dollar}  style = {{height : "40px",width :"40px"}} 
                                       ></img></IconButton>
                                        <p className="font_custom" style={{fontFamily:"Exo 2"}}>
                                        &nbsp;&nbsp;10</p>  
                                    </div>  
                                </td>
                                <td>
                                    <div id="service" style= {{backgroundColor:"transparent"}}>  
                                       <IconButton style = {{outline:"none"}} onClick={this.toggleModalShow.bind(this)}><b> <img  src={letter}  style = {{height : "40px",width :"40px"}} 
                                       ></img></b></IconButton>
                                        <p className="font_custom" style={{fontFamily:"Exo 2"}}>
                                        &nbsp;&nbsp;36</p>  
                                    </div>  
                                </td>
                                <td>
                                    <div id="service" style= {{backgroundColor:"transparent"}}>  
                                       <IconButton style = {{outline:"none"}} onClick={this.toggleModalShow.bind(this)}> <img  src={history}  style = {{height : "35px",width :"35px"}} 
                                       ></img></IconButton>
                                        <p className="font_custom" style={{fontFamily:"Exo 2"}}>
                                        &nbsp;&nbsp;12</p>  
                                    </div>  
                                </td>
                        </tr>
                        </table>
                         </center>
                        {/* </div> */}
                    </div>
                </mdb>
                <MyVerticallyCenteredModal
        show={this.state.modalShow}
        onHide={this.toggleModalShow.bind(this)}
      />
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
           <CustomChatbot />
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