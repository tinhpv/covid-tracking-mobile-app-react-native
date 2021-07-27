import {combineReducers} from 'redux';
import generalReducer from './generalReducer';
import countriesReducer from './countriesReducer';

export default combineReducers({
  generalData: generalReducer,
  countriesData: countriesReducer,
});
