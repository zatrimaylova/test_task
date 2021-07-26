import { createStore, compose } from 'redux';

import { initialState } from './initialState';
import reducer from './rootReducer';

const reduxDevtoolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__; 

const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  enhancers.push(reduxDevtoolsExtension());
};

const composedEnhacers = compose(
  ...enhancers,
);

export default createStore(
  reducer,
  initialState,
  composedEnhacers
);