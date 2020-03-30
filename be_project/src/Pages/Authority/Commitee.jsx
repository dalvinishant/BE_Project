import React, {Component} from 'react';
import './search.css';
import { Button } from 'react-bootstrap';
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
import QrReader from 'react-qr-reader';
import qs from 'qs';


//Icon Imports
import ray from './Assets/ray.JPG';
import logo from './Assets/Icon/logo_i2it_2.png';
import pending from './Assets/Icon/pending.png';
import reverted from './Assets/Icon/reverted.png';
import debarred from './Assets/Icon/cancel_1.png';
import forward from './Assets/Icon/Forward.png';
import resolved from './Assets/Icon/resolved.png';
import all from './Assets/Icon/view.png';


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

    render(){
        return(
                <div>
                    
                    {/* Logo Section Starts  */}
                    <div className = "p-5">
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

                    <div className = "p-4" style = {{display:"flex",flexDirection:"row"}}>
                        {/* Profile Section starts */}
                        <div className="leftpane p-4" id ="leftpane">
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
                        <div className = "shadow bg-white middlepane ml-5 p-2" id = "middlepane" style = {{width:"35%",borderRadius:"10px"}}>
                            <p className = "pt-3 pl-3 pr-3 pb-1 font_custom" style= {{fontSize:"22px",fontWeight:"bold"}}>Manage Grievances</p>
                            <hr/>
                            <div className="justify-content-around" style = {{display:"flex",flexDirection:"row"}}>
                                <div className = "p-2 shadow bg-white" style= {{borderRadius:"10px",height:"120px",width:"31%"}}>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {pending} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>Pending </p>
                                    </center>
                                </div>
                                <div className = "p-2 shadow bg-white" style= {{borderRadius:"10px",height:"120px",width:"31%"}}>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {reverted} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>Reverted </p>
                                    </center>
                                </div>
                                <div className = "p-2 shadow bg-white" style= {{borderRadius:"10px",height:"120px",width:"31%"}}>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {forward} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>Forwarded </p>
                                    </center>
                                </div>
                            </div>
                            <div className="justify-content-around mt-4 pb-5 " style = {{display:"flex",flexDirection:"row"}}>
                                <div className = "p-2 shadow bg-white" style= {{borderRadius:"10px",height:"120px",width:"31%"}}>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {debarred} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>Debarred </p>
                                    </center>
                                </div>
                                <div className = "p-2 shadow bg-white" style= {{borderRadius:"10px",height:"120px",width:"31%"}}>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {resolved} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>Resolved</p>
                                    </center>
                                </div>
                                <div className = "p-2 shadow bg-white" style= {{borderRadius:"10px",height:"120px",width:"31%"}}>
                                    <center className="mt-2" style = {{width:"100%"}}>
                                        <img src = {all} style={{height:"28%",width:"28%"}}/>
                                        <p className = "pt-2 pl-2 pr-2 pb-1 font_custom" style= {{fontSize:"17px",fontWeight:"bold"}}>All Grievances</p>
                                    </center>
                                </div>
                               
                            </div>
                        </div>
                        {/* Manage Grievances ends */}

                        {/* Statistics starts */}
                        <div className = "shadow bg-white ml-3 p-2" style = {{width:"35%",borderRadius:"10px"}}>
                            <p className = "pt-3 pl-3 pr-3 pb-1 font_custom" style= {{fontSize:"22px",fontWeight:"bold"}}>Statistics</p>
                            <hr/>
                        </div>
                        {/* Statistics ends */}


                    </div>
                </div>
        );
    };
}

export default withStyles(styles) (Commitee);