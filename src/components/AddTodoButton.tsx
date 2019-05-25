import React, { Component, FormEvent } from 'react';
import { addTodo } from '../store/todos/action';
import * as ui from "@material-ui/core";

interface IProps {
  addTodo: typeof addTodo
}

interface IState {
  title: string
}

class AddTodoButton extends Component<IProps, IState> {
  readonly state = {
    title: ""
  };

  render() {
    return (
      <div>
        <ui.Button
          variant="raised" color="primary"
          onClick={() => this.props.addTodo(this.state.title)} >
          Add Todo</ui.Button>
        <input value={this.state.title} onChange={this.onTextChange} type="text" />
      </div>
    );
  }

  onTextChange = (event: FormEvent<HTMLInputElement>) => {
    this.setState({ title: event.currentTarget.value })
  }

}

export default AddTodoButton;