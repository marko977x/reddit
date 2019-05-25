import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addTodo, deleteTodo, markComplete } from '../store/todos/action';
import { TodosState } from '../store/todos/types';
import { AppState } from '../store';
import Todo from '../components/Todo';
import AddTodoButton from '../components/AddTodoButton';

interface PropsFromState {
  todosState: TodosState
}

interface PropsFromDispatch {
  addTodo: typeof addTodo,
  deleteTodo: typeof deleteTodo,
  markComplete: typeof markComplete,
}

type AllProps = PropsFromDispatch & PropsFromState;

class Todos extends Component<AllProps> {
  render() {
    return (
      <div>
        <AddTodoButton addTodo={this.props.addTodo} />
        {this.props.todosState.todos.map(todo => {
          return (
            <Todo
              title={todo.title}
              completed={todo.completed}
              key={todo.id} />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (appState: AppState) => {
  return {
    todosState: appState.todosState
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addTodo: (title: string) => dispatch(addTodo(title)),
    deleteTodo: (id: number) => dispatch(deleteTodo(id)),
    markComplete: (id: number) => dispatch(markComplete(id))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Todos);