import React, {Component, useState} from 'react';
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
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


//Icon Imports
import ray from './Assets/ray.JPG';
import logo from './Assets/Icon/logo_i2it_2.png';
import pending from './Assets/Icon/pending.png';
import reverted from './Assets/Icon/reverted.png';
import return_img from './Assets/Icon/return.png';
import debarred from './Assets/Icon/cancel_1.png';
import forward from './Assets/Icon/Forward.png';
import resolved from './Assets/Icon/resolved.png';
import all from './Assets/Icon/view.png';
import track from './Assets/Icon/track_1.png';
import selectedTrack from './Assets/Icon/selected_milestone.svg';
import unselectedTrack from './Assets/Icon/unselected_milestone.svg';

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

class HoD extends Component {

    constructor(props)
    {
        super(props)
        this.state={
            stats:{
                data:{
                    Resolved:0,
                    Forward:0,
                    Debarred:0,
                    Level:{
                        Resolved:0,
                        Pending:0,
                        Debarred:0,
                        Others:0
                    }
                }
            },
            loading:false,
            isHovered0: false,
            isHovered1: false,
            isHovered2: false,
            isHovered3: false,
            isHovered4: false,
            isHovered5: false,
            resolve:false,
            selected:false,
            selected_1:true,
            selected_2:false,
            count:0,
            c:{
                Count:{
                    pending:0,
                    resolved:0,
                    total:0,
                    debarred:0
                }
            },
            p_c:0,
            rev_c:0,
            f_c:0,
            d_c:0,
            res_c:0,
            a_c:0,
            flag:0,
            ret_c:0,
            pending_modal:false,
            pending_modal_proc1:false,
            reverted_modal:false,
            forwaded_modal:false,
            debared_modal:false,
            resolved_modal:false,
            returned_modal:false,
            all_modal:false,
            track_modal:false,
            status:'',
            list_grievance:{
                Data:[]
            },
            list_grievance_buff:{
                Data:[]
            },
            response:"",
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
            megatrack:[],
            last_track_index : -1,
            selected_item:{
                details:{
                    
                }
            }

        }
        this.fetch_grievance = this.fetch_grievance.bind(this);
        this.to_resolve = this.to_resolve.bind(this);
        this.handleHover0 = this.handleHover0.bind(this);
        this.handleHover1 = this.handleHover1.bind(this);
        this.handleHover2 = this.handleHover2.bind(this);
        this.handleHover3 = this.handleHover3.bind(this);
        this.handleHover4 = this.handleHover4.bind(this);
        this.handleHover5 = this.handleHover5.bind(this);
    }

    
  
////Handle Change Functions
handleChange = (e) =>
{
    this.setState({
        response : e.target.value
    })
    console.log("response : ",this.state.response)
}

////Handle Change Functions

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
        pending_modal:!this.state.pending_modal,
        p_c:this.state.c.Count.pending
    })
    this.state.p_c = this.state.c.Count.pending
    this.forceUpdate()
    console.log("c.Count.pending : ",this.state.c.Count.pending)
    console.log("p_m: ",this.state.p_c)
}

pendingModalProc1 = () =>
{
    console.log("Proc1 flag : ",this.state.flag)
    if(this.state.flag == 0)
    {
        this.setState({
            pending_modal:!this.state.pending_modal,
            pending_modal_proc1:!this.state.pending_modal_proc1,
        })
    }
    if(this.state.flag == 1)
    {
        this.setState({
            forwarded_modal:!this.state.forwarded_modal,
            pending_modal_proc1:!this.state.pending_modal_proc1,
            flag:0
        })
    }
    if(this.state.flag == 2 )
    {
        this.setState({
            debared_modal:true,
            pending_modal_proc1:!this.state.pending_modal_proc1,
            flag:0
        })
    }
    if(this.state.flag == 3 )
    {
        this.setState({
            reverted_modal:true,
            pending_modal_proc1:!this.state.pending_modal_proc1,
            flag:0
        })
    }
    
    //this.fetch_grievance_details(item)
    // console.log(this.state.selected_item);
}

revertedModal = () =>
{
    this.setState({
        reverted_modal:!this.state.reverted_modal,
        rev_c:this.state.c.Count.revert
    })
}

forwardedModal = () =>
{
    this.setState({
        forwarded_modal:!this.state.forwarded_modal
    })
    if (!this.state.forwarded_modal){
        this.setState({
            list_grievance:{
                Data:[]
            }
        })
    }
}

