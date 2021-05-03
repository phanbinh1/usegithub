import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Switch} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import DefaultLayout from './layout/DefaultLayout';

import TodoList from './pages/TodoList';

import history from './util/history';

import myReducer from './redux/reducers/index';

import * as serviceWorker from './serviceWorker';

// import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css'; 

const myStore = createStore(myReducer);
console.log('Log: myStore1', myStore);
console.log('Log: myStore2', myStore.getState());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <Router history={history}>
      <Switch>
          <DefaultLayout exact path="/" component={TodoList} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
