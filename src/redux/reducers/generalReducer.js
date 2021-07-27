const initialState = {
  cases: 0,
  todayCases: 0,
  deaths: 0,
  todayDeaths: 0,
  recovered: 0,
  todayRecovered: 0,
  critical: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_GENERAL':
      return action.payload;
    default:
      return state;
  }
};
