import {combineReducers} from 'redux';

import generalReducer from './generalReducer';
import countriesReducer from './countriesReducer';
import historyReducer from './historyReducer';

export default combineReducers({
  generalData: generalReducer,
  countriesData: countriesReducer,
  history: historyReducer,
});
