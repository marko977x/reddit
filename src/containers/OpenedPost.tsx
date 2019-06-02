import React, { Component } from 'react';
import Post from '../components/post/Post';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styles from "./css/home.module.css";
import { PostState } from '../store/post/types';
import { UiState } from '../store/ui/types';
import { NormalizedObjects } from '../store';
import Header from '../components/header/Header';

interface PropsFromState {
  ui: UiState,
  posts: NormalizedObjects<PostState>
}

interface PropsFromDispatch {
}

type allProps = PropsFromState & PropsFromDispatch &
  RouteComponentProps<{ id: string }>;

class OpenedPost extends Component<allProps> {
  render() {
    return (
      <div>
        <Header isLoggedUser={this.props.ui.loggedUser === "" ? false : true}></Header>
        <div className={styles.postsContainer}>
          {this.renderPost()}
        </div>
      </div>
    );
  }

  renderPost = () => {
    if(this.props.posts.isLoaded) {
      return (
      <Post 
        isOpened={true}
        postState={this.props.posts.byId[this.props.match.params.id]}>
      </Post>);
    }

    return(<div></div>);
  }

  isStoreLoaded = (): boolean => {
    return this.props.posts.allIds.length === 0 ? false : true;
  }
}


const mapStateToProps = (rootReducer: any) => {
  return {
    ui: rootReducer.ui,
    posts: rootReducer.posts
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  }
}

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(OpenedPost));