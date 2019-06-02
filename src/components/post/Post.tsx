import React, { Component } from 'react';
import { Card, CardContent, CardActions, ButtonBase } from '@material-ui/core';
import Likes from './Likes';
import PostHeader from './PostHeader';
import styles from "./css/post.module.css";
import PostContent from './PostContent';
import { Redirect, withRouter } from 'react-router-dom';
import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';
import { connect } from 'react-redux';
import { PostState } from '../../store/post/types';
import { UserState } from '../../store/user/types';

interface IProps {
  postState: PostState,
  isOpened: boolean
}

interface IState {
  redirect: boolean;
}

interface PropsFromState {
  user: UserState
}

type allProps = IProps & PropsFromState;

class Post extends Component<allProps, IState> {
  readonly state = {
    redirect: false
  }

  render() {
    if(this.state.redirect) {
      return <Redirect push to={this.props.postState.id} />
    }
    return (
      <div className={styles.post}>
        <Card className={styles.postCard}>
          <CardActions className={styles.postSidebar}>
            <Likes 
              likes={this.props.postState.likesCount}
              IsInCommentSection={false}
              parentComponentId={this.props.postState.id}
              parent={this.props.postState}>
            </Likes>
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
          author={this.props.user.username}
          topic={this.props.postState.topic}>
        </PostHeader>
        <CardContent>
          <PostContent content={this.props.postState.content}></PostContent>
        </CardContent>
        {this.props.isOpened ? 
          (<CommentForm 
            isParentComponentPost={true} 
            parentComponentId={this.props.postState.id}>
          </CommentForm>
          ) : ""}
      </CardContent>
    );
  }

  renderComments = () => {
    return (this.props.postState.comments.map(comment => {
      return(
        <Comment id={comment} key={comment}></Comment>
      );
    }));
  }

  onPostClick = () => {
    this.setState({redirect: !this.props.isOpened});
  }
}

const mapStateToProps = (rootReducer: any, ownProps: any) => {
  return {
    user: rootReducer.users.byId[ownProps.postState.authorId]
  }
}

export default withRouter(connect(mapStateToProps)(Post));