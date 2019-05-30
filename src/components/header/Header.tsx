import React, { Component, MouseEvent } from 'react';
import { AppBar, Toolbar, Typography, Avatar, InputBase, Button, IconButton } from '@material-ui/core';
import redditIcon from "../../assets/reddit_icon.png";
import searchIcon from "../../assets/search_icon.png";
import logoutIcon from "../../assets/logout_icon.png";
import styles from "./css/header.module.css";
import Login from '../login/Login';
import SignUp from '../signup/SignUp';
import { openSignupDialog, openLoginDialog, logoutUser } from '../../store/ui/action';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface IProps {
  isLoggedUser: boolean
}

interface propsFromDispatch {
  openLoginDialog: typeof openLoginDialog,
  openSignupDialog: typeof openSignupDialog,
  logoutUser: typeof logoutUser
}

type allProps = IProps & propsFromDispatch;

interface IState {
  anchorEl: any
}

class Header extends Component<allProps, IState> {
  readonly state = {
    anchorEl: undefined
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar className={styles.toolbar}>
            <div className={styles.redditLogo}>
              <Avatar className={styles.redditIcon} src={redditIcon} ></Avatar>
              <Typography className={styles.redditTypography} variant="h6" color="inherit" noWrap>Reddit</Typography>
            </div>
            <div className={styles.searchArea}>
              <Avatar className={styles.searchIcon} src={searchIcon}></Avatar>
              <InputBase className={styles.searchInput} placeholder="Search…" />
            </div>
            <div className={this.props.isLoggedUser ? styles.hidden : styles.signUp}>
              <Button onClick={this.props.openSignupDialog} className={styles.button} color="inherit" variant="outlined">Sign Up</Button>
              <Button onClick={this.props.openLoginDialog} className={styles.button} variant="contained" >Login</Button>
            </div>
            <div className={this.props.isLoggedUser ? styles.accountMenu : styles.hidden}>
              <IconButton onClick={this.props.logoutUser}>
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
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openLoginDialog: () => dispatch(openLoginDialog()),
    openSignupDialog: () => dispatch(openSignupDialog()),
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(null, mapDispatchToProps)(Header);