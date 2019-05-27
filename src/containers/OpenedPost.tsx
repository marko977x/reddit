import React, { Component } from 'react';
import Header from '../components/header/Header';
import Post from '../components/post/Post';
import { PostsState } from '../store/posts/types';
import { RouteComponentProps } from 'react-router';
import { PostState } from '../store/post/types';
import { AppState } from '../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styles from "../components/posts/css/posts.module.css";

interface PropsFromState {
  postsState: PostsState
}

interface PropsFromDispatch {

}

interface IState {
  post: PostState
}

type allProps = PropsFromState & PropsFromDispatch & RouteComponentProps<{ id: string }>;

class OpenedPost extends Component<allProps, IState> {
  render() {
    const {posts} = this.props.postsState;
    return (
      <div>
        <Header isHomePage={true}></Header>
        <div className={styles.postsContainer}>
          <Post
            post={posts[posts.findIndex((item) => item.id === this.props.match.params.id)]}
            isOpened={true}>
          </Post>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    postsState: state.postsState
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenedPost);