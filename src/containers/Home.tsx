import React, { Component } from 'react';
import Header from '../components/header/Header';
import Post from '../components/post/Post';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styles from "./css/home.module.css";
import { UiState } from '../store/ui/types';
import { NormalizedObjects } from '../store';
import { PostState } from '../store/post/types';
import { fetchData } from '../store/ui/action';

interface PropsFromState {
  ui: UiState,
  posts: NormalizedObjects<PostState>
}

interface PropsFromDispatch {
  fetchData: typeof fetchData
}

type allProps = PropsFromState & PropsFromDispatch;

class Home extends Component<allProps> {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div>
        <Header isLoggedUser={this.props.ui.loggedUser.id === "" ? false : true}></Header>
        <div className={styles.postsContainer}>
          {this.props.ui.shownPosts.map(post => {
            return (
              <Post key={post}
                isOpened={this.props.ui.isOpenedSinglePost}
                postState={this.props.posts.byId[post]}>
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
    ui: rootReducer.ui,
    posts: rootReducer.posts
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchData: () => dispatch(fetchData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);