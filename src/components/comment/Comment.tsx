import React, { Component } from 'react';
import { Card, CardContent, Typography, CardActions, Collapse, IconButton, Avatar } from '@material-ui/core';
import Likes from '../post/Likes';
import styles from "./css/comment.module.css";
import expandIcon from "../../assets/expand_icon.png";
import { CommentState } from '../../store/post/types';

interface IProps {
  commentState: CommentState
}

interface IState {
  expand: boolean
}

class Comment extends Component<IProps, IState> {
  readonly state = {
    expand: false
  }
  
  render() {
    const {author, comments, content, id, likes} = this.props.commentState;
    return (
      <div>
        <Card className={styles.comment}>
          <CardContent className={styles.content}>
            <Typography className={styles.caption} variant="caption">Answer by {author}</Typography>
            <CardContent>
              <Typography variant="body1">{content}</Typography>
            </CardContent>
          </CardContent>
          <CardActions className={styles.commentSidebar}>
            <Likes likes={likes} IsInCommentSection={true}></Likes>
            <IconButton
              className={styles.expandButton}
              aria-expanded={false}
              aria-label="Show more"
              onClick={() => this.setState({expand: !this.state.expand})}>
              <Avatar src={expandIcon}></Avatar>
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expand} unmountOnExit>
            {this.props.commentState.comments.map(item => {
              return(<Comment key={item.id} commentState={item}></Comment>)
            })}
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default Comment;