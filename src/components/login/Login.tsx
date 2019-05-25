import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';

class Login extends Component {
  render() {
    return (
      <div>
        <Dialog open={true}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <TextField margin="dense" label="Username" type="username" fullWidth />
            <TextField margin="dense" label="Password" type="password" fullWidth />
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

export default Login;