import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import './App.css';
// import axios from 'axios';

export default class App extends React.Component{
  render() {
    return(
      <>
        <Header/>
        <Main/>
        <Footer/>
      </>
    )
  }
}