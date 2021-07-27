export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_GENERAL':
      return action.payload;
    default:
      return state;
  }
};
