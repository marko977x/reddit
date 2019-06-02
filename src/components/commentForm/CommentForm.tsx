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
import { NormalizedObjects } from '../../store';
import { UserState } from '../../store/user/types';

interface IProps {
  isParentComponentPost: boolean,
  parentComponentId: string
}

interface propsFromState {
  ui: UiState,
  users: NormalizedObjects<UserState>
}

interface propsFromDispatch {
  openLoginDialog: typeof openLoginDialog,
  addCommentToPost: typeof addCommentToPost,
  replyToComment: typeof replyToComment
}

interface IState {
  content: string,
  loggedUserUsername: string
}

type allProps = IProps & propsFromState & propsFromDispatch;

class CommentForm extends Component<allProps, IState> {
  readonly state = {
    content: "",
    loggedUserUsername: this.getLoggedUserUsername()
  }

  render() {
    const {loggedUser} = this.props.ui;
    const user: UserState = this.props.users.byId[loggedUser];
    return (
      <div className={styles.comment}>
        <TextField
          id="outlined-multiline-static"
          label={loggedUser === "" ? "Comment" : "" + user.username}
          placeholder={"Enter you comment here"}
          value={this.state.content} onChange={this.onContentChange}
          multiline fullWidth margin="normal" variant="outlined"
        />
        <Button onClick={this.onCommentButtonClick} variant="contained">Comment</Button>
      </div>
    );
  }

  getLoggedUserUsername(): string {
    if(this.props.ui.loggedUser !== "") {
      return this.props.users.byId[this.props.ui.loggedUser].username;
    }
    return "";
  }

  onCommentButtonClick = () => {
    if(this.props.ui.loggedUser === ""){
      this.props.openLoginDialog();
    } 
    else if(this.state.content !== "") {
      const comment: CommentState = {
        authorId: this.props.ui.loggedUser,
        comments: [],
        content: this.state.content,
        id: shortid.generate(),
        likes: [],
        dislikes: [],
        likesCount: 0,
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
    ui: rootReducer.ui,
    users: rootReducer.users
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