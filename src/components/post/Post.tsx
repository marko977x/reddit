import React, { Component } from 'react';
import { Card, CardContent, CardActions, ButtonBase } from '@material-ui/core';
import Likes from './Likes';
import PostHeader from './PostHeader';
import styles from "./css/post.module.css";
import PostContent from './PostContent';
import { PostState } from '../../store/post/types';
import { Redirect } from 'react-router-dom';
import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';

interface IProps {
  post: PostState,
  isOpened: boolean
}

interface IState {
  redirect: boolean;
}

class Post extends Component<IProps, IState> {
  readonly state = {
    redirect: false
  }

  render() {
    if(this.state.redirect) {
      return <Redirect push to={this.props.post.id} />
    }
    return (
      <div className={styles.post}>
        <Card className={styles.postCard}>
          <CardActions className={styles.postSidebar}>
            <Likes likes={this.props.post.likes} IsInCommentSection={false}></Likes>
          </CardActions>
        {this.props.isOpened ? this.renderOpenedPost() : this.renderPost()}
        </Card>
        {this.props.isOpened ? this.renderComments() : ""}
      </div>
    );
  }

  renderPost = () => {
    return (
      <ButtonBase disableRipple={this.props.isOpened} onClick={this.onPostClick} className={styles.buttonBase}>
        {this.renderCardContent()}
      </ButtonBase>);
  }

  renderOpenedPost = () => {
      return(this.renderCardContent());
  }

  renderCardContent = () => {
    return (
      <CardContent className={styles.cardContent}>
        <PostHeader
          author={this.props.post.author}
          topic={this.props.post.topic}>
        </PostHeader>
        <CardContent>
          <PostContent content={this.props.post.content}></PostContent>
        </CardContent>
        {this.props.isOpened ? <CommentForm></CommentForm> : ""}
      </CardContent>
    );
  }

  renderComments = () => {
    console.log(this.props.post);
    return(this.props.post.comments.map(comment => {
      return(<Comment commentState={comment} key={comment.id}></Comment>);
    }));
  }

  onPostClick = () => {
    this.setState({redirect: !this.props.isOpened});
  }
}

export default Post;