import * as ACTION_CONSTANTS from "./Constants";

const initialState = {
  fixtureId: null,
  startTime: null,
  skuList: []
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
  }
  return state;
}
export default rootReducer;
