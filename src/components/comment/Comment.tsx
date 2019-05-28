import React, { Component } from 'react';
import { Card, CardContent, Typography, CardActions, Collapse, IconButton, Avatar } from '@material-ui/core';
import Likes from '../post/Likes';
import styles from "./css/comment.module.css";
import expandIcon from "../../assets/expand_icon.png";
import replyIcon from "../../assets/reply_icon.png";
import CommentForm from '../commentForm/CommentForm';
import { CommentsState, CommentState } from '../../store/comments/types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addComment, fetchComments, loadComments } from '../../store/comments/action';
import { UserState } from '../../store/user/types';

interface PropsFromState {
  commentState: CommentState,
  user: UserState,
  postId: string,
  parentCommentId: string,
  id: string
}

// interface PropsFromDispatch {
//   addComment: typeof addComment,
//   fetchComments: typeof fetchComments,
//   loadComments: typeof loadComments
// }

interface IState {
  expandComments: boolean,
  expandCommentForm: boolean
}

type allProps = PropsFromState;

class Comment extends Component<allProps, IState> {
  readonly state = {
    expandComments: false,
    expandCommentForm: false
  }
  
  render() {
    const comment: CommentState = this.props.commentState;
    return (
      <div>
        <Card className={styles.comment}>
          <CardContent className={styles.content}>
            <Typography className={styles.caption} variant="caption">
              Answer by {this.props.user.username}
            </Typography>
            <CardContent>
              <Typography variant="body1">{comment.content}</Typography>
            </CardContent>
            <Collapse in={this.state.expandCommentForm}>
              <CommentForm></CommentForm>
            </Collapse>
          </CardContent>
          <CardActions className={styles.commentSidebar}>
            <Likes 
              likes={comment.likes} 
              IsInCommentSection={true}></Likes>
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
            {comment.comments.map(comment => (
              <Comment 
                id={comment}
                postId={""}
                parentCommentId={this.props.id}
                key={comment}
                user={this.props.user}
                commentState={this.props.commentState}>
              </Comment>)
            )}
          </Collapse>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (rootReducer: any, ownProps: any) => {
  return {
    commentState: rootReducer.app.comments.byId[ownProps.id]
  }
}

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {
//     addComment: () => dispatch(addComment()),
//     fetchComments: () => dispatch(fetchComments()),
//     loadComments: (commentsState: CommentsState) => dispatch(loadComments(commentsState))
//   }
// }

export default connect(mapStateToProps)(Comment);