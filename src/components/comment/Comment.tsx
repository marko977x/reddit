import React, { Component } from 'react';
import { Card, CardContent, Typography, CardActions, Collapse, IconButton, Avatar } from '@material-ui/core';
import Likes from '../post/Likes';
import styles from "./css/comment.module.css";
import expandIcon from "../../assets/expand_icon.png";
import replyIcon from "../../assets/reply_icon.png";
import { CommentState } from '../../store/post/types';
import CommentForm from '../commentForm/CommentForm';

interface IProps {
  commentState: CommentState,
  like: any,
  dislike: any
}

interface IState {
  expandComments: boolean,
  expandCommentForm: boolean
}

class Comment extends Component<IProps, IState> {
  readonly state = {
    expandComments: false,
    expandCommentForm: false
  }
  
  render() {
    const {author, content, likes} = this.props.commentState;
    return (
      <div>
        <Card className={styles.comment}>
          <CardContent className={styles.content}>
            <Typography className={styles.caption} variant="caption">Answer by {author}</Typography>
            <CardContent>
              <Typography variant="body1">{content}</Typography>
            </CardContent>
            <Collapse in={this.state.expandCommentForm}>
              <CommentForm></CommentForm>
            </Collapse>
          </CardContent>
          <CardActions className={styles.commentSidebar}>
            <Likes
              like={this.props.like}
              dislike={this.props.dislike}
              ownerId={this.props.commentState.id}
              likes={likes} IsInCommentSection={true}></Likes>
            <IconButton
              className={styles.expandButton}
              aria-expanded={false}
              onClick={() => this.setState({ expandCommentForm: !this.state.expandCommentForm })}>
              <Avatar src={replyIcon}></Avatar>
            </IconButton>
            <IconButton
              className={styles.expandButton}
              aria-expanded={false}
              onClick={() => this.setState({expandComments: !this.state.expandComments})}>
              <Avatar src={expandIcon}></Avatar>
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expandComments} unmountOnExit>
            {this.props.commentState.comments.map(item => {
              return(
                <Comment 
                  like={this.props.like} dislike={this.props.dislike}
                  key={item.id} commentState={item}>
                </Comment>
              )
            })}
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default Comment;