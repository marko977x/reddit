import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './containers/Home';
import Post from './components/post/Post';
import OpenedPost from './containers/OpenedPost';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home}></Route>
          <Route path="/:id" component={OpenedPost}></Route>
        </div>
      </BrowserRouter >
    );
  }
}

export default Routes;