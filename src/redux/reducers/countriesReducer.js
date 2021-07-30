import {
  FETCH_ALL_COUNTRIES,
  FETCH_ALL_COUNTRIES_FAILURE,
  FETCH_ALL_COUNTRIES_SUCCESS,
} from '../actions/type';

const initialState = {
  data: [],
  isFetching: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_COUNTRIES:
      return {...state, isFetching: true};
    case FETCH_ALL_COUNTRIES_SUCCESS:
      return {...state, data: action.payload, isFetching: false};
    case FETCH_ALL_COUNTRIES_FAILURE:
      return {...state, error: action.payload, isFetching: false};
    default:
      return state;
  }
};
