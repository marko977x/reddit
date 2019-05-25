import React, { Component } from 'react';
import Header from '../components/header/Header';
import Post from '../components/post/Post';
import { PostsState } from '../store/posts/types';
import { RouteComponentProps } from 'react-router';
import { PostState } from '../store/post/types';
import { AppState } from '../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface PropsFromState {
  postsState: PostsState
}

interface PropsFromDispatch {

}

interface IState {
  post: PostState
}

type allProps = PropsFromState & PropsFromDispatch & RouteComponentProps<{ id: string }>;

class OpenedPost extends Component<allProps, IState> {
  render() {
    console.log(this.props);
    return (
      <div>
        <Header isHomePage={true}></Header>
        <Post 
          post={this.props.postsState.posts[parseInt(this.props.match.params.id)]} 
          isCommentFormVisible={true}>
        </Post>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    postsState: state.postsState
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenedPost);