import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import store from './store'
import history from './utils/history'
import * as serviceWorker from './serviceWorker'

import './styles/styles.scss'
import 'react-resizable/css/styles.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <ToastProvider placement="bottom-right">
          <App />
        </ToastProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
