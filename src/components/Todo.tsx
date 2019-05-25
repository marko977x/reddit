import React, { Component } from 'react';

interface IProps {
  title: string,
  completed: boolean
}

interface IState {

}

class Todo extends Component<IProps, IState> {
  render() {
    return (
      <div>
        <p>{this.props.title}</p>
      </div>
    );
  }
}

export default Todo;