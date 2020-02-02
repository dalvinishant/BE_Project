import React, { Component,useEffect } from 'react';
//import {Grid, Image} from 'semantic-react-ui';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { MDBinput } from 'mdbreact';
import {Link,Redirect} from 'react-router-dom';
import {Modal,ModalHeader,ModalFooter,ModalBody} from "reactstrap";
import QR from './QR';
import IconButton from '@material-ui/core/IconButton';
import logo from './Assets/Icon/BRAIT_Transparent_1.png';
import trending from './Assets/Icon/trending.svg';
import letter from './Assets/Icon/letter.svg';
import dollar from './Assets/Icon/subscription.svg';
import clock from './Assets/Icon/clock.svg';
import clock1 from './Assets/Icon/clock_1.svg';
import contract from './Assets/Icon/contract.svg';
import history from './Assets/Icon/history.svg';
import ruppee from './Assets/Icon/ruppee.png';
import voice_search from './Assets/Icon/voice-search.svg';
import ray from './Assets/ray.JPG';
import nocover from './Assets/No_Cover.jpg';
import tfios from './Assets/thefault.jpg';
import background from './Assets/Icon/background.png';
import { TextField } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import checklist from './Assets/Icon/checklist.svg';
//import 'semantic-ui-css/semantic.min.css'


