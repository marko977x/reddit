import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import styles from  './css/postHeader.module.css';

interface IProps {
  topic: string,
  author: string
}

class PostHeader extends Component<IProps> {
  render() {
    return (
      <div className={styles.postHeader}>
        <Typography className={styles.topic} variant="caption">r/{this.props.topic}:</Typography>
        <Typography variant="caption">Posted by {this.props.author}</Typography>
      </div>
    );
  }
}

export default PostHeader;