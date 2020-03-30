import React, {Component} from 'react';
import './search.css';
import { Button } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import {Modal,ModalHeader,ModalFooter,ModalBody} from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import './animate.css';
import { Code } from 'react-content-loader';
import Center from 'react-center';
import mdb from 'mdbreact';
import "mdbreact/dist/css/mdb.css";
import Autocomplete from '@material-ui/lab/Autocomplete';
import ProgressBar from 'react-bootstrap/ProgressBar'


//Icon Imports
import ray from './Assets/ray.JPG';
import logo from './Assets/Icon/logo_i2it_2.png';
import pending from './Assets/Icon/pending.png';
import reverted from './Assets/Icon/reverted.png';
import debarred from './Assets/Icon/cancel_1.png';
import forward from './Assets/Icon/Forward.png';
import resolved from './Assets/Icon/resolved.png';
import all from './Assets/Icon/view.png';
import track from './Assets/Icon/track_1.png';


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

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

class Commitee extends Component {

    constructor(props)
    {
        super(props)
        this.state={
            loading:false,
            resolve:false,
            pending_modal:false,
            pending_modal_proc1:false,
            list_grievance:{
                Data:[]
            },
            selected_item:{
                details:{
                    
                }
            }

        }
        this.fetch_grievance = this.fetch_grievance.bind(this);
        this.to_resolve = this.to_resolve.bind(this);
    }

    
    
//// Loading State toggle function
isloading = ()=>
{
    this.setState({
        loading:!this.state.loading
    })
}
//// Loading State toggle function ends

//// Modal Toggle Functions starts

pendingModal = () =>
{
    this.setState({
        pending_modal:!this.state.pending_modal
    })
}

pendingModalProc1 = () =>
{
    this.setState({
        pending_modal:!this.state.pending_modal,
        pending_modal_proc1:!this.state.pending_modal_proc1,
    })
    //this.fetch_grievance_details(item)
    // console.log(this.state.selected_item);
}
//// Modal Toggle Functions ends

//// Fetching Grievances
fetch_grievance = () => {
    this.setState({
        pending_modal:!this.state.pending_modal,
        loading:!this.state.loading
    })
    // console.log("In fetch");
    let res = axios.get("http://127.0.0.1:5000/committeeAll_ip")
    .then(res=>{
        //console.log(res.data);
        this.setState({
            list_grievance:res.data,
            loading:false
        })
        // console.log(this.state.list_grievance);
        }).catch(error=>{
           console.log(error.response)
        }) 
        
};

fetch_grievance_details = (item) =>{
    this.setState({
        pending_modal:!this.state.pending_modal,
        pending_modal_proc1:!this.state.pending_modal_proc1,
        loading:true,
    })
    let res = axios.get("http://127.0.0.1:5000/committee/"+item.chainid)
    .then(res=>{
        this.setState({
            selected_item:res.data,
            loading:false
        })

        console.log("Selected_Item : ",this.state.selected_item);
    }).catch(error=>{
        console.log(error.response)
     }) 
}
//// Fetching Grievances

to_resolve = () => {
    this.setState({
        resolve:!this.state.resolve
    })
}


