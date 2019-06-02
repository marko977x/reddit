import React, { Component } from 'react';
import Post from '../components/post/Post';
import { connect } from 'react-redux';
import styles from "./css/home.module.css";
import { UiState } from '../store/ui/types';
import { NormalizedObjects } from '../store';
import { PostState } from '../store/post/types';
import Header from '../components/header/Header';
import { withRouter } from 'react-router';

interface PropsFromState {
  ui: UiState,
  posts: NormalizedObjects<PostState>
}

type allProps = PropsFromState;

class Home extends Component<allProps> {
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
          })}
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

export default withRouter(connect(mapStateToProps)(Home) as any);