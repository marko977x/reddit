import React, { Component } from 'react';
import { Card, CardContent, Typography, CardActions, Collapse, IconButton, Avatar } from '@material-ui/core';
import Likes from '../post/Likes';
import styles from "./css/comment.module.css";
import expandIcon from "../../assets/expand_icon.png";

class Comment extends Component {
  render() {
    return (
      <div>
        <Card className={styles.comment}>
          <CardContent className={styles.content}>
            <Typography className={styles.caption} variant="caption">Answer by marko977x</Typography>
            <CardContent>
              <Typography variant="body1">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </Typography>
            </CardContent>
          </CardContent>
          <CardActions className={styles.commentSidebar}>
            <Likes likes={1} IsInCommentSection={true}></Likes>
            <IconButton
              className={styles.expandButton}
              aria-expanded={false}
              aria-label="Show more">
              <Avatar src={expandIcon}></Avatar>
            </IconButton>
          </CardActions>
          <Collapse unmountOnExit>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default Comment;