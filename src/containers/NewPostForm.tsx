import React, { Component } from 'react';
import Header from '../components/header/Header';
import { Card, CardContent, TextField, Select, MenuItem, FormControl, Button, InputLabel, OutlinedInput } from '@material-ui/core';
import styles from "./css/newPostForm.module.css";
import { connect } from 'react-redux';

interface stateToProps {
  topics: string[]
}

class NewPostForm extends Component<stateToProps> {
  render() {
    return (
      <div>
        <Header isLoggedUser={false}></Header>
        <div className={styles.cardContainer}>
        <Card className={styles.card}>
          <CardContent>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Topic</InputLabel>
              <Select value={"Value"} input={<OutlinedInput labelWidth={50}/>}>
                {this.props.topics.map((topic, index) => {
                  return(<MenuItem key={index}>{topic}</MenuItem>);
                })}
              </Select>
            </FormControl>
            <TextField
              id="outlined-multiline-static" rows={5}
              placeholder={"Enter you post here"}
              multiline fullWidth margin="normal" variant="outlined"/>
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

const mapStateToProps = (rootReducer: any) => {
  return {
    topics: rootReducer.ui.topics
  }
}

export default connect(mapStateToProps)(NewPostForm);