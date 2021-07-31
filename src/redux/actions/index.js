import disease from '../../apis/disease';
import {
  FETCH_GENERAL,
  FETCH_GENERAL_SUCCESS,
  FETCH_GENERAL_FAILED,
  FETCH_ALL_COUNTRIES,
  FETCH_ALL_COUNTRIES_SUCCESS,
  FETCH_ALL_COUNTRIES_FAILURE,
  FETCH_HISTORICAL_DATA,
  FETCH_HISTORICAL_COUNTRY_SUCCESS,
  FETCH_HISTORICAL_DATA_FAILURE,
  FETCH_HISTORICAL_ONE_WEEK_SUCCESS,
  FETCH_HISTORICAL_TWO_WEEKS_SUCCESS,
  FETCH_HISTORICAL_ONE_MONTH_SUCCESS,
  FETCH_COUNTRY_DATA_FAILED,
  FETCH_COUNTRY_DATA_SUCCESS,
  FETCH_COUNTRY_DATA,
  FETCH_VACCINE_COUNTRY_SUCCESS,
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

export const fetchCountryHistoryData = countryName => async dispatch => {
  dispatch({type: FETCH_HISTORICAL_DATA});
  try {
    const response = await disease.get(`/historical/${countryName}?lastdays=8`);
    dispatch({
      type: FETCH_HISTORICAL_COUNTRY_SUCCESS,
      payload: response.data.timeline,
    });
  } catch (error) {
    dispatch({type: FETCH_HISTORICAL_DATA_FAILURE, payload: error});
  }
};

export const fetchCountry = countryName => async dispatch => {
  dispatch({type: FETCH_COUNTRY_DATA});
  try {
    const response = await disease.get(`/countries/${countryName}?strict=true`);
    dispatch({type: FETCH_COUNTRY_DATA_SUCCESS, payload: response.data});
  } catch (error) {
    dispatch({type: FETCH_COUNTRY_DATA_FAILED, payload: error});
  }
};

export const fetchCountryVaccineInfo = countryName => async dispatch => {
  dispatch({type: FETCH_COUNTRY_DATA});
  try {
    const response = await disease.get(
      `/vaccine/coverage/countries/${countryName}?lastdays=1&fullData=false`,
    );
    dispatch({
      type: FETCH_VACCINE_COUNTRY_SUCCESS,
      payload: response.data.timeline,
    });
  } catch (error) {
    dispatch({type: FETCH_COUNTRY_DATA_FAILED, payload: error});
  }
};
