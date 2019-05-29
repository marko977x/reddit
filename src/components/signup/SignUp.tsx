import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@material-ui/core';
import style from "./css/signUp.module.css";
import { NormalizedObjects } from '../../store';
import { UserState } from '../../store/user/types';
import { connect } from 'react-redux';
import { UiState } from '../../store/ui/types';

interface propsFromState {
  users: NormalizedObjects<UserState>,
  ui: NormalizedObjects<UiState>
}

interface IProps {
  isOpen: boolean,
  onCancelClick: () => void
}

type allProps = IProps & propsFromState;

class SignUp extends Component<allProps> {
  render() {
    return (
      <div>
        <Dialog open={this.props.isOpen}>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent className={style.dialogContent}>
            <TextField margin="dense" label="Email Address" type="email" fullWidth />
            <TextField margin="dense" label="Password" type="password" fullWidth />
            <TextField margin="dense" label="Username" type="username" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary">Submit</Button>
            <Button onClick={this.props.onCancelClick} variant="contained" color="secondary">Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (rootReducer: any) => {
  return {
    users: rootReducer.users,
    ui: rootReducer.ui
  }
}

export default connect(mapStateToProps)(SignUp);