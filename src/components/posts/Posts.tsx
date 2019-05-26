import React, { Component } from 'react';
import Post from '../post/Post';
import styles from "./css/posts.module.css";
import { AppState } from '../../store';
import { PostsState } from '../../store/posts/types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { openPost, fetchPosts, loadPosts } from '../../store/posts/action';

interface PropsFromState {
  postsState: PostsState,
  isHomePage: boolean
}

interface PropsFromDispatch {
  openPost: typeof openPost,
  fetchPosts: typeof fetchPosts,
  loadPosts: typeof loadPosts
}

type allProps = PropsFromState & PropsFromDispatch;

class Posts extends Component<allProps> {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className={styles.postsContainer}>
        {this.props.postsState.posts.map(post => {
          return (
            <Post
              isOpened={!this.props.isHomePage}
              key={post.id}
              post={post}>
            </Post>
            )})
        }
      </div>
    );
  }
}

const mapStateToProps = (appState: AppState) => {
  return {
    postsState: appState.postsState
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openPost: (id: number) => dispatch(openPost(id)),
    fetchPosts: () => dispatch(fetchPosts()),
    loadPosts: (postsState: PostsState) => dispatch(loadPosts(postsState))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Posts);