import React, { Component } from 'react';
import Header from '../components/header/Header';
import { Card, CardContent, TextField, Select, MenuItem, FormControl, Button, InputLabel, OutlinedInput } from '@material-ui/core';
import styles from "./css/newPostForm.module.css";

class NewPostForm extends Component {
  render() {
    return (
      <div>
        <Header isLoggedUser={false}></Header>
        <div className={styles.cardContainer}>
        <Card className={styles.card}>
          <CardContent>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Topic</InputLabel>
              <Select
                value={"Value"}
                input={<OutlinedInput labelWidth={50}/>}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-multiline-static" rows={5}
              placeholder={"Enter you post here"}
              multiline fullWidth margin="normal" variant="outlined"
            />
            <div className={styles.submitButton}>
              <Button variant="contained" color={"primary"}>Submit</Button>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    );
  }
}

export default NewPostForm;