import React, { Component } from 'react';
import Header from '../components/header/Header';
import Post from '../components/post/Post';
import { fetchAppState, loadAppState, likePost, dislikePost } from '../store/home/action';
import { PostsState } from '../store/home/types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import styles from "./css/home.module.css";

interface PropsFromState {
  appState: AppState,
  isHomePage: boolean
}

interface PropsFromDispatch {
  fetchAppState: typeof fetchAppState,
  loadAppState: typeof loadAppState,
  likePost: typeof likePost,
  dislikePost: typeof dislikePost
}

type allProps = PropsFromState & PropsFromDispatch;

class Home extends Component<allProps> {
  componentDidMount() {
    this.props.fetchAppState();
  }

  render() {
    return (
      <div>
        <Header isHomePage={true}></Header>
        <div className={styles.postsContainer}>
          {this.props.appState.ui.shownPosts.map(post => {
            return (
              <Post
                likePost={this.props.likePost}
                dislikePost={this.props.dislikePost}
                isOpenedSinglePost={this.props.appState.ui.isOpenedSignlePost}
                key={post} postState={this.props.appState.posts.byId[post]}>
              </Post>
            )
          })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (rootReducer: any) => {
  return {
    appState: rootReducer.app 
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchAppState: () => dispatch(fetchAppState()),
    loadAppState: (postsState: PostsState) => dispatch(loadAppState(postsState)),
    likePost: (postId: string) => dispatch(likePost(postId)),
    dislikePost: (postId: string) => dispatch(dislikePost(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);