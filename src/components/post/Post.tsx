import React, { Component } from 'react';
import { Card, CardContent, CardActions, CardActionArea, Paper, ButtonBase } from '@material-ui/core';
import Likes from './Likes';
import PostHeader from './PostHeader';
import styles from "./css/post.module.css";
import PostContent from './PostContent';
import CommentForm from '../commentForm/CommentForm';
import { PostState } from '../../store/post/types';
import { Link } from 'react-router-dom';
import OpenedPost from '../../containers/OpenedPost';

interface IProps {
  post: PostState,
  isCommentFormVisible: boolean
}

class Post extends Component<IProps> {
  render() {
    return (
      <div className={styles.post}>
        <Card className={styles.postCard}>
          <CardActions className={styles.postSidebar}>
            <Likes likes={this.props.post.likes} IsInCommentSection={false}></Likes>
          </CardActions>
          <CardContent className={styles.cardActionContent}>
            {/* <Link to={this.props.post.id.toString()} style={{ textDecoration: 'none' }}> */}
            <ButtonBase className={styles.cardContent}>
              <PostHeader 
                author={this.props.post.author}
                topic={this.props.post.topic}>
              </PostHeader>
              <CardContent>
                <PostContent content={this.props.post.content}></PostContent>
              </CardContent>
              <CardActions className={this.props.isCommentFormVisible ? "" : styles.hidden}>
                <CommentForm></CommentForm>
            </CardActions>
            </ButtonBase>
            {/* </Link> */}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Post;