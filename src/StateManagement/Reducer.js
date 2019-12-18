import * as ACTION_CONSTANTS from "./Constants";

const initialState = {
  fixtureId: null,
  userId: null,
  skuList: [],
  startTime: null
};
function rootReducer(state = initialState, action) {
  if (action.type === ACTION_CONSTANTS.ADD_SKUS) {
    return Object.assign({}, state, {
      skuCountList: action.payload.skuCountList
    });
  } else if (action.type === ACTION_CONSTANTS.SCAN_FIXTURE) {
    return Object.assign({}, state, {
      fixtureId: action.payload.fixtureId
    });
  } else if (action.type === ACTION_CONSTANTS.SET_USER_ID) {
    return Object.assign({}, state, {
      userId: action.payload.userId
    });
  }
  return state;
}
export default rootReducer;
