import React,{Component} from 'react';
import QRCode from 'react-qr-code';
import Button from 'react-bootstrap/Button';
import './search.css';
import DownloadLink from "react-download-link";

class QR extends Component { // will implement soon}
  render(){

    var qr_value='';
    qr_value+="{\"Books\":[";
    var x=this.props.selected_books;
    x.map((book, index) => {
      //qr_value+='{id :' +x[index].id+', title :'+x[index].volumeInfo.title+',author : '+x[index].volumeInfo.authors+'}';
      
      qr_value += "{\"Book_ID\":\""+x[index].id+"\"" +"},";
    });
    qr_value=qr_value.substring(0,qr_value.length-1);
    qr_value+="]}";
    // var object=JSON.stringify(this.props.location.state.selected_books[0].volumeInfo.title)
    // object+= "  " +JSON.stringify(this.props.location.state.selected_books[1].volumeInfo.title)
    // console.log(object)
    // const downloadQR = () => {
    //   const canvas = document.getElementById("canvas")
    //   console.log(canvas)
    //   const pngUrl = canvas
    //     .toDataURL("image/png")
    //     .replace("image/png", "image/octet-stream");
    //   let downloadLink = document.createElement("a");
    //   downloadLink.href = pngUrl;
    //   downloadLink.download = "123456.png";
    //   document.body.appendChild(downloadLink);
    //   downloadLink.sssclick();
    //   document.body.removeChild(downloadLink);
    // };
  return(
   
  <div  className = "centered qr h-50 p-5">
    <div id="123456">
        <QRCode
        value={(qr_value)}
        size={200}
        level={"H"}
        includeMargin={true}
      />
      </div>
  </div>
  )
}
}

export default QR;