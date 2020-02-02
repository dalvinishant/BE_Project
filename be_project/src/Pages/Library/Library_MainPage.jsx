import React, {Component} from 'react';
import './libraryStyle.css';
import logo from './Assets/Icon/BRAIT_Transparent_1.png';
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
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import MicIcon from '@material-ui/icons/Mic';
import IconButton from '@material-ui/core/IconButton';
import ray from './Assets/ray.JPG';
import tfios from './Assets/thefault.jpg';
import qrIcon from './Assets/Icon/qrIcon.png';
import addBookIcon from './Assets/Icon/addBook.png';
import inventory from './Assets/Icon/inventory.svg';
import transactionIcon from'./Assets/Icon/transactionsIcon.svg';
import reserveIcon from './Assets/Icon/reserveBook.png';
import suggestionIcon from './Assets/Icon/mailbox.svg';
import transactionIconSVG from './transactionSVG';

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
class Library_MainPage extends Component {
//Render function starts
constructor(props)
{
    super(props)
    this.state={
        confirm:false,
        del_confirm:false,
        clicked_add:false,
        clicked_del:false,
        clickedViewAll:false,
        show_search:true,
        display_add:false,
        display_transaction:false,
        books:{
           items:[]
        },
        books1:[],
        display_suggestion:false,
        display_qrScan:false,
        result_copy:{},
        modalShow:false,
        qr_modal:false,
        setModalShow:true,
        display_addForm:false,
        display_delete:false,
        ret:true,
        searchTerm:'',
        db_book:{
               books:[]
         },
        show_form:true,
        selected_book:{
         id:'',
         title:'',
         author:'',
         genre:[],
         page_count:'',
         description:'',
         publication:'',
         publication_year:0,
         edition:'',
         shelf_no:'',
         stock:0,
      },
      delete_book:{
         id:'',
         title:'',
         author:'',
         genre:[],
         page_count:'',
         description:'',
         publication:'',
         publication_year:0,
         edition:'',
         shelf_no:'',
         stock:'',
      },

    }
    this.toggleClicked_issued=this.toggleClicked_issued.bind(this);
    this.toggleClicked_returned=this.toggleClicked_returned.bind(this);
    this.display_add=this.display_add.bind(this);
    this.display_delete=this.display_delete.bind(this);
    this.display_transaction=this.display_transaction.bind(this);
    this.display_qrScan=this.display_qrScan.bind(this);
    this.display_reserveList=this.display_reserveList.bind(this);
    this.display_suggestion=this.display_suggestion.bind(this);
    this.display_addForm=this.display_addForm.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.display_form=this.display_form.bind(this);
    this.toggleModalShow = this.toggleModalShow.bind(this);
    this.toggleModelDel=this.toggleModelDel.bind(this);
    this.toggleClicked_add = this.toggleClicked_add.bind(this);
    this.toggleClicked_viewAll = this.toggleClicked_viewAll.bind(this);
    this.toggleClicked_del = this.toggleClicked_del.bind(this);
    this.retrieve = this.retrieve.bind(this);
    this.append_book = this.append_book.bind(this);
    this.delete_data=this.delete_data.bind(this);
    this.set_display_del = this.set_display_del.bind(this);
    this.toggleModalQR = this.toggleModalQR.bind(this);
}
book=[];
send_book=[];

get_json(str){
   const data = str;
   this.setState({
      result_copy:JSON.parse(data)
   });

   // console.log("str : ",typeof(str))
   //return JSON.parse(str);
}

delete_data=(e)=>{
 
   var result = axios.delete('http://127.0.0.1:5000/book/'+this.state.delete_book.id).then(res=>{
   console.log(res.data);
   this.toggleModelDel();
   this.set_display_del();


   //this.state.ddisplay_m = true;
   // abc = res.data;
   // console.log(res.data.Books)
   // this.setState({db_book:{books:res.data.Books}});
       //this.state.db_book.push(e);


   }).catch(error=>{
       console.log(error.response)
   }) 

}

route(e)
{

}

set_display_del(e){
   this.setState({
      display_delete:false,
   })
   console.log("Display Delete :",this.state.display_delete)
   document.getElementById('input_search').defaultValue = " ";
}

toggleModelDel(e){
      this.setState({
         del_confirm:!this.state.del_confirm
      })
}

toggleModalQR(e){
   this.setState({
      qr_modal:!this.state.qr_modal
   })
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
append_book=(data)=>{

   this.book.push(data);
   console.log(data)
   console.log('Book : ',this.book[0])
   this.state.delete_book.id = this.book[0].id;
   this.state.delete_book.title =this.book[0].title; 
   this.state.delete_book.author=(this.book[0].author); 
   this.state.delete_book.genre =this.book[0].genre; 
   this.state.delete_book.shelf_no =this.book[0].shelf_no;
   this.state.delete_book.shelf_no =this.book[0].shelf_no; 
   this.state.delete_book.description = 'NA'; 
   this.state.delete_book.publication ='NA'; 
   this.state.delete_book.publication_year ='NA'; 
   this.state.delete_book.page_count ='NA'; 
   this.state.delete_book.edition = 'NA';
   this.book.pop();
   console.log('Printing Selected_book ',this.state.delete_book);


   if(this.state.clicked_add==true)
   {
      console.log("clicked : ",this.state.clicked_add)
      this.setState({
         show_form:false,
         ret:true
      })
      document.getElementById('book_title').value = this.state.delete_book.title||'';
      document.getElementById('author').value = this.state.delete_book.author || '';
      document.getElementById('genre').value = this.state.delete_book.genre || '';
      document.getElementById('page_count').value = this.state.delete_book.page_count || '';
      document.getElementById('description').value = this.state.delete_book.description || '';
      document.getElementById('publication').value = this.state.delete_book.publication || '';
      document.getElementById('publication_year').value = this.state.delete_book.publication_year || '';
      document.getElementById('edition').value=this.state.delete_book.edition;
      document.getElementById('shelf_no').value=this.state.delete_book.shelf_no;
      document.getElementById('no_copies').value=this.state.delete_book.stock;
   }
   else
   {
      this.display_delete();
      this.setState({
         ret:true,
      })
   document.getElementById('book_title_del').value = this.state.delete_book.title||'';
   document.getElementById('author_del').value = this.state.delete_book.author || '';
   document.getElementById('genre_del').value = this.state.delete_book.genre || '';
   document.getElementById('page_count_del').value = this.state.delete_book.page_count || '';
   document.getElementById('description_del').value = this.state.delete_book.description || '';
   document.getElementById('publication_del').value = this.state.delete_book.publication || '';
   document.getElementById('publication_year_del').value = this.state.delete_book.publication_year || '';
   document.getElementById('edition_del').value=this.state.delete_book.edition;
   document.getElementById('shelf_no_del').value=this.state.delete_book.shelf_no;
   document.getElementById('shelf_no_del').value=this.state.delete_book.stock;
   }

}
get_all(e){
   //this.preventDefault();
var result = axios.get('http://127.0.0.1:5000/borrowedlist/1').then(res=>{
console.log(res.data);
res.data.map((book,index) => {
   console.log(book);
}
)
// this.setState({db_book:{books:res.data.Books}});
   //this.state.db_book.push(e);
}).catch(error=>{
   console.log(error.response)
}) 
}
get_returned(e){
   //this.preventDefault();
var result = axios.get('http://127.0.0.1:5000/borrowedlist/3').then(res=>{
console.log(res.data);
// abc = res.data;

// this.setState({db_book:{books:res.data.Books}});
   //this.state.db_book.push(e);
}).catch(error=>{
   console.log(error.response)
}) 
}
get_issued(e){
   //this.preventDefault();

var result = axios.get('http://127.0.0.1:5000/borrowedlist/2').then(res=>{
console.log(res.data);
// // abc = res.data;
// console.log(res.data.Books)
// this.setState({db_book:{books:res.data.Books}});
   //this.state.db_book.push(e);
}).catch(error=>{
   console.log(error.response)
}) 
}
toggleClicked_viewAll() {
   this.setState({
      clickedViewAll:!this.state.clickedViewAll,
   })
   if(this.state.clickedViewAll==true) {
      this.setState({
         show_search:true
      });
   }
   else{
      this.setState({
         show_search:false,
         // ret:true
      })
   }
   this.get_all();
}
toggleClicked_issued() {
   this.setState({
      clickedViewAll:!this.state.clickedViewAll,
   })
   if(this.state.clickedViewAll==true) {
      this.setState({
         show_search:true
      });
   }
   else{
      this.setState({
         show_search:false,
         // ret:true
      })
   }
   this.get_issued();
}
toggleClicked_returned() {
   this.setState({
      clickedViewAll:!this.state.clickedViewAll,
   })
   if(this.state.clickedViewAll==true) {
      this.setState({
         show_search:true
      });
   }
   else{
      this.setState({
         show_search:false,
         // ret:true
      })
   }
   this.get_returned();
}

toggleClicked_add()
{
   console.log("Clicked_add : ", this.state.clicked_add);
   this.setState({
      clicked_del: false,
      clicked_add : !this.state.clicked_add

   })
   this.setState({
      display_delete : false
   })
   console.log("Clicked_add : ", this.state.clicked_add,this.state.show_search);
   if (this.state.clicked_add == true){
      this.setState({
         show_search:true,
      });
      this.setState({
         display_delete : false
      })
   }
   else{
      this.setState({
         show_search:false,
         ret:true
      });
   }
   console.log("Clicked_add : ", this.state.clicked_add,this.state.show_search);
}

toggleClicked_del()
{
   this.setState({
      clicked_add: false,
      clicked_del : !this.state.clicked_del,
      show_search: !this.state.show_search,
      display_delete: false
     
   })
   this.setState({
      show_form : true
   })
   if (this.state.clicked_del == true){
      this.setState({
         show_search:true,
         ret:true
      });
   }
   else{
      this.setState({
         show_search:false
      });
   }
}
post_qr=(e)=>{
   const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: this.state.result,
      url:'http://localhost:5000/borrowed/C-16-45'
    }

   
   //  console.log(this.send_book[0])
    var result = axios(options).then(res=>{
         console.log('Posted');
         console.log(res.data);
         
    }).catch(error=>{
      console.log('Not Posted');
      console.log(error.response)
    })
    this.toggleModalQR();

}
toggleModalShow = (e) =>
{
    this.setState({
    modalShow:!this.state.modalShow,
    setModalShow:!this.state.setModalShow,
    books:this.state.books
    });
//   console.log(this.state.book)
}
toggleModal_result = (e) =>
{
    this.setState({
    confirm:!this.state.confirm,
    
    });
//   console.log(this.state.book)
}

//Post Data to API
send_data()
{
   const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: this.state.selected_book,
      url:'http://localhost:5000/book/xyz'
    }

