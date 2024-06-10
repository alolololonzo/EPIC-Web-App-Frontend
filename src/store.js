import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import {createLogger} from 'redux-logger'

//Creating a store to combine the actions and reducers together
//Holding the state of the App

const logmiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
      thunkMiddleware,
      logmiddleware
  )
);

export default store;