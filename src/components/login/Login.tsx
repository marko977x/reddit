import React, { Component, ChangeEvent } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { Error, UserState } from '../../store/user/types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setLoggedUser } from '../../store/ui/action';
import { NormalizedObjects } from '../../store';

interface IProps {
  isOpen: boolean,
  closeDialog: () => void
}

interface IState {
  email: string,
  password: string,
  emailError: Error,
  passwordError: Error
}

interface propsFromState {
  users: NormalizedObjects<UserState>
}

interface propsFromDispatch {
  setLoggedUser: typeof setLoggedUser
}

type allProps = IProps & propsFromDispatch & propsFromState;

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
    let result: string = this.getUserId();
    console.log(result);
    if(result !== "") {
      this.props.setLoggedUser(result);
      this.props.closeDialog();
    }
  }

  getUserId = (): string => {
    const users = this.props.users;
    let result = "";
    for(let index = 0; index < users.allIds.length; index++) {
      const id = users.allIds[index];
      if (users.byId[id].email === this.state.email){
        this.setState({emailError: {error: false, errorText: ""}});
        if (users.byId[id].password !== this.state.password){
          this.setState({passwordError: {error: true, errorText: "Invalid password"}});
          return "";
        } 
        else return id;
      }
    };
    this.setState({emailError: {error: true, errorText: "Invalid email"}});
    return result;
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setLoggedUser: (id: string) => dispatch(setLoggedUser(id))
  }
}

const mapStateToProps = (rootReducer: any) => {
  return {
    users: rootReducer.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);