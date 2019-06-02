import React, { Component, ChangeEvent } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { Error, UserState } from '../../store/user/types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setLoggedUser, closeLoginDialog } from '../../store/ui/action';
import { NormalizedObjects } from '../../store';
import { getUserByEmail } from '../../services/auth';
import { setItemToLocalStorage, LOGGED_USER_KEY } from '../../services/local-storage';

interface IState {
  email: string,
  password: string,
  emailError: Error,
  passwordError: Error
}

interface propsFromState {
  users: NormalizedObjects<UserState>,
  isOpen: boolean
}

interface propsFromDispatch {
  setLoggedUser: typeof setLoggedUser,
  closeDialog: typeof closeLoginDialog
}

type allProps = propsFromDispatch & propsFromState;

class Login extends Component<allProps, IState> {
  readonly state = {
    email: "",
    password: "",
    emailError: { error: false, errorText: "" },
    passwordError: { error: false, errorText: "" }
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.isOpen}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <TextField 
              helperText={this.state.emailError.errorText} error={this.state.emailError.error}
              onChange={this.onEmailChange} value={this.state.email}
              margin="dense" label="Email" type="email" fullWidth />
            <TextField 
              helperText={this.state.passwordError.errorText} error={this.state.passwordError.error}
              onChange={this.onPasswordChange} value={this.state.password} 
              margin="dense" label="Password" type="password" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onSubmitClick} variant="contained" color="primary">Submit</Button>
            <Button onClick={this.props.closeDialog} variant="contained" color="secondary">Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.currentTarget.value });
  }

  onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.currentTarget.value });
  }

  onSubmitClick = () => {
    let user = getUserByEmail(this.props.users, this.state.email);
    if(user != null) {
      if(user.password === this.state.password) {
        this.props.setLoggedUser(user.id);
        this.props.closeDialog();
        this.setState({email: "", password: ""});
        setItemToLocalStorage<string>(LOGGED_USER_KEY, user.id);
      }
      else {
        this.setState({
          passwordError: {error: true, errorText: "Invalid password"},
          emailError: {error: false, errorText: ""}
        });
      }
    }
    else {
      this.setState({
        emailError:
          { error: true, errorText: "Invalid email" }
      });
    }
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setLoggedUser: (userId: string) => dispatch(setLoggedUser(userId)),
    closeDialog: () => dispatch(closeLoginDialog())
  }
}

const mapStateToProps = (rootReducer: any) => {
  return {
    users: rootReducer.users,
    isOpen: rootReducer.ui.isLoginDialogOpened
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);