resolvedModal = () =>
{
    this.setState({
        resolved_modal:!this.state.resolved_modal,
        res_c:this.state.c.Count.resolved
    })
}

debaredModal = () =>
{
    this.setState({
        debared_modal:!this.state.debared_modal,
        d_c:this.state.c.Count.debarred
    })
}

returnedModal = () =>
{
    this.setState({
        returned_modal:!this.state.returned_modal,
        ret_c:this.state.c.Count.sent_to_lower
    })
}

allModal = () =>
{
    this.setState({
        all_modal:!this.state.all_modal,
        a_c:this.state.c.Count.total
    })
}

trackModal = (status) =>
{
    if (status == "In-Progress"){
        this.setState({
            pending_modal:!this.state.pending_modal,
            track_modal:!this.state.track_modal
        });
    }
    if (status == "Reverted"){
        this.setState({
            reverted_modal:!this.state.reverted_modal,
            track_modal:!this.state.track_modal
        });
    }
    if (status == "Forwarded"){
        this.setState({
            forwarded_modal:!this.state.forwarded_modal,
            track_modal:!this.state.track_modal
        });
    }
    if (status == "Debared" || "Debarred"){
        this.setState({
            debared_modal:!this.state.debared_modal,
            track_modal:!this.state.track_modal
        });
    }
    if (status == "Resolved"){
        this.setState({
            resolved_modal:!this.state.resolved_modal,
            track_modal:!this.state.track_modal,
        });

    }
    console.log("Resolved : ",this.state.resolved_modal)
    this.setState({
        status:status
    })
}

toggle_selection_track = (index) => {

    console.log("last index : ",this.state.last_track_index)
    console.log("Megatrack : ",this.state.megatrack)
    this.state.megatrack[this.state.last_track_index].is_selected = false
    this.state.selected = false
    this.state.selected_1 = false
    this.state.megatrack[index].is_selected = true
    this.state.selected_2 = true
    this.state.last_track_index = index
    this.forceUpdate()

}

toggle_grievance_details = () => {
    console.log("last index : ",this.state.last_track_index)
    console.log("Megatrack : ",this.state.megatrack)
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
    this.state.megatrack[this.state.last_track_index].is_selected = false
    this.forceUpdate()
    this.setState({
        selected:false,
        selected_1:true,
        selected_2:false
    })
    // console.log(this.state.selected)
}

forward_modal_call = (item) => {
    this.setState({
        forwarded_modal : false,
        flag:1
    })
    this.fetch_grievance_details(item)
}

debar_modal_call = (item) => {
    this.setState({
        debared_modal : false,
        flag:2
    })
    this.fetch_grievance_details(item)
}
//// Modal Toggle Functions ends

//// Fetching Grievances
fetch_grievance = (modal,link) => {
    if (modal === "pending"){
        this.setState({
            pending_modal:!this.state.pending_modal
        })
    }

    if (modal === "reverted"){
        this.setState({
           reverted_modal:!this.state.reverted_modal
        })
    }

    if (modal === "forwarded"){
        this.setState({
           forwarded_modal:true,
           f_c:this.state.c.Count.forward
        })
        //console.log("Forwarded :",this.state.forwarded_modal)
    }

    if (modal === "returned"){
        this.setState({
           returned_modal:true
        })
        //console.log("Forwarded :",this.state.forwarded_modal)
    }

    if (modal === "debared"){
        this.setState({
           debared_modal:true
        })
    }

    if (modal === "resolved"){
        this.setState({
           resolved_modal:!this.state.resolved_modal
        })
    }

    if (modal === "all"){
        this.setState({
           all_modal:!this.state.all_modal
        })
    }

    this.setState({
        loading:true
    })
    if (link === "_fd/Forward" || link === "_fd/Debar")
    {
        console.log("Here")
        let res = axios.get("http://127.0.0.1:5000/committeeAll"+link)
    .then(res=>{
        console.log(res.data.Data[0]);
        
        this.setState({
            list_grievance_buff:res.data,
            loading:false
        })
        console.log("list_grievance_buff: Data  = ",this.state.list_grievance_buff.Data);
        }).catch(error=>{
           console.log(error.response)
        }) 
    }
    else
    {
        let res = axios.get("http://127.0.0.1:5000/hod"+link)
            .then(res=>
            {
            //console.log(res.data);
                this.setState({
                    list_grievance:res.data,
                    loading:false
            })
            console.log("list_grievance: Data  = ",this.state.list_grievance.Data);
        }).catch(error=>{
           console.log(error.response)
        }) 
    }
    
        
};

