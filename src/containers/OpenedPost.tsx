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
import { likePost, likeComment, dislikePost, dislikeComment } from '../store/posts/action';

interface PropsFromState {
  postsState: PostsState
}

interface PropsFromDispatch {
  likePost: typeof likePost,
  likeComment: typeof likeComment,
  dislikePost: typeof dislikePost,
  dislikeComment: typeof dislikeComment
}

interface IState {
  post: PostState
}

type allProps = PropsFromState & PropsFromDispatch & RouteComponentProps<{ id: string }>;

class OpenedPost extends Component<allProps, IState> {
  render() {
    const { posts } = this.props.postsState;
    console.log(posts);
    return (
      <div>
        <Header isHomePage={true}></Header>
        <div className={styles.postsContainer}>
          <Post
            likeComment={this.props.likeComment} likePost={this.props.likePost}
            dislikePost={this.props.dislikePost} dislikeComment={this.props.dislikeComment}
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
    likePost: (postId: string) => dispatch(likePost(postId)),
    likeComment: (commentId: string) => dispatch(likeComment(commentId)),
    dislikePost: (postId: string) => dispatch(dislikePost(postId)),
    dislikeComment: (commentId: string) => dispatch(dislikeComment(commentId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenedPost);