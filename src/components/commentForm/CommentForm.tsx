import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from "./css/commentForm.module.css";

class CommentForm extends Component {
  render() {
    return (
      <div className={styles.comment}>
        <TextField
          id="outlined-multiline-static"
          label="Comment as marko977x"
          multiline
          defaultValue=" "
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained">Comment</Button>
      </div>
    );
  }
}

export default CommentForm;