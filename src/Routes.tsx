import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import OpenedPost from './containers/OpenedPost';
import NewPostForm from './containers/NewPostForm';

export const HOME_PAGE_PATH = "/";
export const NEW_POST_PAGE_PATH = "/newPost";
export const OPENED_POST_PAGE_PATH = "/:id";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={HOME_PAGE_PATH} component={Home}></Route>
          <Route path={NEW_POST_PAGE_PATH} component={NewPostForm}></Route>
          <Route path={OPENED_POST_PAGE_PATH} component={OpenedPost}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;