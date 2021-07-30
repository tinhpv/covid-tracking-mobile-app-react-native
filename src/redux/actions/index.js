import disease from '../../apis/disease';
import {
  FETCH_GENERAL,
  FETCH_GENERAL_SUCCESS,
  FETCH_GENERAL_FAILED,
  FETCH_ALL_COUNTRIES,
  FETCH_ALL_COUNTRIES_SUCCESS,
  FETCH_ALL_COUNTRIES_FAILURE,
  FETCH_HISTORICAL_DATA,
  FETCH_HISTORICAL_DATA_FAILURE,
  FETCH_HISTORICAL_ONE_WEEK_SUCCESS,
  FETCH_HISTORICAL_TWO_WEEKS_SUCCESS,
  FETCH_HISTORICAL_ONE_MONTH_SUCCESS,
} from './type';

export const fetchGeneralData = () => async dispatch => {
  dispatch({type: FETCH_GENERAL});
  try {
    const response = await disease.get('/all');
    dispatch({type: FETCH_GENERAL_SUCCESS, payload: response.data});
  } catch (error) {
    dispatch({type: FETCH_GENERAL_FAILED, payload: error});
  }
};

export const fetchAllCountriesData = () => async dispatch => {
  dispatch({type: FETCH_ALL_COUNTRIES});
  try {
    const response = await disease.get('/countries?sort=todayCases');
    dispatch({type: FETCH_ALL_COUNTRIES_SUCCESS, payload: response.data});
  } catch (error) {
    dispatch({type: FETCH_ALL_COUNTRIES_FAILURE, payload: error});
  }
};

export const fetchHistoryData = numOfDays => async dispatch => {
  dispatch({type: FETCH_HISTORICAL_DATA});
  try {
    const response = await disease.get(`/historical/all?lastdays=${numOfDays}`);
    let actionType;
    switch (numOfDays) {
      case 7:
        actionType = FETCH_HISTORICAL_ONE_WEEK_SUCCESS;
        break;
      case 14:
        actionType = FETCH_HISTORICAL_TWO_WEEKS_SUCCESS;
        break;
      case 30:
        actionType = FETCH_HISTORICAL_ONE_MONTH_SUCCESS;
        break;
    }
    dispatch({type: actionType, payload: response.data});
  } catch (error) {
    dispatch({type: FETCH_HISTORICAL_DATA_FAILURE, payload: error});
  }
};
