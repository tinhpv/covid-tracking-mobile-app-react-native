const initialState = {
  oneWeek: {},
  twoWeeks: {},
  oneMonth: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_HISTORICAL_DATA_ALL':
      return {...state, all: action.payload};
    case 'FETCH_HISTORICAL_DATA_ONE_WEEK':
      return {...state, oneWeek: action.payload};
    case 'FETCH_HISTORICAL_DATA_TWO_WEEKS':
      return {...state, twoWeeks: action.payload};
    case 'FETCH_HISTORICAL_DATA_THIRTY_DAYS':
      return {...state, oneMonth: action.payload};
    default:
      return state;
  }
};
