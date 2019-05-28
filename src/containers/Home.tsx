import React, { Component } from 'react';
import Header from '../components/header/Header';
import Post from '../components/post/Post';
import { fetchPosts, loadPosts, likePost, dislikePost } from '../store/posts/action';
import { PostsState } from '../store/posts/types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import styles from "./css/home.module.css";

interface PropsFromState {
  appState: AppState,
  isHomePage: boolean
}

interface PropsFromDispatch {
  fetchPosts: typeof fetchPosts,
  loadPosts: typeof loadPosts,
  likePost: typeof likePost,
  dislikePost: typeof dislikePost
}

type allProps = PropsFromState & PropsFromDispatch;

class Home extends Component<allProps> {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    console.log(this.props.appState);
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
    fetchPosts: () => dispatch(fetchPosts()),
    loadPosts: (postsState: PostsState) => dispatch(loadPosts(postsState)),
    likePost: (postId: string) => dispatch(likePost(postId)),
    dislikePost: (postId: string) => dispatch(dislikePost(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);