    render(){
        return(
            // Main Div Starts 
                <div>

                    {/* Logo Section Starts  */}
                    <div className = "pl-5 pt-5 pr-5 pb-4">
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
                    </div>
                    {/* Logo Section Ends  */}

                    {/* Flex Section Starts  */}
                    <div className = "pl-4 pr-4 pb-4 pt-1" style = {{display:"flex",flexDirection:"row"}}>

                        {/* Profile Section starts */}
                        <div className="leftpane mt-5" id ="leftpane">
                            <div  className="profile-data p-3 shadow bg-white" id ="profile-data">
                                <table>
                                    <tr>
                                    <td>
                                        <img className="shadow" style={{width:"80px", height:"80px", borderRadius:"50%"}}src={ray}/>
                                    </td>
                                    <td>
                                        <h3 className="font_custom" style = {{marginTop:"10px",fontSize:"20px", verticalAlign:"middle", paddingLeft:"10px"}}>Ninad Kheratkar
                                        </h3>
                                    </td>
                                    </tr>
                                </table>
                                <center>
                                    <table className = "font_custom" id="studentDetails" style = {{marginTop: "20px", borderRadius:"10px",background:"#f2f2f2"}}>
                                        <tr style = {{padding:"20px"}}>
                                            <td >
                                                <div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>Library ID</div>
                                            </td>
                                            <td>
                                                <div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>L-16-10</div>
                                            </td>
                                        </tr>
                                        <tr style = {{padding:"10px"}}>
                                            <td>
                                                <div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>College</div>
                                            </td>
                                            <td>
                                                <div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>I<sup>2</sup>IT, Pune</div>
                                            </td>
                                        </tr>
                                        <tr style = {{padding:"10px"}}>
                                            <td>
                                                <div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>Mobile</div>
                                            </td>
                                            <td>
                                                <div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>+91-9890358113</div>
                                            </td>
                                        </tr>
                                    </table>
                                </center>
                            </div>
                        </div>
                        {/* Profile Section Ends */}
                        
                        {/* Manage Grievances starts */}
                        <div className = "shadow bg-white middlepane ml-3 p-2" id = "middlepane" style = {{width:"35%",borderRadius:"10px"}}>

                            {/* Heading starts*/}
                            <p className = "pt-3 pl-3 pr-3 pb-1 font_custom" style= {{fontSize:"22px",fontWeight:"bold"}}>Manage Grievances</p>
                            <hr/>
                            {/* Heading ends*/}

                            {/* Grievance Action Starts  */}
                            {/* Row1  */}
                            <div className="justify-content-around p-2" style = {{display:"flex",flexDirection:"row"}}>
                                <button className = "p-2 shadow bg-white" style= {{borderRadius:"10px",height:"120px",width:"31%",border:"white",outline:"none"}} onClick = {this.fetch_grievance.bind(this)}>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {pending} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>Pending </p>
                                    </center>
                                </button>
                                <button className = "p-2 shadow bg-white" style= {{borderRadius:"10px",height:"120px",width:"31%",outline:"none",border:"white"}}>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {reverted} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>Reverted </p>
                                    </center>
                                </button>
                                <button className = "p-2 shadow bg-white" style= {{borderRadius:"10px",height:"120px",width:"31%",outline:"none",border:"white"}}>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {forward} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>Forwarded </p>
                                    </center>
                                </button>
                            </div>
                            {/* Row1 ends  */}
                            {/* Row2  */}
                            <div className="justify-content-around mt-4 pb-5 p-2" style = {{display:"flex",flexDirection:"row"}}>
                                <button className = "p-2 shadow bg-white" style= {{borderRadius:"10px",height:"120px",width:"31%",outline:"none",border:"white"}}>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {debarred} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>Debarred </p>
                                    </center>
                                </button>
                                <button className = "p-2 shadow bg-white" style= {{borderRadius:"10px",height:"120px",width:"31%",outline:"none",border:"white"}}>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {resolved} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>Resolved</p>
                                    </center>
                                </button>
                                <button className = "p-2 shadow bg-white" style= {{borderRadius:"10px",height:"120px",width:"31%",outline:"none",border:"white"}}>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {all} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>All Grievances</p>
                                    </center>
                                </button>
                            </div>
                            {/* Row2 ends  */}

                        </div>
                        {/* Manage Grievances ends */}

                        {/* Statistics starts */}
                        <div className = "shadow bg-white ml-3 p-2" style = {{width:"35%",borderRadius:"10px"}}>
                            <p className = "pt-3 pl-3 pr-3 pb-1 font_custom" style= {{fontSize:"22px",fontWeight:"bold"}}>Statistics</p>
                            <hr/>
                            <ProgressBar animated now={45} />
                        </div>
                        {/* Statistics ends */}

                    </div>
                    {/* Flex Section Ends  */}

                    {/* Pending Modal Starts  */}
                    <Modal 
                        isOpen = {this.state.pending_modal}
                        centered = {true}
                        size='lg'>
                            <div>
                                <div class="modal_filter" style={{display:"flex", alignItems: "center", justifyContent:"space-between"}}>
                                    <div class="font_custom">
                                        <h3 className="pt-5 pl-4 pr-4 pb-2"><b>Pending Grievances</b></h3>
                                    </div>
                                    <div>
                                            <IconButton id="close" className="closeItem p-3" onClick={this.pendingModal.bind(this)}>    
                                            <CloseIcon className="text-right" style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
                                            </IconButton>
                                    </div>
                                </div>
                                <hr/>
                                <div className="p-3" id="modalScroll">
                                    {this.state.loading?
                                        <Center>
                                            <Code 
                                            height={210}
                                            backgroundColor={'#f2f2f2'}
                                            foregroundColor={'#fff'}
                                            style = {{paddingTop:"100px"}}
                                            />
                                        </Center>
                                    :   <table className = "w-100 p-1 font_custom" >
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
                                            <th style = {{width:"12%", fontSize:"18px"}}>
                                                <b>Date</b>
                                            </th>
                                            <th style = {{width:"12%", fontSize:"18px"}}>
                                                <b>Track</b>
                                            </th>
                                            </tr>
                                            {/* Listing Grievance Starts */}

                                                {
                                                    this.state.list_grievance.Data.map((item, index) => 
                                                    {
                                                        if(item.status == "In-Progress" || item.status == "Raised")
                                                        {
                                                            return(
                                                                <tr>
                                                                    <td className="pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        {index+1}
                                                                    </td>
                                                                    <td className = "pl-2 pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada"}}>
                                                                        {item.title.length>0?item.title:<i>No Title</i>}
                                                                    </td>
                                                                    {
                                                                        item.status == "In-Progress"?
                                                                            <td className=" pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                                <div className="shadow inProgress">
                                                                                    <b>In-Progess</b>
                                                                                </div>
                                                                            </td>
                                                                        :item.status == "Raised"?
                                                                            <td className=" pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                                <div className="shadow raised">
                                                                                    <b>Raised</b>
                                                                                </div>
                                                                            </td>
                                                                        :null

                                                                    }
                                                                    
                                                                    <td className="pt-2" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        {item.date}
                                                                    </td>
                                                                    <td className="p-3" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        <button style = {{border:"none",background:"none",outline:"none"}} >
                                                                            <img src={track}  style = {{height : "25px",width :"25px", align:"center"}} onClick = {this.fetch_grievance_details.bind(this,item)}></img>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                                );
                                                        }
                                                    })    
                                                }
                                                {/*Listing Grievance Ends */}                            
                                    </table>
                                        }
                                 </div>
                            </div>
                    </Modal>

                    {/* Pending Modal Ends  */}
                    
                    {/* Pending Modal Process 1 Starts  */}
                    <Modal
                        isOpen = {this.state.pending_modal_proc1}
                        centered = {true}
                        size='lg'>
                                <div>
                                    <div class="modal_filter" style={{display:"flex", alignItems: "center", justifyContent:"space-between"}}>
                                                <div class="font_custom">
                                                    <h3 className="pt-5 pl-4 pr-4 pb-2"><b>ID : 11203</b></h3>
                                                </div>
                                                <div>
                                                        <IconButton id="close" className="closeItem p-3" onClick={this.pendingModalProc1.bind(this.state.selected_item)}>    
                                                        <CloseIcon className="text-right" style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
                                                        </IconButton>
                                                </div>
                                    </div>
                                    <hr/>                        
                                    <div className="p-3" id="modalScroll">
                                        {this.state.loading?
                                            <Center>
                                                <Code 
                                                height={210}
                                                backgroundColor={'#f2f2f2'}
                                                foregroundColor={'#fff'}
                                                style = {{paddingTop:"100px"}}
                                                />
                                            </Center>
                                        :
                                            <center className = "justify-content-around pt-3 pl-5 pr-5 pb-5" style = {{display : "flex",flexDirection:"row"}}>
                                            <table className="p-1" style = {this.state.resolve?{width:"45%"}:{width:"75%"}} >
                                                    <tr>
                                                        <td colSpan={2}>
                                                            <TextField id="trackFormTitle" className="w-100" name="Subject" label="Subject" variant="outlined" value = {this.state.selected_item.details.title} style={{marginBottom:"15px", height:"40px !important"}}/> 
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <TextField id="trackFormLevel" name="trackFormLevel" label="Category" variant="outlined" value = {this.state.selected_item.details.category} className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
                                                        </td>
                                                        <td>
                                                            <TextField id="trackFormAuthority" name="trackFormAuthority" label="Sub Category" variant="outlined" value = {this.state.selected_item.details.subcategory} className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={2}>
                                                            <TextField id="trackForm2Description" className="w-100" name="trackForm2Description" label="Description" value = {this.state.selected_item.details.description} variant="outlined" multiline rows="4" style={{marginBottom:"15px", height:"40px !important"}}/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <TextField id="trackFormDate" name="trackFormDate" label="Date" variant="outlined" value = {"DD-MM-YY"}  className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
                                                        </td>
                                                        <td>
                                                            <TextField id="trackFormTime" name="trackFormTime" label="Time" variant="outlined" value = {"12:30 PM"} className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
                                                        </td>
                                                        <hr/>
                                                    </tr>
                                            </table>
                                            {this.state.resolve?
                                            <div style = {{borderLeft:"3px solid #434343"}}>
                                                <table className="p-1" style= {{width:"90%"}}>
                                                        <tr colSpan = {2} >
                                                            <h4 className = "font_custom mb-4"><b>Resolution</b></h4>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={2}>
                                                                <TextField id="trackFormTitle" className="w-100" name="Subject" label="Subject" variant="outlined" value = {"RE: "+this.state.selected_item.details.title} style={{marginBottom:"15px", height:"40px !important"}}/> 
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <TextField id="trackFormLevel" name="trackFormLevel" label="Level" variant="outlined" value = "Committee" className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
                                                            </td>
                                                            <td>
                                                                <TextField id="trackFormAuthority" name="trackFormAuthority" label="Authority Name" variant="outlined" value = "Shaurya Shanoy" className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={2}>
                                                                <TextField id="trackForm2Description" className="w-100" name="trackForm2Description" label="Description" value = "This is a Test Resolution" variant="outlined" multiline rows="4" style={{marginBottom:"15px", height:"40px !important"}}/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <TextField id="trackFormDate" name="trackFormDate" label="Date" variant="outlined" value = {"DD-MM-YY"}  className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
                                                            </td>
                                                            <td>
                                                                <TextField id="trackFormTime" name="trackFormTime" label="Time" variant="outlined" value = {"12:30 PM"} className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
                                                            </td>
                                                            <hr/>
                                                        </tr>
                                                </table>
                                            </div>
                                            :null
                                            }
                                            </center>
                                        }
                                    </div>
                                </div>
                               <div style= {{display : "flex",flexDirection:"row"}}>
                                    <Button id= "chat_button" className = "font_custom w-50" style = {{fontSize:"16px"}} variant="primary" onClick = {this.to_resolve.bind(this)}>•  &nbsp;Forward&nbsp;  •</Button>
                                    <Button className = "font_custom debared  w-50" style = {{fontSize:"16px"}} variant="primary" onClick = {this.to_resolve.bind(this)}>•  &nbsp;Debar&nbsp;  •</Button>
                               </div>
                                <Button className = "resolved font_custom" style = {{fontSize:"16px"}} variant="primary" onClick = {this.to_resolve.bind(this)}>•  &nbsp;Resolve&nbsp;  •</Button>
                                
                    </Modal>
                    {/* Pending Modal Process 1 Ends  */}

                    
                </div>
                // Main Div Ends 
        );
    };
}

export default withStyles(styles) (Commitee);