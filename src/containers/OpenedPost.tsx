import React, { Component } from 'react';
import Header from '../components/header/Header';
import Post from '../components/post/Post';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styles from "./css/home.module.css";
import { PostState } from '../store/post/types';
import { UiState } from '../store/ui/types';
import { NormalizedObjects } from '../store';

interface PropsFromState {
  ui: UiState,
  posts: NormalizedObjects<PostState>
}

interface PropsFromDispatch {
}

interface IState {
  post: PostState
}

type allProps = PropsFromState & PropsFromDispatch &
  RouteComponentProps<{ id: string }>;

class OpenedPost extends Component<allProps, IState> {
  render() {
    return (
      <div>
        <Header isLoggedUser={this.props.ui.loggedUser.id === "" ? false : true}></Header>
        <div className={styles.postsContainer}>
          <Post isOpened={true}
            postState={this.props.posts.byId[this.props.match.params.id]}>
          </Post>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (rootReducer: any) => {
  return {
    ui: rootReducer.ui,
    posts: rootReducer.posts
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(OpenedPost);