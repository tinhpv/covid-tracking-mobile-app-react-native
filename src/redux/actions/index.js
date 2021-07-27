import disease from '../../apis/disease';

export const fetchGeneralData = () => async dispatch => {
  const response = await disease.get('/all');
  dispatch({type: 'FETCH_GENERAL', payload: response.data});
};

export const fetchAllCountriesData = () => async dispatch => {
  const response = await disease.get('/countries?sort=cases');
  dispatch({type: 'FETCH_ALL_COUNTRIES', payload: response.data});
};