    console.log("Posting DB Result for "+String(this.state.selected_book.title));
   //  console.log(this.send_book[0])
    var result = axios(options).then(res=>{
         console.log('Posted');
         console.log(res.data);
    }).catch(error=>{
      console.log('Not Posted');
      console.log(error.response)
    })
    this.setState(
       {
          confirm:true
       }
    )
    this.send_book.pop();
}

fetch_db_result(e){
   //this.preventDefault();
console.log("Fetching DB Result for "+String(this.state.searchTerm));
var result = axios.get('http://127.0.0.1:5000/book/'+String(this.state.searchTerm)).then(res=>{
// console.log(res.data);
// abc = res.data;
// console.log(res.data.Books)
this.setState({db_book:{books:res.data.Books}});
// console.log(this.state.db_book)
   //this.state.db_book.push(e);
}).catch(error=>{
   console.log(error.response)
}) 
}

display_form=(data1,e)=>
{
    //console.log(data)
    this.setState({
    modalShow:!this.state.modalShow,
    setModalShow:!this.state.setModalShow,
    })
    this.book.push(data1);
   //  const options = {
   //    method: 'POST',
   //    headers: { 'content-type': 'application/json' },
   //    data: data1,
   //    url:'http://localhost:5000/demo'
   //  }

   //  console.log("Posting DB Result for "+String(data1.volumeInfo.title));
   //  console.log(data1)
   //  var result = axios(options).then(res=>{
   //       console.log('Posted');         console.log(res.data);
   //  }).catch(error=>{
   //    console.log('Not Posted');
   //    console.log(error.response)
   //  })
   console.log(data1);
   console.log(this.book[0]);
   this.state.selected_book.id = this.book[0].id;
   this.state.selected_book.title =this.book[0].volumeInfo.title; 
   this.state.selected_book.author=this.book[0].volumeInfo.authors; 
   this.state.selected_book.genre =this.book[0].volumeInfo.categories; 
   this.state.selected_book.description =this.book[0].volumeInfo.description; 
   this.state.selected_book.publication =this.book[0].volumeInfo.publisher; 
   this.state.selected_book.publication_year =this.book[0].volumeInfo.publishedDate; 
   this.state.selected_book.page_count =this.book[0].volumeInfo.pageCount; 
   this.state.selected_book.edition = 'NA';
   this.state.selected_book.shelf_no = 'NA';
   this.state.selected_book.stock = 5;
   this.state.show_form=false;
   
   document.getElementById('book_title').value = this.state.selected_book.title||'';
   document.getElementById('author').value = this.state.selected_book.author || '';
   document.getElementById('genre').value = this.state.selected_book.genre || '';
   document.getElementById('page_count').value = this.state.selected_book.page_count || '';
   document.getElementById('description').value = this.state.selected_book.description || '';
   document.getElementById('publication').value = this.state.selected_book.publication || '';
   document.getElementById('publication_year').value = this.state.selected_book.publication_year || '';
   document.getElementById('edition').value=this.state.selected_book.edition;
   document.getElementById('shelf_no').value=this.state.selected_book.shelf_no;
   document.getElementById('no_copies').value=this.state.selected_book.stock;
    

    console.log('asdf')
    console.log(this.state.selected_book);
    this.send_book.push(data1)
    this.book.pop();
   

    // console.log(e.target.value,data);
}

