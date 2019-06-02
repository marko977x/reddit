import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';
import { Provider } from 'react-redux';
import App from './App';
import React, { Component } from 'react';
import { fetchData } from './store/app/action';

const store = configureStore();

class Root extends Component {
  render() {
    store.dispatch(fetchData());
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
