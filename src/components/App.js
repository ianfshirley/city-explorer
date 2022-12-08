import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import './reset.css';
import './App.css';
// import axios from 'axios';

export default class App extends React.Component{
  render() {
    return(
      <div id='app-body'>
        <Header />
        <Main id='main' />
        <Footer />
      </div>
    )
  }
}