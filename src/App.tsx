import React, { Component } from 'react';
import { UiState } from './store/ui/types';
import { connect } from 'react-redux';
import Routes from './Routes';

interface PropsFromState {
  ui: UiState
}

class App extends Component<PropsFromState> {
  render() {
    return (
      <div className="App">
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
