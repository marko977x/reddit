import React, { Component } from 'react';
import Routes from './Routes';
import { UiState } from './store/ui/types';
import { connect } from 'react-redux';
import Header from './components/header/Header';

interface PropsFromState {
  ui: UiState
}

class App extends Component<PropsFromState> {
  render() {
    return (
      <div className="App">
        <Header isLoggedUser={this.props.ui.loggedUser.id === "" ? false : true}></Header>
        <Routes></Routes>
      </div>
    );
  }
}

const mapStateToProps = (rootReducer: any) => {
  return {
    ui: rootReducer.ui
  }
}

export default connect(mapStateToProps)(App);
