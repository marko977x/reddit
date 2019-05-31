import React, { Component, ChangeEvent } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from "./css/commentForm.module.css";
import { UiState } from '../../store/ui/types';
import { connect } from 'react-redux';
import { openLoginDialog } from '../../store/ui/action';
import { Dispatch } from 'redux';
import { replyToComment } from '../../store/comment/action';
import { CommentState } from '../../store/comment/types';
import shortid from "shortid";
import { addCommentToPost } from '../../store/post/action';

interface IProps {
  isParentComponentPost: boolean,
  parentComponentId: string
}

interface propsFromState {
  ui: UiState
}

interface propsFromDispatch {
  openLoginDialog: typeof openLoginDialog,
  addCommentToPost: typeof addCommentToPost,
  replyToComment: typeof replyToComment
}

interface IState {
  content: string
}

type allProps = IProps & propsFromState & propsFromDispatch;

class CommentForm extends Component<allProps, IState> {
  readonly state = {
    content: ""
  }

  render() {
    const {loggedUser} = this.props.ui;
    return (
      <div className={styles.comment}>
        <TextField
          id="outlined-multiline-static"
          label={loggedUser.id === "" ? "Comment" : "" + loggedUser.username}
          placeholder={"Enter you comment here"}
          value={this.state.content} onChange={this.onContentChange}
          multiline fullWidth margin="normal" variant="outlined"
        />
        <Button onClick={this.onCommentButtonClick} variant="contained">Comment</Button>
      </div>
    );
  }

  onCommentButtonClick = () => {
    if(this.props.ui.loggedUser.id === ""){
      this.props.openLoginDialog();
    } 
    else if(this.state.content !== "") {
      const comment: CommentState = {
        authorId: this.props.ui.loggedUser.id,
        comments: [],
        content: this.state.content,
        id: shortid.generate(),
        likes: 0,
        parentCommentId: this.props.isParentComponentPost ? null : this.props.parentComponentId,
        postId: this.props.isParentComponentPost ? this.props.parentComponentId : null
      }
      this.props.isParentComponentPost ? 
        this.props.addCommentToPost(comment) : 
        this.props.replyToComment(comment);
      this.setState({content: ""});
    }
  }

  onContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({content: event.currentTarget.value});
  }
}


const mapStateToProps = (rootReducer: any) => {
  return {
    ui: rootReducer.ui
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openLoginDialog: () => dispatch(openLoginDialog()),
    addCommentToPost: (comment: CommentState) => dispatch(addCommentToPost(comment)),
    replyToComment: (comment: CommentState) => dispatch(replyToComment(comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);