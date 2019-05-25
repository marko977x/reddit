import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Avatar, InputBase, Button, IconButton } from '@material-ui/core';
import redditIcon from "../../assets/reddit_icon.png";
import searchIcon from "../../assets/search_icon.png";
import accountIcon from "../../assets/account_icon.png";
import styles from "./css/header.module.css";

interface IProps {
  isHomePage: boolean
}

class Header extends Component<IProps> {
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
            <div className={this.props.isHomePage ? styles.signUp : styles.hidden}>
              <Button className={styles.button} color="inherit" variant="outlined">Sign Up</Button>
              <Button className={styles.button} variant="contained" >Login</Button>
            </div>
            <div className={this.props.isHomePage ? styles.hidden : styles.accountMenu}>
              <IconButton>
                <Avatar className={styles.accountIcon} src={accountIcon}></Avatar>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;