import React, { Component } from 'react';
import { Card, CardContent, Typography, CardActions, Collapse, IconButton, Avatar } from '@material-ui/core';
import Likes from '../post/Likes';
import styles from "./css/comment.module.css";
import expandIcon from "../../assets/expand_icon.png";
import replyIcon from "../../assets/reply_icon.png";
import CommentForm from '../commentForm/CommentForm';
import { connect } from 'react-redux';
import { UserState } from '../../store/user/types';
import { CommentState } from '../../store/comment/types';

interface PropsFromState {
  commentState: CommentState,
  user: UserState
}

interface IProps {
  id: string
}

interface IState {
  expandComments: boolean,
  expandCommentForm: boolean
}

type allProps = PropsFromState & IProps;

class Comment extends Component<allProps, IState> {
  readonly state = {
    expandComments: false,
    expandCommentForm: false
  }
  
  render() {
    if(!this.props.commentState || !this.props.user) return(<div></div>);
    
    return (
      <div>
        <Card className={styles.comment}>
          <CardContent className={styles.content}>
            <Typography className={styles.caption} variant="caption">
              Answer by {this.props.user.username}
            </Typography>
            <CardContent>
              <Typography variant="body1">{this.props.commentState.content}</Typography>
            </CardContent>
            <Collapse in={this.state.expandCommentForm}>
              <CommentForm 
                isParentComponentPost={false} 
                parentComponentId={this.props.commentState.id}>
              </CommentForm>
            </Collapse>
          </CardContent>
          <CardActions className={styles.commentSidebar}>
            <Likes 
              parentComponentId={this.props.commentState.id}
              likes={this.props.commentState.likesCount} 
              IsInCommentSection={true}
              parent={this.props.commentState}>
            </Likes>
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
            {this.props.commentState.comments.map(comment => (
              <ConnectedComment key={comment} id={comment}></ConnectedComment>
            ))}
          </Collapse>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (rootReducer: any, ownProps: any) => {
  if(rootReducer.users.isLoaded && rootReducer.comments.isLoaded)
    return {
      commentState: rootReducer.comments.byId[ownProps.id],
      user: rootReducer.users.byId[rootReducer.comments.byId[ownProps.id].authorId]
    }
  else 
    return {
      commentState: null,
      user: null
    }
}

const ConnectedComment = connect(mapStateToProps)(Comment);

export default ConnectedComment;