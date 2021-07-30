import {
  FETCH_GENERAL,
  FETCH_GENERAL_SUCCESS,
  FETCH_GENERAL_FAILED,
} from '../actions/type';

const initialState = {
  data: {
    cases: 0,
    todayCases: 0,
    deaths: 0,
    todayDeaths: 0,
    recovered: 0,
    todayRecovered: 0,
    critical: 0,
  },
  isFetching: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GENERAL:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_GENERAL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case FETCH_GENERAL_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
