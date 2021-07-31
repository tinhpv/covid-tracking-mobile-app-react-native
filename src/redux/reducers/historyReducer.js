import {
  FETCH_HISTORICAL_DATA,
  FETCH_HISTORICAL_ONE_MONTH_SUCCESS,
  FETCH_HISTORICAL_TWO_WEEKS_SUCCESS,
  FETCH_HISTORICAL_ONE_WEEK_SUCCESS,
  FETCH_HISTORICAL_DATA_FAILURE,
  FETCH_HISTORICAL_COUNTRY_SUCCESS,
} from '../actions/type';

const initialState = {
  data: {
    oneWeek: {},
    twoWeeks: {},
    oneMonth: {},
  },
  error: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HISTORICAL_DATA:
      return {...state, loading: true};
    case FETCH_HISTORICAL_COUNTRY_SUCCESS:
      return {
        ...state,
        data: {...state.data, oneWeek: action.payload},
        loading: false,
      };
    case FETCH_HISTORICAL_ONE_WEEK_SUCCESS:
      return {
        ...state,
        data: {...state.data, oneWeek: action.payload},
        loading: false,
      };
    case FETCH_HISTORICAL_TWO_WEEKS_SUCCESS:
      return {
        ...state,
        data: {...state.data, twoWeeks: action.payload},
        loading: false,
      };
    case FETCH_HISTORICAL_ONE_MONTH_SUCCESS:
      return {
        ...state,
        data: {...state.data, oneMonth: action.payload},
        loading: false,
      };
    case FETCH_HISTORICAL_DATA_FAILURE:
      return {...state, error: action.payload, loading: false};
    default:
      return state;
  }
};
