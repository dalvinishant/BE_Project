import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import { BrowserRouter as Router, Route} from "react-router-dom";

//Page imports
import HomePage from './Pages';
import Student_MainPage from './Pages/Student/MainPage';
import SearchResult from './Pages/Student/SearchResult'
import QR from './Pages/Student/QR';
import Library_MainPage from './Pages/Library/Library_MainPage';
import Commitee from './Pages/Authority/Commitee';


class App extends Component {

  render() {
    return <Router>
    <Route path = "/404" component = {HomePage} />
    <Route path = "/Student_MainPage" component = {Student_MainPage} />
    <Route path = "/Library_MainPage" component = {Library_MainPage} />
    <Route path = "/Commitee" component = {Commitee} />
    <Route path="/Search_Result" component ={SearchResult}/>
    <Route path="/QR" component={QR}/>

  </Router>
  };
}

export default App; 
