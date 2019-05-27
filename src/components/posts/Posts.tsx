import React, { Component } from 'react';
import Post from '../post/Post';
import styles from "./css/posts.module.css";
import { AppState } from '../../store';
import { PostsState } from '../../store/posts/types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { fetchPosts, loadPosts, likePost, likeComment, dislikePost, dislikeComment } from '../../store/posts/action';

interface PropsFromState {
  postsState: PostsState,
  isHomePage: boolean
}

interface PropsFromDispatch {
  fetchPosts: typeof fetchPosts,
  loadPosts: typeof loadPosts,
  likePost: typeof likePost,
  likeComment: typeof likeComment,
  dislikePost: typeof dislikePost,
  dislikeComment: typeof dislikeComment
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
              likeComment={this.props.likeComment}
              likePost={this.props.likePost}
              dislikePost={this.props.dislikePost}
              dislikeComment={this.props.dislikeComment}
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
    fetchPosts: () => dispatch(fetchPosts()),
    loadPosts: (postsState: PostsState) => dispatch(loadPosts(postsState)),
    likePost: (postId: string) => dispatch(likePost(postId)),
    likeComment: (commentId: string) => dispatch(likeComment(commentId)),
    dislikePost: (postId: string) => dispatch(dislikePost(postId)),
    dislikeComment: (commentId: string) => dispatch(dislikeComment(commentId))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Posts);