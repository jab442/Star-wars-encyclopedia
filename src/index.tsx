import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import IPerson from './IPerson';
import {observable,action,computed} from 'mobx';
import {observer} from 'mobx-react';
import State from './State'

const appState = new State();
ReactDOM.render(<App appState={appState}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