import MicIcon from '@material-ui/icons/Mic';

    class Search_Result extends Component {

        constructor(props)
        {
            super(props)
            this.state={
                searchTerm:'',
               c:0,
               selected_books:[],
               modalShow:false,
               setModalShow:true,
               show_selection:false,
               count:0,
               db_book:{
                   books:[]
               },
                books:{
                    items:[]
                },
                title:'',
                gone:false
            }
            this.handleSubmit = this.handleSubmit.bind(this);
            this.toggleModalShow = this.toggleModalShow.bind(this);
            //this.fetch_db_result = this.fetch_db_result.bind(this);
            this.displayReserved = this.displayReserved.bind(this);
        }
        toggleModalShow = (e) =>
        {
            this.setState({
                modalShow:!this.state.modalShow,
                setModalShow:!this.state.setModalShow,
               
            });
        //   console.log(this.state.book)

        }
        toggleModalResult = (e) =>
        {
            this.setState({
                confirm:!this.state.confirm,
                
               
            });
        //   console.log(this.state.book)

        }
        selection_layout=[];

        componentDidMount(){
            this.fetch_db_result();
            // axios.get('http://127.0.0.1:5000/books').then(res=>{
            //     console.log(res.data);
            //     this.setState({books_py: {items: res.data}})
            //     console.log(this.books_py.items)
            //   })
            //  .catch((error)=>{
            //     console.log(error);
            //  });
        }

        append_books(book){
            this.setState({
                count:this.state.count+1
            });
            if(this.state.count < 3){
            this.state.selected_books.push(book);
            this.selection_layout.push(<div>
                <table className = "w-100">
                            <tr>
                                <td className="p-2" width = "40%" align="center">
                                    <img className="shadow" style={{width:"60px", height:"60px", borderRadius:"70%"}} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}/>
                                </td>
                                <td className="p-2" width="60%">
                                <tr><strong><h6><b>{book.title}</b></h6></strong></tr>
                                    <tr><h7>{book.author}</h7></tr>
                                </td>
                            </tr>
                </table>
                <hr/>
            </div>
            );
            }
            console.log(book)
            this.setState({
                show_selection:true
            })
        }

        searchTerm=this.props.location.state.searchTerm;
        setBooks = (e) =>{
            // console.log(e.items)
            this.setState({books:{items:e.items} });
            //console.log(this.state.books)
        }

        fetch_db_result(e){
                //this.preventDefault();
            console.log("Fetching DB Result for "+String(this.props.location.state.searchTerm));
            var result = axios.get('http://127.0.0.1:5000/book/'+String(this.props.location.state.searchTerm)).then(res=>{
            console.log(res.data);
            // abc = res.data;
            console.log(res.data.Books)
            this.setState({db_book:{books:res.data.Books}});
                //this.state.db_book.push(e);
            }).catch(error=>{
                console.log(error.response)
            }) 
        }

        API_URL = `https://www.googleapis.com/books/v1/volumes`;
        fetchBooks = async () => {
            //this.fetch_db_result();
            //console.log("Fetching DB Result");
            const result = await axios.get(`${this.API_URL}?q=${this.searchTerm}`);   
            this.setBooks(result.data);
          }
        
        onSubmitHandler = (e) => {
            e.preventDefault();
            this.fetchBooks();
          }
          

           bookAuthors = (authors) => {
          
            if (authors.length = 2 && authors.length>0) {
              authors = authors.join(' and ')
            }
            else if (authors.length > 2) {
              let lastAuthor = ' and ' + authors.slice(-1);
              authors.pop();
              authors = authors.join(', ');
              authors += lastAuthor;
            };
            return authors;
          }
          handleSubmit(e){
            // console.log(e)
            this.setState({ gone: true});
            this.setState({title:e});
        } 

        displayReserved() {
            this.setState({
              displayReserved:false
            })
        }
    render(){
        const c = this.state;
        const books=this.state;
        const {title}=this.state;
        const {gone} = this.state;
        
        this.fetchBooks();
        const modalShow = this.state;
        const setModalShow = this.state;
        if(gone){

            
            console.log(title);
             return(
             <Redirect to={{
                 pathname: "./QR",
                 state:{selected_books:this.state.selected_books}
             }}/>)
            
             
         }
    return(
        <div id="div_container">
            <head>
            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
            </head>
            <form > 
                        <table className = " headerDiv w-100 font_custom">
                            <tr>
                            <td ><img align = "right" style={{width:"100px",verticalAlign:"center",}}src={logo}/></td>
                        <td width = "17%">
                            <h5 style={{verticalAlign:"bottom", textAlign:"left",paddingLeft:"3px"}} id='title'>Dr. B. R. Ambedkar<br/>Institute of Technology</h5>
                            <div style = {{borderTop:"1.5px solid #ff0000", width:'50%', marginLeft : '5px'}}>
                            <h4 id = "title" style = {{ marginTop:"1px"}}>Library</h4>
                            </div>
                        </td>
                            <div id='search_bar' className="mb-4 w-75 shadow-lg w-responsive mx-0 mt-4 rounded-pill" style = {{ backgroundColor:"#ffffff"}}>
                                
                                <td width="92%">
    <input id="input_search" type="text" placeholder="Search"  defaultvalue = {this.state.searchTerm} contentEditable="true"  aria-label="Search" style={{fontSize: '20px',border:"0px",paddingLeft:"30px",height: '70px',backgroundColor:"transparent", outlineColor:"transparent", width: "100%"}}></input></td> 
                                <td style={{alignSelf:"right",verticalAlign:"middle",paddingRight:"10px"}}>
                                    <IconButton id="mic">    
                                        <MicIcon  className="text-right" style = {{height : "30px",width :"30px",color : "#2b2b2b"}}/>
                                    </IconButton>  
                                </td>  
                          </div>
                          </tr>
                          <tr >
                              <td colSpan = "3">
                                <hr/>
                              </td>
                          </tr>
                          </table>
                </form>

                <div className="mobileReserved">
                    <div className="mobileReservedContent mt-4">
                        <div className="detailsDiv">
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
                        </div>
                        <div className="searchBarDiv">
                            <form onSubmit = {this.handleSubmit} > 
                                <table className = "w-100">
                                    <tr>
                                        <div id='search_bar' className="mb-4 w-100 shadow-lg w-responsive mx-auto mt-4 rounded-pill" style = {{ backgroundColor:"#ffffff"}}>
                                            <td width="92%">
                                                <input name="input_search" id="input_search" type="text" placeholder="Search" onChange = {this.handleChange} contentEditable='true' aria-label="Search" style={{fontSize: '20px',border:"0px",paddingLeft:"30px",height: '70px',backgroundColor:"transparent", outlineColor:"transparent", width: "100%"}} />
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
                        </div>

                        <div className="mobileDisplayReserved shadow bg-white p-3">
                            <div className="mobileDisplayResDiv" onClick={this.displayReserved}>
                                <div className = "font_custom">
                                        Selected Books
                                </div>
                                <div>
                                    <i class="fas fa-chevron-down"></i>
                                </div>
                            </div>
                            <div className="mobileDisplayOnClick displayReserved fadeIn" hidden={this.state.displayReserved}>
                                <hr/>
                                {this.state.show_selection ?
                                    <div>
                                        {this.selection_layout}
                                    </div>
                                    : 
                                    <div className="font_custom" style={{fontSize:"16px"}}>
                                            No Books are selected !
                                    </div>
                                }
                                <center>
                                    <Button id = "chat_button" onClick={this.toggleModalShow.bind(this)} className="font_custom" hidden = {!this.state.show_selection} style= {{textTransform:"none"}}>
                                        Confirm Reserve
                                    </Button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fetch Local DB_Result starts*/}
                <section>
                <div id="resultDisplay" className="p-3" style={{width:"75%", display:"inline-block"}}>
                    <div className="shadow bg-white p-3" style={{height:"90%", width:"100%", borderRadius:"20px",background:"#f2f2f2"}}>
                    <h4 style = {{paddingLeft:"20px"}}>Showing search results for " {this.props.location.state.searchTerm} "</h4>
                        <hr/>
                        
                        <div style = {{padding:"20px"}}>
                            <div id="searchDiv" >
                                <ul className="searchList">
                                    {
                                        this.state.db_book.books.map(
                                            (book, index) => {
                                                return (
                                                    <li className="searchList-item" key={index}>
                                                        <div className="searchList-content">
                                                            <table>
                                                                <tr>
                                                                    <td width="90px">
                                                                        <img  className="shadow " style={{height:"100px", borderRadius:"10%"}} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}/>
                                                                    </td>
                                                                    <td className="col-6" >
                                                                        <tr>
                                                                            <h4 className="pl-5">{book.Title}</h4>
                                                                        </tr>
                                                                        <tr>
                                                                            <h6 className="pl-5">{book.Authors}</h6>
                                                                        </tr>
                                                                        <tr>
                                                                            <h6 className="pl-5">21/02/2019</h6>
                                                                        </tr>
                                                                    </td>
                                                                    <td className="col">
                                                                        <tr>
                                                                            {console.log(book)}
                                                                        <Button id = "chat_button" onClick={()=>this.append_books(book)} style= {{textTransform:"none"}}>
                                                                                Reserve
                                                                        </Button>
                                                                        </tr>
                                                                        <tr>
                                                                            In stock : 6
                                                                        </tr>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            {/* <div className="searchResultDetails">
                                                                <div className="imageResult">
                                                                    <img  className="shadow " style={{height:"100px", borderRadius:"10%"}} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}/>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    </li> 
                                                );
                                            }
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Fetch Local DB_Result  ends*/}
                <div className="rightpane p-3 w-25">
                <center style={{height:"90%", borderRadius:"20px",background:"#f2f2f2"}} className="shadow bg-white">
                    <div id="leftpane" className="p-3" style={{height:"90%"}}>
                        <table>
                            <tr>
                                <td>
                                    <img className="shadow" style={{width:"80px", height:"80px", borderRadius:"50%"}}src={ray}/>
                                </td>
                                <td>
                                    <h3 className="font_custom" style = {{marginTop:"10px", verticalAlign:"middle", paddingLeft:"10px"}}>Rakshitha Shettigar</h3>
                                </td>
                            </tr>
                        </table>
                        <center>
                            <table className = "font_custom" id="studentDetails" style = {{marginTop: "20px", borderRadius:"10px",background:"#f2f2f2"}}>
                                <tr style = {{padding:"20px"}}>
                                    <td ><div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>College ID</div></td>
                                    <td><div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>C-16-10</div></td>
                                </tr>
                                <tr style = {{padding:"10px"}}>
                                    <td><div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>College</div></td>
                                    <td><div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>I<sup>2</sup>IT, Pune</div></td>
                                </tr>
                                <tr style = {{padding:"10px"}}>
                                    <td><div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>Mobile</div></td>
                                    <td><div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>+91-9890358113</div></td>
                                </tr>
                            </table>
                        </center>
                    <div id="recommendations" >
                        <hr/>
                        <div className = "font_custom" style={{textAlign:"left",fontSize:"20px",fontWeight:"600"}}>
                                Selected Books
                        </div>
                        <hr />
                            {this.state.show_selection ?
                                <div>
                                    {this.selection_layout}
                                </div>
                                : 
                                <div className="font_custom" style={{fontSize:"16px"}}>
                                        No Books are selected !
                                </div>
                            }
                       
                    </div>
                    <Button id = "chat_button" onClick={this.toggleModalShow.bind(this)} className="font_custom" hidden = {!this.state.show_selection} style= {{textTransform:"none"}}>
                            Confirm Reserve
                    </Button>
                    </div>
                </center>
                </div>

                </section>
                <section>
                <div id="resultDisplay" className="p-3" style={{width:"75%", display:"inline-block"}}>
                    <div className="shadow bg-white p-3" style={{height:"90%", width:"100%", borderRadius:"20px",background:"#f2f2f2"}}>
                    <h4 style = {{paddingLeft:"20px"}}>Showing search results for " {this.props.location.state.searchTerm} "</h4>
                        <hr/>
                        {/* Displaying Global Result */}
                        <div style = {{padding:"20px"}}>
                            <div id="searchDiv" >
                                <ul className="searchList">
                                    {
                                        this.state.books.items.map(
                                            (book, index) => {
                                                return (
                                                    <li className="searchList-item" key={index}>
                                                        <div className="searchList-content">
                                                            <table>
                                                                <tr>
                                                                    <td width="90px">
                                                                        <img  className="shadow " style={{height:"100px", borderRadius:"10%"}} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}/>
                                                                    </td>
                                                                    <td className="col-6" >
                                                                        <tr>
                                                                            <h4 className="pl-5">{book.volumeInfo.title}</h4>
                                                                        </tr>
                                                                        <tr>
                                                                            <h6 className="pl-5">{book.volumeInfo.authors}</h6>
                                                                        </tr>
                                                                        <tr>
                                                                            <h6 className="pl-5">{book.volumeInfo.publishedDate}</h6>
                                                                        </tr>
                                                                    </td>
                                                                    <td className="col">
                                                                        <tr>
                                                                        <Button id = "chat_button"  style= {{textTransform:"none"}}>
                                                                                Request
                                                                        </Button>
                                                                        </tr>
                                                                        <tr>
                                                                            
                                                                        </tr>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            {/* <div className="searchResultDetails">
                                                                <div className="imageResult">
                                                                    <img  className="shadow " style={{height:"100px", borderRadius:"10%"}} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}/>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    </li> 
                                                );
                                            }
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                                </section>
                {/* <MyVerticallyCenteredModal
        // books={this.state.books}
        // searchTerm={this.state.searchTerm}
        show={this.state.modalShow}
        onHide={this.toggleModalShow.bind(this)}
        // book={this.state.book}
        // display_form={this.display_form}
      /> */}
       <Modal
        isOpen = {this.state.modalShow}
        className = "font_custom h-50"
        centered = "true"
        size="lg" 
        
      >
          <QR selected_books={this.state.selected_books} />
          <center>  <Button  className="h-100" id = "chat_button" onClick={this.toggleModalShow.bind(this)}>Close</Button></center>
          </Modal>

        </div>
    )
}
}
export default Search_Result;