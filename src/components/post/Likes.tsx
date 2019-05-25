import React, { Component } from 'react';
import minusIcon from "../../assets/minus_icon.png";
import plusIcon from "../../assets/plus_icon.png";
import { Avatar, Typography, IconButton } from '@material-ui/core';
import styles from './css/likes.module.css';

interface IProps {
  IsInCommentSection: boolean,
  likes: number
}

class Likes extends Component<IProps> {
  render() {
    return (
      <div className={this.props.IsInCommentSection ? styles.horizontal : styles.vertical}>
        <IconButton className={styles.likeButton}><Avatar src={plusIcon}></Avatar></IconButton>
        <div className={styles.likesValue}>
          <Typography className={styles.likesValue} variant="body1" align="justify">
            {this.props.likes}
          </Typography>
        </div>
        <IconButton className={styles.likeButton}><Avatar src={minusIcon}></Avatar></IconButton>
      </div>
    );
  }
}

export default Likes;