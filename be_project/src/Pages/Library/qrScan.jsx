import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

class Test extends Component {
  state = {
    result: 'No result',
    result_copy:''
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data,
        result_copy:data
      })
     
    }
    // console.log('HERE');
    // console.log(JSON.parse(JSON.stringify(result_copy)));
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        
        <p>{this.state.result}</p>
      </div>
    )
  }
}