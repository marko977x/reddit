import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@material-ui/core';

class SignUp extends Component {
  render() {
    return (
      <div>
        <Dialog open={true}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <TextField margin="dense" label="Email Address" type="email" fullWidth />
            <TextField margin="dense" label="Password" type="password" fullWidth />
            <TextField margin="dense" label="Username" type="username" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary">Submit</Button>
            <Button variant="contained" color="secondary">Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default SignUp;