import {
  FETCH_COUNTRY_DATA,
  FETCH_COUNTRY_DATA_FAILED,
  FETCH_COUNTRY_DATA_SUCCESS,
  FETCH_VACCINE_COUNTRY_SUCCESS,
} from '../actions/type';

const initialState = {
  data: {
    general: {
      cases: 0,
      todayCases: 0,
      deaths: 0,
      todayDeaths: 0,
      recovered: 0,
      todayRecovered: 0,
      critical: 0,
      population: 0,
    },
    vaccination: {
      '1/01/21': 0,
    },
  },
  isFetching: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRY_DATA:
      return {...state, isFetching: true};
    case FETCH_COUNTRY_DATA_SUCCESS:
      return {
        ...state,
        data: {...state.data, general: action.payload},
        isFetching: false,
      };
    case FETCH_VACCINE_COUNTRY_SUCCESS:
      return {
        ...state,
        data: {...state.data, vaccination: action.payload},
        isFetching: false,
      };
    case FETCH_COUNTRY_DATA_FAILED:
      return {...state, error: action.payload, isFetching: false};
    default:
      return state;
  }
};
