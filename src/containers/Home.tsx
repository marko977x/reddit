import React, { Component } from 'react';
import Header from '../components/header/Header';
import Posts from '../components/posts/Posts';

class Home extends Component {
  render() {
    return (
      <div>
        <Header isHomePage={true}></Header>
        <Posts isHomePage={true}></Posts>
      </div>
    );
  } 
}

export default Home;