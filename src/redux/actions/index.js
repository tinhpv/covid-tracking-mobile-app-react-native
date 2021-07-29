import disease from '../../apis/disease';

export const fetchGeneralData = () => async dispatch => {
  const response = await disease.get('/all');
  dispatch({type: 'FETCH_GENERAL', payload: response.data});
};

export const fetchAllCountriesData = () => async dispatch => {
  const response = await disease.get('/countries?sort=todayCases');
  dispatch({type: 'FETCH_ALL_COUNTRIES', payload: response.data});
};

export const fetchHistoryData = numOfDays => async dispatch => {
  const response = await disease.get(`/historical/all?lastdays=${numOfDays}`);
  let actionType = 'FETCH_HISTORICAL_DATA_';
  switch (numOfDays) {
    case 'all':
      actionType += 'ALL';
      break;
    case 7:
      actionType += 'ONE_WEEK';
      break;
    case 14:
      actionType += 'TWO_WEEKS';
      break;
    case 30:
      actionType += 'THIRTY_DAYS';
      break;
  }
  dispatch({type: actionType, payload: response.data});
};
