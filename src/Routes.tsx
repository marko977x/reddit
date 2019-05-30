import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './containers/Home';
import OpenedPost from './containers/OpenedPost';
import NewPostForm from './containers/NewPostForm';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={NewPostForm}></Route>
          <Route path="/:id" component={OpenedPost}></Route>
        </div>
      </BrowserRouter >
    );
  }
}

export default Routes;