handleChange(e){
    this.setState({
       searchTerm: e.target.value,
       ret:true
      });
   
    //this.fetch_db_result()
    
// console.log(this.state.searchTerm)
}

retrieve(e){
   this.setState({
      ret:false
     });
  
   this.fetch_db_result()
   
// console.log(this.state.searchTerm)
}

display_add()
{
    this.setState({
    display_add:true
    })
}
display_delete()
{
   this.setState({
      display_delete:true
   })
   
}
display_qrScan()
{
    this.setState({
    display_qrScan:true
    
    })
}

display_reserveList() {
   this.setState({
      display_reserveList:true
   })
}

display_transaction()
{
    this.setState({
    display_transaction:true
    })
}

display_suggestion() {
   this.setState({
      display_suggestion:true
   })
}

display_addForm()
{
    this.setState({
    display_addForm:true
    })
}
setBooks = (e) =>{
    // console.log(e.items)
    this.setState({books:{items:e.items} });
    console.log(this.state.books)
}
API_URL = `https://www.googleapis.com/books/v1/volumes`;
fetchBooks = async () => {
const result = await axios.get(`${this.API_URL}?q=${this.state.searchTerm}&maxResults=10`);   
console.log(result.data)
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
state = {
    result: 'No result'
}
handleScan = data => {
    if (data) {
    this.setState({
    result: data
    })
    }
}
handleError = err => {
console.error(err)
}

render() {
const { classes } = this.props;
const modalShow = this.state;
const setModalShow = this.state;
const {searchTerm}=this.state;
const books=this.state;
const book=this.state;
// const title = this.state;
this.fetchBooks();
// console.log(books)
return (
// Main division starts
<div className="rootDivision ">
   <div className="mainDivision pl-5 pr-5">
      {/* Logo and Information Division starts */}
      <div className="infoContainer w-25 p-3">
         <div className="logo pb-4">
            <img style={{width:"120px",verticalAlign:"center"}}src={logo}/>
            <div>
               <h6 style={{verticalAlign:"center", textAlign:"left",marginLeft:"16px",fontSize:"20px", marginTop:"10px",width:"200px"}} id='title'>Dr. B. R. Ambedkar<br/>Institute of Technology</h6>
               <div style = {{borderTop:"2px solid #ff0000", width:'70%', marginLeft : '20px'}}>
               <h4 id = "title" style = {{ marginTop:"1px"}}> Library</h4>
            </div>
         </div>
      </div>
      {/* 
      <div className="profile shadow bg-white">
         <div className="profile-data">
            <div className="img-title p-3" >
               <div>
                  <img className="shadow" style={{width:"80px", height:"80px", borderRadius:"50%"}}src={ray}/>
               </div>
               <div>
                  <h3 className="font_custom pt-4 pl-2   " style={{fontSize:"20px"}} >Rakshitha Shettigar</h3>
               </div>
            </div>
            <div>B</div>
            <div>C</div>
         </div>
      </div>
      */}
      <div className="profile pt-5" >
         <div  className="profile-data p-3 shadow bg-white" id ="profile-data">
            <table>
               <tr>
                  <td>
                     <img className="shadow" style={{width:"80px", height:"80px", borderRadius:"50%"}}src={ray}/>
                  </td>
                  <td>
                     <h3 className="font_custom" style = {{marginTop:"10px",fontSize:"20px", verticalAlign:"middle", paddingLeft:"10px"}}>Ninad Kheratkar</h3>
                  </td>
               </tr>
            </table>
            <center>
               <table className = "font_custom" id="studentDetails" style = {{marginTop: "20px", borderRadius:"10px",background:"#f2f2f2"}}>
               <tr style = {{padding:"20px"}}>
                  <td ><div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>Library ID
         </div>
         </td>
         <td><div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>L-16-10
      </div>
      </td>
      </tr>
      <tr style = {{padding:"10px"}}>
      <td><div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>College
   </div>
   </td>
   <td><div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>I<sup>2</sup>IT, Pune
</div>
</td>
</tr>
<tr style = {{padding:"10px"}}>
<td><div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>Mobile</div></td>
<td><div className = "font_custom" style = {{fontSize:"16px", fontWeight:"500"}}>+91-9890358113</div></td>
</tr>
</table>
</center>
</div>
</div> 
{/* Logo and Information Division ends */}
</div>
{/* Selected View starts */}
<div className="selectedView w-75 mt-4 pt-5">
   <div className="libraryActions pt-5 pb-4">
      {/* Ketan works here */}
      <div className="actionBox p-4 shadow bg-white" style = {{borderRadius:"10px"}}>
         <Badge classes={{ badge: classes.customBadge }} badgeContent=" ">
         <b>
            <IconButton onClick={this.display_add} id = "action_button" disableTouchRipple={true} style = {{outline:"none"}} > <img src={inventory}  
               ></img></IconButton>
         </b>
         </Badge>
         <div className= "font_custom" style = {{textAlign:"center",fontSize:"18px",fontWeight:"600"}}>
            Inventory
         </div>
      </div>
      <div className="actionBox p-4 shadow bg-white" style = {{borderRadius:"10px"}}>
         <Badge classes={{ badge: classes.customBadge }} badgeContent=" ">  
            <IconButton id="action_button" onClick={this.display_transaction} disableTouchRipple={true} style = {{outline:"none"}}> <img src={transactionIcon}/>
            </IconButton>
         </Badge>
         <div className= "font_custom" style = {{textAlign:"center",fontSize:"18px",fontWeight:"600"}}>
            Transaction
         </div>
      </div>
      <div className="actionBox p-4 shadow bg-white" style = {{borderRadius:"10px"}}>
         <IconButton  onClick={this.display_qrScan} id = "action_button" style = {{outline:"none"}} disableTouchRipple={true} ><img src={qrIcon}/></IconButton>
         <div className= "font_custom" style = {{textAlign:"center",fontSize:"18px",fontWeight:"600"}}>
            Scan QR
         </div>
      </div>
      <div className="actionBox p-4 shadow bg-white" style = {{borderRadius:"10px"}}>
      <Badge classes={{ badge: classes.customBadge }} badgeContent=" ">
         <IconButton onClick={this.display_reserveList} id = "action_button" style = {{outline:"none"}}  disableTouchRipple={true} >  <img src={reserveIcon}/></IconButton>
      </Badge>
         <div className= "font_custom" style = {{textAlign:"center",fontSize:"18px",fontWeight:"600"}}>
            Reserve List
         </div>
      </div>
      <div className="actionBox p-4 shadow bg-white" style = {{borderRadius:"10px"}}>
      <Badge classes={{ badge: classes.customBadge }} badgeContent=" ">
         <IconButton onClick={this.display_suggestion} id = "action_button" style = {{outline:"none"}} disableTouchRipple={true} >  <img style={{width:"75px",height:"80px"}} src={suggestionIcon}/></IconButton>
         </Badge>
         <div className= "font_custom" style = {{textAlign:"center",fontSize:"18px",fontWeight:"600"}}>
            Suggestions
         </div>
      </div>
   </div>
   

   
   {/* Add Book div starts */}
   <div className="actionView p-3 mt-5 mb-3 shadow bg-white animated fadeIn" style= {{borderRadius:"10px"}} hidden={!this.state.display_add}>
      <div className = "w-100 font_custom" style = {{fontSize: "30px"}}>
      <div className = "column p-2">
         <div className="addBookDiv">
            <b>Inventory</b>
         </div>
         <div>
            <IconButton id="close" className="closeItem" onClick={()=>this.setState({display_add:!this.state.display_add})}>    
               <CloseIcon className="text-right" style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
            </IconButton>
         </div>
      </div>
      <hr/>
      <div className="inventoryActionButtons">
         <div className={this.state.clicked_add ? "inventoryBox_selected p-4 shadow bg-white" : "inventoryBox p-4 shadow bg-white"} onClick = {this.toggleClicked_add.bind(this)}>
            <div><h5><b>Add/Update</b></h5></div>
            <div><h6>Add or update the book details</h6></div>
         </div>
         <div className= {this.state.clicked_del ? "inventoryBox_selected p-4 shadow bg-white" : "inventoryBox p-4 shadow bg-white"} onClick = {this.toggleClicked_del.bind(this)}>
            <div><h5><b>Delete</b></h5></div>
            <div><h6>Delete the book from database</h6></div>
         </div>
      </div>
      <hr/>
      <div id='search_bar' className="mb-4 w-75 shadow-lg w-responsive mx-auto mt-4 rounded-pill  animated fadeInDown" hidden = {this.state.show_search} style = {{ backgroundColor:"#ffffff"}}>
      <td width="92%">
         <input name="input_search" id="input_search" type="text" placeholder="Search" onChange={this.handleChange} contentEditable={true} aria-label="Search" style={{fontSize: '20px',border:"0px",paddingLeft:"30px",height: '70px',backgroundColor:"transparent", outlineColor:"transparent", width: "100%"}} />
      </td>
      <td style={{alignSelf:"right",verticalAlign:"middle",paddingRight:"10px"}}>
         <IconButton id="mic" type="submit" onClick={this.retrieve}>    
            <DoubleArrowIcon   className="text-right" style = {{height : "30px",width :"30px",color : "#2b2b2b"}}/>
         </IconButton>
      </td>
   </div>

      {/* Retrieve Books starts -   Common for Add/Update and Delete Section */}
   <div id="resultDisplay" className="p-3" style={{width:"100%", display:"inline-block"}} hidden = {this.state.ret}>
                    <div className="shadow bg-white p-3" style={{height:"90%", width:"100%", borderRadius:"20px",background:"#f2f2f2"}}>
                    <h4 style = {{paddingLeft:"20px"}}>Showing search results for " {this.state.searchTerm} "</h4>
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
                                                                        <Button id = "chat_button" onClick={() => {this.append_book(book)}}  style= {{textTransform:"none"}}>
                                                                                Select
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
   {/* Retrieve Book end */}

   <center>
   <Button id = "chat_button" hidden = {this.state.ret} onClick={this.toggleModalShow.bind(this)}  style= {{textTransform:"none"}}>
         Add Book <i className = "fa fa-plus" style = {{fontsize:'10px'}}></i>
   </Button>
   </center>


   {/* Add Form */}
   <div className = 'add_book' hidden = {this.state.show_form} >
   <hr/>
      <div width = "30%" className = "p-3 pr-5" style = {{borderRight: "1.5px solid #2b2b2b"}} >
      <img className="shadow" style={{width:"150px", height:"200px", borderRadius:"5%"}} src={`http://books.google.com/books/content?id=${this.state.selected_book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}/>
   </div>
   <div className="w-75 p-3 font_custom" style = {{background:"white",borderRadius:"10px"}}>
      <h2 className = "font_custom"> 
         <b>Book Details</b>
      </h2>
      <hr/>
      <TextField id="book_title" defaultValue=" " name="add_book"  className="w-50" label="Title" variant="outlined"  style={{marginTop:"15px",paddingRight:"20px", height:"40px !important"}}  InputProps={{
      classes: {
      border:classes.border,
      notchedOutline: classes.notchedOutline
      }
      }}/>                         
      <TextField id="author" defaultValue=" " className="w-50" label="Author" variant="outlined" style ={{marginTop:"15px",MarginLeft:"10px"}}InputProps={{
      classes: {
      notchedOutline: classes.notchedOutline
      }
      }}/>
      <TextField  id="genre" defaultValue=" " className="w-50" label="Genre/Category" variant="outlined" style ={{marginTop:"15px",paddingRight:"20px"}}InputProps={{
      classes: {
      notchedOutline: classes.notchedOutline
      }
      }}/>
      <TextField  id="page_count" defaultValue=" " className="w-50" label="Page Count" variant="outlined" 
      style={{marginTop:"15px",paddingRight:"20px", height:"40px !important"}} placeholder = "Title" InputProps={{
      classes: {
      border:classes.border,
      notchedOutline: classes.notchedOutline
      }
      }}/>
      <TextField  id="description" defaultValue=" " className="w-75" label="Description"  multiline rowsMax = "10" variant="outlined" 
      style= {{marginTop:"15px"}}InputProps={{
      classes: {
      notchedOutline: classes.notchedOutline
      }
      }}/>
   </div>
   <div className= "w-100 p-4">
      <hr style = {{marginTop:"30px"}}/>
      <h2 className = "font_custom">
         <b>Publication Details</b>
      </h2>
      <hr/>
      <TextField  id="publication" defaultValue="a" className="w-50" label="Publication" variant="outlined" 
      style={{marginTop:"15px",paddingRight:"20px", height:"40px !important"}} placeholder = "Publication" InputProps={{
      classes: {
      border:classes.border,
      notchedOutline: classes.notchedOutline
      }
      }}/>
      <TextField  id="publication_year" defaultValue="a" className="w-50" label="Publication Year" variant="outlined" 
      style={{marginTop:"15px",paddingRight:"20px", height:"40px !important"}} placeholder = "Publication Year" InputProps={{
      classes: {
      border:classes.border,
      notchedOutline: classes.notchedOutline
      }
      }}/>
      <TextField  id="edition" defaultValue=" " className="w-50" label="Edition" variant="outlined" 
      style={{marginTop:"15px",paddingRight:"20px", height:"40px !important"}} placeholder = "Title" InputProps={{
      classes: {
      border:classes.border,
      notchedOutline: classes.notchedOutline
      }
      }}/>
      <hr/>
      <h2 className = "font_custom">
         <b>Library Details</b>
      </h2>
      <hr/>
      <TextField  id="shelf_no" defaultValue=" " className="w-" label="Shelf No. " variant="outlined" 
      style={{marginTop:"15px",paddingRight:"20px", height:"40px !important"}} placeholder = "Title" InputProps={{
      classes: {
      border:classes.border,
      notchedOutline: classes.notchedOutline
      }
      }}/><TextField  id="no_copies" defaultValue=" " className="w-50" label="No. of Copies" variant="outlined" 
      style={{marginTop:"15px",paddingRight:"20px", height:"40px !important"}} placeholder = "Title" InputProps={{
      classes: {
      border:classes.border,
      notchedOutline: classes.notchedOutline
      }
      }}/>
      <hr/>
      <center className = "font_custom" align="centered">
         <h6> Note*: All the Input fields are system generated and can be edited</h6>
      </center>
      <hr/>
      <center>
         <Button className="w-50" id = "chat_button" style= {{textTransform:"none"}} onClick={() => {this.send_data()}}>
         Confirm Addition
         </Button>
         <Modal
            size = 'sm'
            isOpen = {this.state.confirm}
            className = "font_custom functionModal"
            style={{width:"auto", height:"auto"}}
         >
            <div>
            <IconButton id="close" className="closeItem" onClick={this.toggleModal_result}>    
               <CloseIcon className="text-right" style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
            </IconButton>
            </div>
            <div>
               <h4>
                  <b>Book added Successfully</b>
               </h4>
            </div>
         </Modal>
      </center>
   </div>
</div>
   </div>
   
   {/* Add From ends  */}


   {/* Delete Form  */}

{/* Delete the book */}

   <div className = 'add_book' hidden={!this.state.display_delete} >
      <div width = "30%" className = "p-3 pr-5" style = {{borderRight: "1.5px solid #2b2b2b"}} >
      	<img className="shadow" style={{width:"150px", height:"200px", borderRadius:"5%"}} src={`http://books.google.com/books/content?id=${this.state.selected_book.id}).id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}/>
      </div>
      <div className="w-75 p-3 font_custom" style = {{background:"white",borderRadius:"10px"}}>
      	<h2 className = "font_custom"> 
        <b>Book Details</b>
      	</h2>
      <hr/>
      <TextField id="book_title_del" defaultValue=" " name="add_book"  className="w-50" label="Title" variant="outlined"  style={{marginTop:"15px",paddingRight:"20px", height:"40px !important"}}  InputProps={{
      classes: {
      border:classes.border,
      notchedOutline: classes.notchedOutline
      }
      }}/>                         
      <TextField id="author_del" defaultValue=" " className="w-50" label="Author" variant="outlined" style ={{marginTop:"15px",MarginLeft:"10px"}}InputProps={{
      classes: {
      notchedOutline: classes.notchedOutline
      }
      }}/>
      <TextField  id="genre_del" defaultValue=" " className="w-50" label="Genre/Category" variant="outlined" style ={{marginTop:"15px",paddingRight:"20px"}}InputProps={{
      classes: {
      notchedOutline: classes.notchedOutline
      }
      }}/>
      <TextField  id="page_count_del" defaultValue=" " className="w-50" label="Page Count" variant="outlined" 
      style={{marginTop:"15px",paddingRight:"20px", height:"40px !important"}} placeholder = "Title" InputProps={{
      classes: {
      border:classes.border,
      notchedOutline: classes.notchedOutline
      }
      }}/>
      <TextField  id="description_del" defaultValue=" " className="w-75" label="Description"  multiline rowsMax = "10" variant="outlined" 
      style= {{marginTop:"15px"}}InputProps={{
      classes: {
      notchedOutline: classes.notchedOutline
      }
      }}/>
   </div>
   <div className= "w-100 p-4">
      <hr style = {{marginTop:"30px"}}/>
      <h2 className = "font_custom">
         <b>Publication Details</b>
      </h2>
      <hr/>
      <TextField  id="publication_del" defaultValue="a" className="w-50" label="Publication" variant="outlined" 
      style={{marginTop:"15px",paddingRight:"20px", height:"40px !important"}} placeholder = "Publication" InputProps={{
      classes: {
      border:classes.border,
      notchedOutline: classes.notchedOutline
      }
      }}/>
      <TextField  id="publication_year_del" defaultValue="a" className="w-50" label="Publication Year" variant="outlined" 
      style={{marginTop:"15px",paddingRight:"20px", height:"40px !important"}} placeholder = "Publblication Year" InputProps={{
      classes: {
      border:classes.border,
      notchedOutline: classes.notchedOutline
      }
      }}/>
      <TextField  id="edition_del" defaultValue=" " className="w-50" label="Edition" variant="outlined" 
      style={{marginTop:"15px",paddingRight:"20px", height:"40px !important"}} placeholder = "Title" InputProps={{
      classes: {
      border:classes.border,
      notchedOutline: classes.notchedOutline
      }
      }}/>
      <hr/>
      <h2 className = "font_custom">
         <b>Library Details</b>
      </h2>
      <hr/>
      <TextField  id="shelf_no_del" defaultValue=" " className="w-" label="Shelf No. " variant="outlined" 
      style={{marginTop:"15px",paddingRight:"20px", height:"40px !important"}} placeholder = "Title" InputProps={{
      classes: {
      border:classes.border,
      notchedOutline: classes.notchedOutline
      }
      }}/><TextField  id="no.of copies_del" defaultValue=" " className="w-50" label="No. of Copies" variant="outlined" 
      style={{marginTop:"15px",paddingRight:"20px", height:"40px !important"}} placeholder = "Title" InputProps={{
      classes: {
      border:classes.border,
      notchedOutline: classes.notchedOutline
      }
      }}/>
      <hr/>
      <center className = "font_custom" align="centered">
         <h6> Note*: All the Input fields are system generated and can be edited</h6>
      </center>
      <hr/>
      <center>
         <Button className="w-50" id = "chat_button" style= {{textTransform:"none"}} onClick={this.delete_data.bind(this)}>
         Confirm Deletion
         </Button>
         <Modal
            size = 'lg'
            isOpen = {this.state.del_confirm}
            className = "font_custom functionModal"
            centered={true}
         >
            <div>
            <IconButton id="close" className="closeItem" onClick  = {this.toggleModelDel}>    
               <CloseIcon className="text-right" style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
            </IconButton>
            </div>
            <div className>
               <h4>
                  <b>Book Deleted Successfully</b>
               </h4>
            </div>
         </Modal>
      </center>
   </div>
   </div>

{/* Delete Ends here */}



<MyVerticallyCenteredModal
   books={this.state.books}
   searchTerm={this.state.searchTerm}
   show={this.state.modalShow}
   onHide={this.toggleModalShow.bind(this)}
   book={this.state.book}
   display_form={this.display_form}
   />
<Modal
   isOpen = {this.state.modalShow}
   className = "font_custom"
   centered = {true}
   size="lg" 
   >
   <div id="resultDisplay"   style={{width:"100%", display:"inline-block"}}>
   <div className="shadow bg-white p-3" style={{height:"100%", width:"100%",background:"#f2f2f2", borderRadius:"20px"}}>
   <h5 style = {{paddingLeft:"20px"}}>Showing search results for " {this.state.searchTerm} "</h5>
   <hr/>
   {/* Displaying Local Db Result */}
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
                        <h5 className="pl-2">{book.volumeInfo.title}</h5>
                     </tr>
                     <tr>
                        <h6 className="pl-2">{book.volumeInfo.authors}</h6>
                     </tr>
                     <tr>
                        <h6 className="pl-2">{book.volumeInfo.publishedDate}</h6>
                     </tr>
                     </td>
                     <tr>
                        <Button id = "chat_button" onClick = {()=>{this.display_form(book)}}  style= {{textTransform:"none"}}>
                           Add
                        </Button>
                     </tr>
                     </tr>
                  </table>
                  {/* 
                  <div className="searchResultDetails">
                     <div className="imageResult">
                        <img  className="shadow " style={{height:"100px", borderRadius:"10%"}} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}/>
                     </div>
                  </div>
                  */}
               </div>
            </li>
            );
            }
            )
            }
         </ul>
      </div>
   </div>
   <center>  <Button  className="h-100" id = "chat_button" onClick={this.toggleModalShow.bind(this)}>Close</Button></center>
   </div>
   {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
   </div>
   {/* 
   <ModalFooter>
      <Button  className="h-100" id = "chat_button" onClick={props.onHide}>Close</Button>
   </ModalFooter>
   */}
</Modal>
</div>
{/* Add book ends */}













{/* Transaction starts */}
<div className="actionView p-3 mt-5 mb-3 shadow bg-white animated fadeIn" style= {{borderRadius:"10px"}} hidden={!this.state.display_transaction}>
   <div className = "w-100 font_custom" style = {{fontSize: "30px"}}>
      <div className = "column p-2">
         <div className="addBookDiv">
            <b>View Transactions</b>
         </div>
         <div>
            <IconButton id="close" className="closeItem" onClick={()=>this.setState({display_transaction:!this.state.display_transaction})}>    
               <CloseIcon className="text-right" style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
            </IconButton>
         </div>
      </div>
      <hr/>
      <div className="transactionActionButtons">
         <div className={this.state.clickedViewAll ? "transactionBox_selected p-4 shadow bg-white" : "transactionBox p-4 shadow bg-white"} onClick={this.toggleClicked_viewAll.bind(this)}>
            <div><h5>All Transactions</h5></div>
            <div><h6>View all issue and return transactions</h6></div>
         </div>
         <div className="transactionBox p-4 shadow bg-white">
            <div><h5>Issue Transactions</h5></div>
            <div><h6>View all issue transactions</h6></div>
         </div>
         <div className="transactionBox p-4 shadow bg-white">
            <div><h5>Return Transactions</h5></div>
            <div><h6>View all return transactions</h6></div>
         </div>
      </div>
      <hr/>
      <div className = "w-100" style = {{display:"flex", fontSize: "14px"}}>
         <div>

            <tr>
               <td className = "p-2">
                  Book_Name
               </td>
               <td className = "p-2">
                  Book_id
               </td >
               <td className = "p-2">
                  User_id
               </td>
               <td className = "p-2">
                  Status
               </td>
            </tr>
         </div>
      </div>
   </div>
</div>
{/* Transaction ends here */}





{/* Reservation starts*/}
<div className="actionView p-3 mt-5 mb-3 shadow bg-white animated fadeIn" style= {{borderRadius:"10px"}} hidden={!this.state.display_reserveList}>
   <div className = "w-100 font_custom" style = {{fontSize: "30px"}}>
      <div className = "column p-2">
         <div className="addBookDiv">
            <b>View Reservations</b>
         </div>
         <div>
            <IconButton id="close" className="closeItem" onClick={()=>this.setState({display_reserveList:!this.state.display_reserveList})}>    
               <CloseIcon className="text-right" style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
            </IconButton>
         </div>
      </div>
      <hr/>
      <div className="transactionActionButtons">
         <div className="transactionBox p-4 shadow bg-white">
            <div><h5>All Transactions</h5></div>
            <div><h6>View all issue and return transactions</h6></div>
         </div>
         <div className="transactionBox p-4 shadow bg-white">
            <div><h5>Issue Transactions</h5></div>
            <div><h6>View all issue transactions</h6></div>
         </div>
         <div className="transactionBox p-4 shadow bg-white">
            <div><h5>Return Transactions</h5></div>
            <div><h6>View all return transactions</h6></div>
         </div>
      </div>
      <hr/>
   </div>
</div>
{/* Reservation ends here */}





{/* Suggestion starts display_reserveList*/}
<div className="actionView p-3 mt-5 mb-3 shadow bg-white animated fadeIn" style= {{borderRadius:"10px"}} hidden={!this.state.display_suggestion}>
   <div className = "w-100 font_custom" style = {{fontSize: "30px"}}>
      <div className = "column p-2">
         <div className="addBookDiv">
            <b>View Suggestions</b>
         </div>
         <div>
            <IconButton id="close" className="closeItem" onClick={()=>this.setState({display_suggestion:!this.state.display_suggestion})}>    
               <CloseIcon className="text-right" style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
            </IconButton>
         </div>
      </div>
      <hr/>
      <div className="transactionActionButtons">
         <div className="transactionBox p-4 shadow bg-white">
            <div><h5>All Transactions</h5></div>
            <div><h6>View all issue and return transactions</h6></div>
         </div>
         <div className="transactionBox p-4 shadow bg-white">
            <div><h5>Issue Transactions</h5></div>
            <div><h6>View all issue transactions</h6></div>
         </div>
         <div className="transactionBox p-4 shadow bg-white">
            <div><h5>Return Transactions</h5></div>
            <div><h6>View all return transactions</h6></div>
         </div>
      </div>
      <hr/>
   </div>
</div>
{/* Suggestion ends here */}





{/* QR Scan Division */}
<div className="actionView p-3 mt-5 mb-3 shadow bg-white animated fadeIn" style= {{borderRadius:"10px"}} hidden= {!this.state.display_qrScan}>
   <div className = "w-100 font_custom" style = {{fontSize: "30px"}}>
      <center>
      <div className = "column p-2">
         <div className="addBookDiv">
            <b>Scan QR</b>
         </div>
         <div>
            <IconButton id="close" className="closeItem" onClick={()=>this.setState({display_qrScan:!this.state.display_qrScan})}>    
               <CloseIcon className="text-right" style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
            </IconButton>
         </div>
      </div>
      <div>
         <hr/>
         
         <QrReader
         delay={300}
         onError={this.handleError}
         onScan={this.handleScan}
         style={{ width: '50%' }}
         result_copy={this.state.result}
         />
         {/* {this.get_json(this.state.result)} */}
         <hr/>
         <div className="addBookDiv" style = {{textAlign:"left"}}>
            <b>Book Details</b>
         </div>
         <hr/>
         <div className="qrInfo">
         {/* <div width = "30%" className = "p-3 pr-5" style = {{borderRight: "1.5px solid #2b2b2b"}} >
         <img className="shadow " style={{height:"100px", borderRadius:"10%"}} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}/>
         </div> */}
      <div className="qrInfoDiv">
            <div>
            <TextField id="book_id" defaultValue=" " name="add_book" label="Book id" variant="outlined"  style={{marginLeft:"15px",paddingRight:"20px", width:"200px !important", height:"40px !important",textAlign:"left"}}  InputProps={{
                  classes: {
                  border:classes.border,
                  notchedOutline: classes.notchedOutline
            }
            }}/>
            </div>
            <br/>
            <div>
            <TextField id="user_id" defaultValue=" " name="add_book" label="User id" variant="outlined"  style={{marginLeft:"15px",paddingRight:"20px", height:"40px !important",textAlign:"left"}}  InputProps={{
            classes: {
            border:classes.border,
            notchedOutline: classes.notchedOutline
            }
            }}/>
            </div>
            <hr/>
      </div>
      </div>


      </div>
   </center>
   <center>
      {/* {console.log(JSON.parse(JSON.stringify(this.state.result)))} */}
      <h3>{this.state.result}</h3>  
   <hr/>
   <Button id = "chat_button" className = "w -75" onClick = {()=>{this.post_qr()}}  style= {{textTransform:"none"}}>
      Issue Book
   </Button>
   </center>
   <Modal
   isOpen = {this.state.qr_modal}>
       <div>
            <IconButton id="close" className="closeItem" onClick={this.toggleModalQR}>    
               <CloseIcon className="text-right" style = {{outline:"none !important",height : "30px",width :"30px",color : "#2b2b2b"}}/>
            </IconButton>
         </div>
      <div>
         Book Issued
      </div>
   </Modal>
   </div>
</div>




{/* Selected View ends */}
</div>
{/* Main division ends */}
</div>
</div>          
//Render function ends
);
};
}
function MyVerticallyCenteredModal(props) {
// console.log(props)
return (
<div></div>
);
}
Library_MainPage.propTypes = {
classes: PropTypes.object.isRequired,
}
export default withStyles(styles) (Library_MainPage);