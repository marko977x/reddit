import React, { Component } from 'react';
import Header from '../components/header/Header';
import Post from '../components/post/Post';
import { PostsState, PostState } from '../store/home/types';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { likePost, dislikePost } from '../store/home/action';
import { connect } from 'react-redux';
import styles from "./css/home.module.css";
import { AppState } from '../store';

interface PropsFromState {
  app: AppState
}

interface PropsFromDispatch {
  likePost: typeof likePost,
  dislikePost: typeof dislikePost
}

interface IState {
  post: PostState
}

type allProps = PropsFromState & PropsFromDispatch & RouteComponentProps<{ id: string }>;

class OpenedPost extends Component<allProps, IState> {
  render() {
    return (
      <div>
        <Header isHomePage={true}></Header>
        <div className={styles.postsContainer}>
          <Post
            likePost={this.props.likePost}
            dislikePost={this.props.dislikePost}
            isOpened={true}
            postState={this.props.app.posts.byId[this.props.match.params.id]}>
          </Post>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (rootReducer: any) => {
  return {
    app: rootReducer.app
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    likePost: (postId: string) => dispatch(likePost(postId)),
    dislikePost: (postId: string) => dispatch(dislikePost(postId)),
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(OpenedPost);