fetch_grievance_details = (item) =>{
    this.setState({
        pending_modal:false,
        debared_modal:false,
        forwarded_modal:false,
        reverted_modal:false,
        pending_modal_proc1:!this.state.pending_modal_proc1,
        loading:true,
    })
    let res = axios.get("http://127.0.0.1:5000/hod/"+item.chainid)
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

fetch_track_grievance = (item) => {
    this.trackModal(item.status)
    console.log(item.chainid)
    let res = axios.get("http://127.0.0.1:5000/student/"+String(item.chainid))
    .then(res=>{
        // console.log(res.data);
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
        }).catch(error=>{
           console.log(error.response)
        }) 
        
};

forward_fetch_calls = () =>{
    this.setState({
        list_grievance:{
            Data:[]
        },
        list_grievance_buff:{
            Data:[]
        }
    })
    //this.fetch_grievance("forwarded","_fd/Forward");
    this.fetch_grievance("forwarded","_fr/Forward")
}

debared_fetch_calls = () =>{
    this.setState({
        list_grievance:{
            Data:[]
        },
        list_grievance_buff:{
            Data:[]
        }
    })
    this.fetch_grievance("debared","_fd/Debar");
    this.fetch_grievance("","_d")
}

revert_fetch_calls = (item) =>{
    this.setState({
        flag:3
    })
    this.fetch_grievance_details(item)
}

intervalID;
intervalID2;
componentDidMount(){
    this.get_count()
    this.get_stats()
    this.intervalID = setInterval(this.get_count.bind(this),6000);
    this.intervalID2 = setInterval(this.get_stats.bind(this),6000);
}

componentWillUnmount(){
    clearTimeout(this.intervalID);
    clearTimeout(this.intervalID2);
}

get_count = () =>
{
    let res = axios.get("http://127.0.0.1:5000/notify/HoD")
    .then(res=>{
        console.log(res.data)
        console.log("p_c : ",this.state.p_c)
        this.setState({
            c:res.data
        })
    }).catch(error=>{
        console.log(error.response)
     }) 
}

get_stats = () => {
    
    let res = axios.get("http://127.0.0.1:5000/statistics/HoD")
    .then(res=>{
        this.setState({
            stats:res.data
        })
        
    }).catch(error=>{
        console.log(error.response)
     })
}

//// Fetching Grievances

//// Put Functions

put_chainid = (id) =>{
    console.log("PUT :",this.state.selected_item)
    const action = "/xyz"
    const data = "xyz"
    if (id == 1)
    {
        this.action = 'hodForward/'
        this.data = 'Need Prinicipal Attention'
    }
    if (id == 2)
    {
        this.action = 'hodRevert/'
        this.data = 'Look into this'
    }
    if (id == 3)
    {
        this.action = 'hod/'
        this.data = this.state.response
    }
    console.log("action : ",this.action)
    const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        data : {message:this.data},
        url:'http://127.0.0.1:5000/'+this.action+this.state.selected_item.details.chainid
      }
      console.log("url:http://127.0.0.1:5000/"+this.action+this.state.selected_item.details.chainid)
     //  console.log(this.send_book[0])
      var result = axios(options).then(res=>{
            console.log('Posted');
            alert("Sucessfull !");
            this.setState({
                pending_modal_proc1:false,
            })
            console.log("flag : ",this.state.flag)
            if(this.state.flag == 0)
            {
                this.state.c.Count.pending = this.state.c.Count.pending - 1
                this.forceUpdate() 
                this.fetch_grievance("pending","_ip/Pending");
            } 
            if(this.state.flag == 1)
            {
                this.setState({
                    flag:0
                })
                this.forward_fetch_calls();
            }
            if(this.state.flag == 2)
            {
                this.setState({
                    flag:0
                })
                //this.debared_fetch_calls();
            }
            if(this.state.flag == 3)
            {
                this.setState({
                    flag:0
                })
                this.state.c.Count.revert = this.state.c.Count.revert - 1
                this.forceUpdate() 
                this.fetch_grievance("reverted","_fr/Back");
            }
           //console.log(res.data);
           
      }).catch(error=>{
        console.log('Not Posted');
        console.log(error.response)
      })
}

//// Put Functions

