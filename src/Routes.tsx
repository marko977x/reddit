import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import OpenedPost from './containers/OpenedPost';
import NewPostForm from './containers/NewPostForm';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/newPost" component={NewPostForm}></Route>
          <Route path="/:id" component={OpenedPost}></Route>
        </Switch>
      </BrowserRouter >
    );
  }
}

export default Routes;