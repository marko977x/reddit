import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';

interface IProps {
  isOpen: boolean,
  onCancelClick: () => void
}

class Login extends Component<IProps> {
  render() {
    return (
      <div>
        <Dialog open={this.props.isOpen}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <TextField margin="dense" label="Username" type="username" fullWidth />
            <TextField margin="dense" label="Password" type="password" fullWidth />
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

export default Login;