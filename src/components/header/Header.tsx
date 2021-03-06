import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Avatar, IconButton } from '@material-ui/core';
import redditIcon from "../../assets/reddit_icon.png";
import logoutIcon from "../../assets/logout_icon.png";
import styles from "./css/header.module.css";
import Login from '../login/Login';
import SignUp from '../signup/SignUp';
import { openSignupDialog, openLoginDialog, logoutUser } from '../../store/ui/action';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import { Redirect } from 'react-router';
import { NEW_POST_PAGE_PATH } from '../../Routes';
import { removeItemFromLocalStorage, LOGGED_USER_KEY } from '../../services/local-storage';

interface IProps {
  isLoggedUser: boolean
}

interface propsFromDispatch {
  openLoginDialog: typeof openLoginDialog,
  openSignupDialog: typeof openSignupDialog,
  logoutUser: typeof logoutUser
}

interface IState {
  redirect: boolean
}

type allProps = IProps & propsFromDispatch;

class Header extends Component<allProps, IState> {
  readonly state = {
    redirect: false
  }

  render() {
    if (this.state.redirect && window.location.pathname !== NEW_POST_PAGE_PATH)
      return <Redirect push to={NEW_POST_PAGE_PATH} />
    
    return (
      <div>
        <AppBar position="static">
          <Toolbar className={styles.toolbar}>
            <div className={styles.redditLogo}>
              <Avatar className={styles.redditIcon} src={redditIcon} ></Avatar>
              <Typography className={styles.redditTypography} variant="h6" color="inherit" noWrap>Reddit</Typography>
            </div>
            <div className={styles.newPostButtonContainer}>
              <Button onClick={this.onNewPostClick} variant={"contained"} color={"secondary"}>
                <AddIcon />
                <Typography variant={"button"}>Add New Post</Typography>
              </Button>
            </div>
            <div className={this.props.isLoggedUser ? styles.hidden : styles.signUp}>
              <Button onClick={this.props.openSignupDialog} className={styles.button} color="inherit" variant="outlined">Sign Up</Button>
              <Button onClick={this.props.openLoginDialog} className={styles.button} variant="contained" >Login</Button>
            </div>
            <div className={this.props.isLoggedUser ? styles.accountMenu : styles.hidden}>
              <IconButton onClick={this.logout}>
                <Avatar className={styles.accountIcon} src={logoutIcon}></Avatar>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Login></Login>
        <SignUp></SignUp>
      </div>
    );
  }

  logout = () => {
    removeItemFromLocalStorage(LOGGED_USER_KEY);
    this.props.logoutUser();
  }

  onNewPostClick = () => {
    this.props.isLoggedUser ? 
      this.setState({ redirect: true}) : 
      this.props.openLoginDialog();
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openLoginDialog: () => dispatch(openLoginDialog()),
    openSignupDialog: () => dispatch(openSignupDialog()),
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(null, mapDispatchToProps)(Header);