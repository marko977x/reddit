import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@material-ui/core';
import style from "./css/signUp.module.css";

interface IProps {
  isOpen: boolean,
  onCancelClick: () => void
}

class SignUp extends Component<IProps> {
render() {
    return (
      <div>
        <Dialog open={this.props.isOpen}>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent className={style.dialogContent}>
            <TextField margin="dense" label="Email Address" type="email" fullWidth/>
            <TextField margin="dense" label="Password" type="password" fullWidth/>
            <TextField margin="dense" label="Username" type="username" fullWidth/>
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

export default SignUp;