//// Hover Functions
handleHover0(){
    this.setState(prevState => ({
        isHovered0: !prevState.isHovered0
    }));
}
handleHover1(){
    this.setState(prevState => ({
        isHovered1: !prevState.isHovered1
    }));
}
handleHover2(){
    this.setState(prevState => ({
        isHovered2: !prevState.isHovered2
    }));
}
handleHover3(){
    this.setState(prevState => ({
        isHovered3: !prevState.isHovered3
    }));
}
handleHover4(){
    this.setState(prevState => ({
        isHovered4: !prevState.isHovered4
    }));
}
handleHover5(){
    this.setState(prevState => ({
        isHovered5: !prevState.isHovered5
    }));
}
//// Hover Functions

to_resolve = () => {
    if(this.state.count < 1)
    {
        this.setState({
            resolve:!this.state.resolve,
            count:this.state.count+1
        })
    }
    else
    {
        this.put_chainid(3)
    }
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
                                        <h3 className="font_custom" style = {{marginTop:"10px",fontSize:"20px", verticalAlign:"middle", paddingLeft:"10px"}}>Farhan Ansari
                                        </h3>
                                    </td>
                                    </tr>
                                </table>
                                <center>
                                    <table className = "font_custom" id="studentDetails" style = {{marginTop: "20px", borderRadius:"10px",background:"#f2f2f2"}}>
                                        <tr style = {{padding:"20px"}}>
                                            <td>
                                                <div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>College</div>
                                            </td>
                                            <td>
                                                <div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>I<sup>2</sup>IT, Pune</div>
                                            </td>
                                        </tr>
                                        <tr style = {{padding:"10px"}}>
                                            <td >
                                                <div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>College ID</div>
                                            </td>
                                            <td>
                                                <div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>L-16-10</div>
                                            </td>
                                        </tr>
                                        <tr style = {{padding:"10px"}}>
                                            <td>
                                                <div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>Level</div>
                                            </td>
                                            <td>
                                                <div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>Head of Deparment</div>
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
                                <button className = {this.state.isHovered0 ? "p-2 shadow-lg bg-white" : "p-2 shadow bg-white" } onMouseEnter={this.handleHover0} onMouseLeave={this.handleHover0} style= {{borderRadius:"10px",height:"130px",width:"31%",border:"white",outline:"none"}} onClick = {this.fetch_grievance.bind(this,"pending","_ip/Pending")}>
                                    <div class="circle"> {(this.state.c.Count.pending - this.state.p_c)!=0 ? <b>+ {this.state.c.Count.pending - this.state.p_c} </b>: null}</div>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {pending} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>Pending </p>
                                    </center>
                                </button>
                                <button className = {this.state.isHovered1 ? "p-2 shadow-lg bg-white" : "p-2 shadow bg-white" } onMouseEnter={this.handleHover1} onMouseLeave={this.handleHover1} style= {{borderRadius:"10px",height:"130px",width:"31%",outline:"none",border:"white"}} onClick = {this.fetch_grievance.bind(this,"reverted","_fr/Revert")}>
                                    <div class="circle"> {(this.state.c.Count.revert - this.state.rev_c)!=0 ? <b>+ {this.state.c.Count.revert - this.state.rev_c}</b>: null}</div>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {reverted} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>Reverted </p>
                                    </center>
                                </button>
                                <button className = {this.state.isHovered3 ? "p-2 shadow-lg bg-white" : "p-2 shadow bg-white" } onMouseEnter={this.handleHover3} onMouseLeave={this.handleHover3} style= {{borderRadius:"10px",height:"130px",width:"31%",outline:"none",border:"white"}} onClick = {this.fetch_grievance.bind(this,"returned","_fr/Back")}>
                                    <div class="circle"> {(this.state.c.Count.senr_to_lower - this.state.ret_c) < 0 ? <b>{this.setState({ret_c : this.state.c.Count.senr_to_lower})}</b> : (this.state.c.Count.sent_to_lower - this.state.ret_c) != 0 ?<b>+ {this.state.c.Count.sent_to_lower - this.state.ret_c}</b>:null}</div>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {return_img} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>Returned</p>
                                    </center>
                                </button>
                            </div>
                            {/* Row1 ends  */}
                            {/* Row2  */}
                            <div className="justify-content-around mt-4 pb-5 p-2" style = {{display:"flex",flexDirection:"row"}}>
                                <button className = {this.state.isHovered2 ? "p-2 shadow-lg bg-white" : "p-2 shadow bg-white" } onMouseEnter={this.handleHover2} onMouseLeave={this.handleHover2} style= {{borderRadius:"10px",height:"130px",width:"31%",outline:"none",border:"white"}} onClick = {this.forward_fetch_calls.bind(this)}>
                                <div class="circle"> {(this.state.c.Count.forward - this.state.f_c) < 0 ? <b>{this.setState({f_c : this.state.c.Count.forward})}{ console.log(this.state.f_c)}</b> : (this.state.c.Count.forward - this.state.f_c) != 0 ?<b>+ {this.state.c.Count.forward - this.state.f_c}</b>:null}</div>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {forward} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>Forwarded </p>
                                    </center>
                                </button>
                                <button className = {this.state.isHovered4 ? "p-2 shadow-lg bg-white" : "p-2 shadow bg-white" } onMouseEnter={this.handleHover4} onMouseLeave={this.handleHover4} style= {{borderRadius:"10px",height:"130px",width:"31%",outline:"none",border:"white"}} onClick = {this.fetch_grievance.bind(this,"resolved","_ip/Resolved")}>
                                    <div class="circle">{(this.state.c.Count.resolved - this.state.res_c) !=0 ?<b> + {this.state.c.Count.resolved - this.state.res_c} </b>: null}</div>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {resolved} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>Resolved</p>
                                    </center>
                                </button>
                                <button className = {this.state.isHovered5 ? "p-2 shadow-lg bg-white" : "p-2 shadow bg-white" } onMouseEnter={this.handleHover5} onMouseLeave={this.handleHover5} style= {{borderRadius:"10px",height:"130px",width:"31%",outline:"none",border:"white"}} onClick = {this.fetch_grievance.bind(this,"all","All")}>
                                <div class="circle">{(this.state.c.Count.total - this.state.a_c) !=0 ?<b> + {this.state.c.Count.total - this.state.a_c} </b>: null}</div>
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
                            <h5 className = "font_custom pl-3"><b>Total Institute Record</b></h5>
                            <hr/>
                            <div className = "justify-content-around mb-3" style = {{display:"flex",flexDirection:"row"}}>
                                
                                <center>
                                    <CircularProgressbar value={this.state.stats.data.Resolved} text={this.state.stats.data.Resolved+"%"}/>
                                    <h5 className="mt-3 font_custom"><b>Resolved</b></h5>
                                </center>
                                <center>
                                    <CircularProgressbar value={this.state.stats.data.Forward} text={this.state.stats.data.Forward+"%"} />
                                    <h5 className="mt-3 font_custom"><b>Forwarded</b></h5>
                                </center>
                                <center>
                                    <CircularProgressbar id= "debared_circ" value={this.state.stats.data.Debarred} text={this.state.stats.data.Debarred+"%"} />
                                    <h5 className="mt-3 font_custom"><b>Debared</b></h5>
                                </center>
                            </div>
                            <hr/>
                            <h5 className = "font_custom pl-3"><b>Commitee Record</b></h5>
                            <hr/>
                            <ProgressBar>
                                <ProgressBar animated variant="success" label = {this.state.stats.data.Level.Resolved+"%"} now={this.state.stats.data.Level.Resolved} key={1} />
                                <ProgressBar animated variant="warning" label = {this.state.stats.data.Level.Pending+"%"} now={this.state.stats.data.Level.Pending} key={2} />
                                <ProgressBar animated striped variant="danger" label = {this.state.stats.data.Level.Debarred+"%"} now={this.state.stats.data.Level.Debarred} key={3} />
                                <ProgressBar animated striped color = "#dadada" label = {this.state.stats.data.Level.Others+"%"} now={this.state.stats.data.Level.Others} key={3} />
                            </ProgressBar>
                            <center className =  "justify-content-around mt-3" style = {{display : "flex",flexDirection:"row"}}>
                                <div style = {{display : "flex",flexDirection:"row"}}>
                                    <div style = {{height:"20px",width:"20px",backgroundColor:"#28A745",borderRadius:"3px",verticalAlign:"middle"}}></div>
                                    <h6 className = "font_custom ml-2 ">Resolved</h6>
                                </div>
                                <div style = {{display : "flex",flexDirection:"row"}}>
                                    <div style = {{height:"20px",width:"20px",backgroundColor:"#FFC107",borderRadius:"3px",verticalAlign:"middle"}}></div>
                                    <h6 className = "font_custom ml-2 ">Pending</h6>
                                </div>
                                <div style = {{display : "flex",flexDirection:"row"}}>
                                    <div style = {{height:"20px",width:"20px",backgroundColor:"#DC3545",borderRadius:"3px",verticalAlign:"middle"}}></div>
                                    <h6 className = "font_custom ml-2">Debared</h6>
                                </div>
                                <div style = {{display : "flex",flexDirection:"row"}}>
                                    <div style = {{height:"20px",width:"20px",backgroundColor:"#007BFF",borderRadius:"3px",verticalAlign:"middle"}}></div>
                                    <h6 className = "font_custom ml-2">Others</h6>
                                </div>
                            </center>
                            <hr/>
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
                                                                        {item.chainid}
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
                                                        <IconButton id="close" className="closeItem p-3" onClick={this.pendingModalProc1.bind()}>    
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
                                                            <TextField id="trackForm2Description" className="w-100" name="trackForm2Description" label="Description" value = {this.state.selected_item.details.description}  variant="outlined" multiline rows="4" style={{marginBottom:"15px", height:"40px !important"}}/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <TextField id="trackFormDate" name="trackFormDate" label="Date" variant="outlined" value = {this.state.selected_item.dos}  className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
                                                        </td>
                                                        <td>
                                                            <TextField id="trackFormTime" name="trackFormTime" label="Time" variant="outlined" value = {this.state.selected_item.tos} className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
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
                                                                <TextField id="trackFormLevel" name="trackFormLevel" label="Level" variant="outlined" value = "HoD" className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
                                                            </td>
                                                            <td>
                                                                <TextField id="trackFormAuthority" name="trackFormAuthority" label="Authority Name" variant="outlined" value = "Shaurya Shanoy" className="w-100" style={{marginBottom:"15px", height:"40px !important"}}/> 
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={2}>
                                                                <TextField id="trackForm2Description" className="w-100" name="trackForm2Description" label="Description"  onChange = {this.handleChange.bind(this)} variant="outlined" multiline rows="4" style={{marginBottom:"15px", height:"40px !important"}}/>
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
                                    <Button id= "chat_button" className = {this.state.flag == 3 ? "font_custom w-50 disabled" : "font_custom w-50"} style = {{fontSize:"16px"}} variant="primary" onClick = {this.put_chainid.bind(this,1)}>•  &nbsp;Forward&nbsp;  •</Button>
                                    <Button className = {this.state.flag == 3 ? "font_custom returned w-50 disabled" : " returned font_custom w-50"} style = {{fontSize:"16px"}} variant="primary" onClick = {this.put_chainid.bind(this,2)}>•  &nbsp;Return&nbsp;  •</Button>
                               </div>
                                <Button className = "resolved font_custom" style = {{fontSize:"16px"}} variant="primary" onClick = {this.to_resolve.bind(this)}>•  &nbsp;Resolve&nbsp;  •</Button>
                                
                    </Modal>
                    {/* Pending Modal Process 1 Ends  */}

                    {/* Reverted Modal Starts  */}
                    <Modal 
                        isOpen = {this.state.reverted_modal}
                        centered = {true}
                        size='lg'>
                            <div>
                                <div class="modal_filter" style={{display:"flex", alignItems: "center", justifyContent:"space-between"}}>
                                    <div class="font_custom">
                                        <h3 className="pt-5 pl-4 pr-4 pb-2"><b>Reverted Grievances</b></h3>
                                    </div>
                                    <div>
                                            <IconButton id="close" className="closeItem p-3" onClick={this.revertedModal.bind(this)}>    
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
                                                        if(item.status == "Revert")
                                                        {
                                                            return(
                                                                <tr>
                                                                    <td className="pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        {item.chainid}
                                                                    </td>
                                                                    <td className = "pl-2 pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada"}}>
                                                                        {item.title.length>0?item.title:<i>No Title</i>}
                                                                    </td>

                                                                    <td className=" pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        <div className="shadow response">
                                                                            <b>Reverted</b>
                                                                        </div>
                                                                    </td>

                                                                    <td className="pt-2" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        {item.date}
                                                                    </td>
                                                                    <td className="p-3" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        <button style = {{border:"none",background:"none",outline:"none"}} >
                                                                            <img src={track}  style = {{height : "25px",width :"25px", align:"center"}} onClick = {this.revert_fetch_calls.bind(this,item)}></img>
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
                    {/* Reverted Modal Ends*/}

                    {/* Forwarded Modal Starts  */}
                    <Modal 
                        isOpen = {this.state.forwarded_modal}
                        centered = {true}
                        size='lg'>
                            <div>
                                <div class="modal_filter" style={{display:"flex", alignItems: "center", justifyContent:"space-between"}}>
                                    <div class="font_custom">
                                        <h3 className="pt-5 pl-4 pr-4 pb-2"><b>Forwarded Grievances</b></h3>
                                    </div>
                                    <div>
                                            <IconButton id="close" className="closeItem p-3" onClick={this.forwardedModal.bind(this)}>    
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

                                            {/* Listing Forward In-Progress Starts  */}
                                                {
                                                    this.state.list_grievance_buff.Data.map((item, index) => 
                                                    {
                                                        if(item.status == "In-Progress" && item.forwardcount>0)
                                                        {
                                                            return(
                                                                <tr>
                                                                    <td className="pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        {item.chainid}
                                                                    </td>
                                                                    <td className = "pl-2 pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada"}}>
                                                                        {item.title.length>0?item.title:<i>No Title</i>}
                                                                    </td>
                                                                    
                                                                    <td className=" pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        <div className="shadow forwardip">
                                                                            <b><i>{item.forwardcount}/3 </i> forwarded</b>
                                                                        </div>
                                                                    </td>

                                                                    <td className="pt-2" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        {item.date}
                                                                    </td>
                                                                    <td className="p-3" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        <button style = {{border:"none",background:"none",outline:"none"}} >
                                                                            <img src={track}  style = {{height : "25px",width :"25px", align:"center"}} onClick = {this.forward_modal_call.bind(this,item)}></img>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                                );
                                                        }
                                                    })    
                                                }
                                            {/* Listing Forward In-Progress Ends */}

                                            {/* Listing Grievance Starts */}
                                                {
                                                    this.state.list_grievance.Data.map((item, index) => 
                                                    {
                                                        if(item.status == "Forward")
                                                        {
                                                            return(
                                                                <tr>
                                                                    <td className="pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        {item.chainid}
                                                                    </td>
                                                                    <td className = "pl-2 pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada"}}>
                                                                        {item.title.length>0?item.title:<i>No Title</i>}
                                                                    </td>

                                                                    <td className=" pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        <div className="shadow forward">
                                                                            <b>Forwarded</b>
                                                                        </div>
                                                                    </td>

                                                                    <td className="pt-2" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        {item.date}
                                                                    </td>
                                                                    <td className="p-3" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        <button style = {{border:"none",background:"none",outline:"none"}} >
                                                                            <img src={track}  style = {{height : "25px",width :"25px", align:"center"}} onClick={this.fetch_track_grievance.bind(this,item)}></img>
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
                    {/* Forwared Modal Ends  */}

                    {/* Returned Modal Starts  */}
                    <Modal 
                        isOpen = {this.state.returned_modal}
                        centered = {true}
                        size='lg'>
                            <div>
                                <div class="modal_filter" style={{display:"flex", alignItems: "center", justifyContent:"space-between"}}>
                                    <div class="font_custom">
                                        <h3 className="pt-5 pl-4 pr-4 pb-2"><b>Returned Grievances</b></h3>
                                    </div>
                                    <div>
                                            <IconButton id="close" className="closeItem p-3" onClick={this.returnedModal.bind(this)}>    
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

                                            {/* Listing  Starts */}
                                                {
                                                    this.state.list_grievance.Data.map((item, index) => 
                                                    {
                                                        if(item.status == "Revert")
                                                        {
                                                            return(
                                                                <tr>
                                                                    <td className="pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        {item.chainid}
                                                                    </td>
                                                                    <td className = "pl-2 pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada"}}>
                                                                        {item.title.length>0?item.title:<i>No Title</i>}
                                                                    </td>

                                                                    <td className=" pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        <div className="shadow returned">
                                                                            <b>Returned</b>
                                                                        </div>
                                                                    </td>

                                                                    <td className="pt-2" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        {item.date}
                                                                    </td>
                                                                    <td className="p-3" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        <button style = {{border:"none",background:"none",outline:"none"}} >
                                                                            <img src={track}  style = {{height : "25px",width :"25px", align:"center"}} onClick={this.fetch_track_grievance.bind(this,item)}></img>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                                );
                                                        }
                                                    })    
                                                }
                                            {/*Returned Ends */}                            
                                    </table>
                                        }
                                 </div>
                            </div>
                    </Modal>
                    {/* Debared Modal Ends  */}

                    {/* Resolved Modal Starts  */}
                    <Modal 
                        isOpen = {this.state.resolved_modal}
                        centered = {true}
                        size='lg'>
                            <div>
                                <div class="modal_filter" style={{display:"flex", alignItems: "center", justifyContent:"space-between"}}>
                                    <div class="font_custom">
                                        <h3 className="pt-5 pl-4 pr-4 pb-2"><b>Resolved Grievances</b></h3>
                                    </div>
                                    <div>
                                            <IconButton id="close" className="closeItem p-3" onClick={this.resolvedModal.bind(this)}>    
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
                                                        if(item.status == "Resolved")
                                                        {
                                                            return(
                                                                <tr>
                                                                    <td className="pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        {item.chainid}
                                                                    </td>
                                                                    <td className = "pl-2 pt-2" style = {{fontSize:"14px",borderRight:"1.5px solid #dadada",borderBottom:"1.5px solid #dadada"}}>
                                                                        {item.title.length>0?item.title:<i>No Title</i>}
                                                                    </td>
                                                                    <td className=" pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        <div className="shadow resolved">
                                                                            <b>Resolved</b>
                                                                        </div>
                                                                    </td>
                                                                    <td className="pt-2" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        {item.date}
                                                                    </td>
                                                                    <td className="p-3" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        <button style = {{border:"none",background:"none",outline:"none"}} >
                                                                            <img src={track}  style = {{height : "25px",width :"25px", align:"center"}} onClick={this.fetch_track_grievance.bind(this,item)}></img>
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
                    {/* Resolved Modal Ends  */}

                    {/* All Modal Starts  */}
                    <Modal 
                        isOpen = {this.state.all_modal}
                        centered = {true}
                        size='lg'>
                            <div>
                                <div class="modal_filter" style={{display:"flex", alignItems: "center", justifyContent:"space-between"}}>
                                    <div class="font_custom">
                                        <h3 className="pt-5 pl-4 pr-4 pb-2"><b>All Grievances</b></h3>
                                    </div>
                                    <div>
                                            <IconButton id="close" className="closeItem p-3" onClick={this.allModal.bind(this)}>    
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
                                                                    :item.status == "Debarred"?
                                                                    <td className=" pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        <div className="shadow debared">
                                                                            <b>Debared</b>
                                                                        </div>
                                                                    </td>
                                                                    :item.status == "Resolved"?
                                                                    <td className=" pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        <div className="shadow resolved">
                                                                            <b>Resolved</b>
                                                                        </div>
                                                                    </td>
                                                                    :item.status == "Response"?
                                                                    <td className=" pl-3 pr-3"  style = {{fontSize:"14px",color:"white",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                        <div className="shadow response">
                                                                            <b>Response</b>
                                                                        </div>
                                                                    </td>
                                                                    :null

                                                                }
                                                                
                                                                <td className="pt-2" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",borderRight:"1.5px solid #dadada",textAlign:"center"}}>
                                                                    {item.date}
                                                                </td>
                                                                <td className="p-3" style = {{fontSize:"14px",borderBottom:"1.5px solid #dadada",textAlign:"center"}}>
                                                                    <button style = {{border:"none",background:"none",outline:"none"}} >
                                                                        <img src={track}  style = {{height : "25px",width :"25px", align:"center"}} ></img>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            );
                                                    
                                                    })    
                                                }
                                                {/*Listing Grievance Ends */}                            
                                    </table>
                                        }
                                 </div>
                            </div>
                    </Modal>
                    {/* All Modal Ends  */}

                    {/* Track Modal Starts  */}
                    <Modal isOpen = {this.state.track_modal} centered = {true} style={{marginBottom:"10px"}}>
                        <div class="modal_filter" style={{display:"flex", alignItems: "center", justifyContent:"space-between", width:"100%"}}>
                            <div class="font_custom">
                            <h3 className="p-3"><b>Track Grievances</b></h3>
                            </div>
                            <div>
                                <IconButton id="close" className="closeItem p-3" onClick={this.trackModal.bind(this,this.state.status)}>    
                                    <CloseIcon className="text-right" style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
                                </IconButton>
                            </div>  
                        </div>
                        <div id="timeline">
                            <div id="timelineItem" className="p-3" style={{width:"50%"}}>
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
                                                return(
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
                    {/* Track Modal Ends  */}
                </div>
                // Main Div Ends 
        );
    };
}

export default withStyles(styles) (HoD);