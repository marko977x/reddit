import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

interface IProps {
  content: string
}

class PostContent extends Component<IProps> {
  render() {
    return (
      <div>
        <Typography variant="h5">{this.props.content}</Typography>
      </div>
    );
  }
}

export default PostContent;