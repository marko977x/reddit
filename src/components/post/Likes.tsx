import React, { Component } from 'react';
import dislikedIcon from "../../assets/disliked_icon.png";
import likedIcon from "../../assets/liked_icon.png";
import likeIcon from "../../assets/like_icon.png";
import dislikeIcon from "../../assets/dislike_icon.png";
import { Avatar, Typography, IconButton } from '@material-ui/core';
import styles from './css/likes.module.css';
import { UiState } from '../../store/ui/types';
import { connect } from 'react-redux';
import { likePost, dislikePost, likeComment, dislikeComment } from '../../store/user/action';
import { Dispatch } from 'redux';
import { openLoginDialog } from '../../store/ui/action';
import { CommentState } from '../../store/comment/types';
import { PostState } from '../../store/post/types';

interface PropsFromState {
  ui: UiState
}

interface IProps {
  IsInCommentSection: boolean,
  parentComponentId: string,
  likes: number,
  parent: PostState | CommentState
}

interface PropsFromDispatch {
  likePost: typeof likePost,
  dislikePost: typeof dislikePost,
  likeComment: typeof likeComment,
  dislikeComment: typeof dislikeComment,
  openLoginDialog: typeof openLoginDialog
}

type AllProps = PropsFromState & IProps & PropsFromDispatch;

interface IState {
  isLiked: boolean,
  isDisliked: boolean
}

class Likes extends Component<AllProps, IState> {
  readonly state = {
    isLiked: this.props.parent.likes.includes(this.props.parentComponentId),
    isDisliked: this.props.parent.dislikes.includes(this.props.parentComponentId),
  }

  componentDidUpdate(prevProps: any) {
    if(prevProps.ui != this.props.ui)
      this.update();
    console.log("update");
  }

  componentDidMount() {
    this.update();
  }

  update() {
    const { likedPosts, likedComments, dislikedPosts, dislikedComments } =
      this.props.ui.loggedUser;
    let isLiked: boolean = false;
    let isDisliked: boolean = false;
    if (this.props.IsInCommentSection) {
      isLiked = likedComments.includes(this.props.parentComponentId);
      isDisliked = dislikedComments.includes(this.props.parentComponentId);
    }
    else {
      isLiked = likedPosts.includes(this.props.parentComponentId);
      isDisliked = dislikedPosts.includes(this.props.parentComponentId);
    }
    this.setState({ isLiked, isDisliked });
  }

  render() {
    return (
      <div className={this.props.IsInCommentSection ? styles.horizontal : styles.vertical}>
        <IconButton onClick={this.onLikeClick} className={styles.likeButton}>
          <Avatar src={this.state.isLiked ? likedIcon : likeIcon}></Avatar>
        </IconButton>
        <div className={styles.likesValue}>
          <Typography className={styles.likesValue} variant="body1" align="justify">
            {this.props.likes}
          </Typography>
        </div>
        <IconButton onClick={this.onDislikeClick} className={styles.likeButton}>
          <Avatar src={this.state.isDisliked ? dislikedIcon : dislikeIcon}></Avatar>
        </IconButton>
      </div>
    );
  }

  onLikeClick = () => {
    this.props.ui.loggedUser.id !== "" ? 
      this.like() : this.props.openLoginDialog();
  }

  like = () => {
    if (this.props.IsInCommentSection) {
      this.props.likeComment({
        userId: this.props.ui.loggedUser.id,
        commentId: this.props.parentComponentId
      });
    }
    else {
      this.props.likePost({
        userId: this.props.ui.loggedUser.id,
        postId: this.props.parentComponentId
      });
    }
    this.setState({ isLiked: !this.state.isLiked, isDisliked: false});
  }

  onDislikeClick = () => {
    this.props.ui.loggedUser.id !== "" ? 
      this.dislike() : this.props.openLoginDialog(); 
  }

  dislike = () => {
    if (this.props.IsInCommentSection) {
      this.props.dislikeComment({
        userId: this.props.ui.loggedUser.id,
        commentId: this.props.parentComponentId
      });
    }
    else {
      this.props.dislikePost({
        userId: this.props.ui.loggedUser.id,
        postId: this.props.parentComponentId
      });
    }
    this.setState({ isDisliked: !this.state.isDisliked, isLiked: false });
  }
}

const mapStateToProps = (rootReducer: any, ownProps: any) => {
  return {
    ui: rootReducer.ui
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    likePost: (likePostInput: {userId: string, postId: string}) =>
      dispatch(likePost(likePostInput)),

    dislikePost: (dislikePostInput: {userId: string, postId: string}) =>
      dispatch(dislikePost(dislikePostInput)),

    likeComment: (likeCommentInput: {userId: string, commentId: string}) =>
      dispatch(likeComment(likeCommentInput)),

    dislikeComment: (dislikeCommentInput: { userId: string, commentId: string }) =>
      dispatch(dislikeComment(dislikeCommentInput)),

    openLoginDialog: () => dispatch(openLoginDialog())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Likes);