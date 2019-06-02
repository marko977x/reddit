import React, { Component } from 'react';
import { Card, CardContent, TextField, Select, MenuItem, FormControl, Button, InputLabel, OutlinedInput } from '@material-ui/core';
import styles from "./css/newPostForm.module.css";
import { connect } from 'react-redux';
import { Error } from '../store/user/types';
import { addPost } from '../store/post/action';
import { Dispatch } from 'redux';
import { PostState } from '../store/post/types';
import shortid from "shortid";
import { UiState } from '../store/ui/types';
import { Redirect } from 'react-router';
import Header from '../components/header/Header';
import { HOME_PAGE_PATH } from '../Routes';

interface PropsFromState {
  ui: UiState
}

interface PropsFromDispatch {
  addPost: typeof addPost
}

type AllProps = PropsFromState & PropsFromDispatch;

interface IState {
  topic: string,
  content: string,
  topicError: Error,
  contentError: Error,
  redirect: boolean
}

class NewPostForm extends Component<AllProps, IState> {
  readonly state = {
    topic: "",
    content: "",
    topicError: {
      error: false,
      errorText: ""
    },
    contentError: {
      error: false,
      errorText: ""
    },
    redirect: false
  }

  render() {
    console.log(this.state);
    if(this.state.redirect) 
      return <Redirect to={HOME_PAGE_PATH} />

    return (
      <div>
        <Header isLoggedUser={this.props.ui.loggedUser.id === "" ? false : true}></Header>
        <div className={styles.cardContainer}>
          <Card className={styles.card}>
            <CardContent>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Topic</InputLabel>
                <Select 
                  error={this.state.topicError.error}
                  value={this.state.topic}
                  onChange={this.selectTopic} 
                  input={<OutlinedInput labelWidth={50}/>}>
                  {this.props.ui.topics.map((topic, index) => {
                    return(<MenuItem value={topic} key={index}>{topic}</MenuItem>);
                  })}
                </Select>
              </FormControl>
              <TextField
                id="outlined-multiline-static" rows={5}
                placeholder={"Enter you post here"}
                multiline fullWidth margin="normal" variant="outlined"
                value={this.state.content}
                onChange={this.setContent}
                error={this.state.contentError.error}
                helperText={this.state.contentError.errorText}/>
              <div className={styles.submitButton}>
                <Button variant="contained" color={"primary"} onClick={this.submitPost}>
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
    );
  }

  selectTopic = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
    this.setState({
      topic: event.target.value,
      topicError: {error: false, errorText: ""}
    });
  }

  setContent = (event: any) => {
    this.setState({
      content: event.currentTarget.value,
      contentError: {error: false, errorText: ""}
    });
  }

  submitPost = () => {
    if(this.postValidation()) {
      this.props.addPost({
        id: shortid.generate(),
        authorId: this.props.ui.loggedUser.id,
        likes: [],
        dislikes: [],
        comments: [],
        likesCount: 0,
        content: this.state.content,
        topic: this.state.topic
      });

      this.setState({redirect: true});
    }
  }

  postValidation = () => {
    let result: boolean = true;
    if(this.state.topic === "") {
      this.setState({topicError: {error: true, errorText: "Pick a topic!"}});
      result = false;
    }
    if(this.state.content === "") {
      this.setState({contentError: {error: true, errorText: "Enter a comment!"}});
      result = false;
    }
    return result;
  }
}

const mapStateToProps = (rootReducer: any) => {
  return {
    ui: rootReducer.ui
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addPost: (post: PostState) => dispatch(addPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostForm);