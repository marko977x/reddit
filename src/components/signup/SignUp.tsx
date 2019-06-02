import React, { Component, ChangeEvent } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@material-ui/core';
import style from "./css/signUp.module.css";
import { NormalizedObjects } from '../../store';
import { UserState, Error, SignUpData } from '../../store/user/types';
import { connect } from 'react-redux';
import { UiState } from '../../store/ui/types';
import { Dispatch } from 'redux';
import { setLoggedUser, closeSignupDialog } from '../../store/ui/action';
import shortid from "shortid";
import { validateEmail, validatePassword, validateUsername } from '../../services/auth';
import { signUp } from '../../store/user/action';
import { setItemToLocalStorage, LOGGED_USER_KEY } from '../../services/local-storage';

interface propsFromState {
  users: NormalizedObjects<UserState>,
  ui: UiState
}

interface propsFromDispatch {
  signUp: typeof signUp,
  setLoggedUser: typeof setLoggedUser,
  closeDialog: typeof closeSignupDialog
}

interface IState {
  email: string,
  password: string,
  username: string,
  emailError: Error,
  usernameError: Error,
  passwordError: Error
}

type allProps = propsFromState & propsFromDispatch;

class SignUp extends Component<allProps, IState> {
  readonly state = {
    email: "",
    password: "",
    username: "",
    emailError: {error: false, errorText: ""},
    usernameError: { error: false, errorText: "" },
    passwordError: { error: false, errorText: "" }
  }

  componentWillReceiveProps() {
    this.setState({
      emailError: { error: false, errorText: "" },
      usernameError: { error: false, errorText: "" },
      passwordError: { error: false, errorText: "" }
    })
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.ui.isSignupDialogOpened}>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent className={style.dialogContent}>
            <TextField 
              helperText={this.state.emailError.errorText} error={this.state.emailError.error} 
              onChange={this.onEmailChange} value={this.state.email} 
              margin="dense" label="Email Address" fullWidth />
            <TextField 
              helperText={this.state.passwordError.errorText} error={this.state.passwordError.error} 
              onChange={this.onPasswordChange} value={this.state.password} 
              margin="dense" label="Password" fullWidth />
            <TextField 
              helperText={this.state.usernameError.errorText} error={this.state.usernameError.error}
              onChange={this.onUsernameChange} value={this.state.username}
              margin="dense" label="Username" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onSubmitClick} variant="contained" color="primary">Submit</Button>
            <Button 
              onClick={this.props.closeDialog} variant="contained" color="secondary">Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({email: event.currentTarget.value});
  }

  onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({password: event.currentTarget.value});
  }

  onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.currentTarget.value });
  }

  onSubmitClick = () => {
    if(this.checkCredentials()) {
      const userId = shortid.generate();
      this.props.signUp({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        id: userId
      });
      this.props.setLoggedUser(userId);
      this.props.closeDialog();
      this.setState({email: "", password: "", username: ""});
      setItemToLocalStorage<string>(LOGGED_USER_KEY, userId);
    }
  }

  checkCredentials = (): boolean => {
    let email = this.checkEmail();
    let password = this.checkPassword();
    let username = this.checkUsername();
    return email && password && username;
  }

  checkEmail = () => {
    const result = validateEmail(this.state.email);
    this.setState({
      emailError: {
        error: !result,
        errorText: result ? "" : "Invalid email address"
      }
    });
    return result;
  }

  checkPassword = () => {
    const result = validatePassword(this.state.password);
    this.setState({
      passwordError: {
        error: !result,
        errorText: result ? "" : "Invalid password(min 6 charachters)"
      }
    });
    return result;
  }

  checkUsername = () => {
    const result = validateUsername(this.state.username);
    this.setState({
      usernameError: {
        error: !result,
        errorText: result ? "" : "Invalid username(min 6 charachters)"
      }
    });
    return result;
  }
}

const mapStateToProps = (rootReducer: any) => {
  return {
    users: rootReducer.users,
    ui: rootReducer.ui
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    signUp: (userData: SignUpData) => dispatch(signUp(userData)),
    setLoggedUser: (userId: string) => dispatch(setLoggedUser(userId)),
    closeDialog: () => dispatch(closeSignupDialog())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);