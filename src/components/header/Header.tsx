import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Avatar, InputBase, Button, IconButton } from '@material-ui/core';
import redditIcon from "../../assets/reddit_icon.png";
import searchIcon from "../../assets/search_icon.png";
import accountIcon from "../../assets/account_icon.png";
import styles from "./css/header.module.css";
import Login from '../login/Login';
import SignUp from '../signup/SignUp';

interface IProps {
  isLoggedUser: boolean
}

interface IState {
  isLoginOpen: boolean,
  isSignUpOpen: boolean
}

class Header extends Component<IProps, IState> {
  readonly state = {
    isLoginOpen: false,
    isSignUpOpen: false
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
              <Button onClick={this.onSignUpClick} className={styles.button} color="inherit" variant="outlined">Sign Up</Button>
              <Button onClick={this.onLoginClick} className={styles.button} variant="contained" >Login</Button>
            </div>
            <div className={this.props.isLoggedUser ? styles.accountMenu : styles.hidden}>
              <IconButton>
                <Avatar className={styles.accountIcon} src={accountIcon}></Avatar>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Login onCancelClick={this.onLoginCancel} isOpen={this.state.isLoginOpen}></Login>
        <SignUp onCancelClick={this.onSignUpCancel} isOpen={this.state.isSignUpOpen}></SignUp>
      </div>
    );
  }

  onLoginCancel = () => {
    this.setState({ isLoginOpen: false });
  }

  onSignUpCancel = () => {
    this.setState({ isSignUpOpen: false });
  }

  onLoginClick = () => {
    this.setState({ isLoginOpen: true });
  }

  onSignUpClick = () => {
    this.setState({ isSignUpOpen: true });
  }
}

export default Header;