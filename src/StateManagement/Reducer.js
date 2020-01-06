import * as ACTION_CONSTANTS from "./Constants";
import { FIXTURE_ID, SKU_COUNT_LIST } from "../LocalStorage";

const initialState = {
  fixtureId: localStorage.getItem(FIXTURE_ID),
  skuCountList:
    localStorage.getItem(SKU_COUNT_LIST) === null
      ? {}
      : JSON.parse(localStorage.getItem(SKU_COUNT_LIST))
};
function rootReducer(state = initialState, action) {
  if (action.type === ACTION_CONSTANTS.ADD_SKUS) {
    if (Object.entries(action.payload.skuCountList).length === 0) {
      localStorage.removeItem(SKU_COUNT_LIST);
    } else {
      localStorage.setItem(
        SKU_COUNT_LIST,
        JSON.stringify(action.payload.skuCountList)
      );
    }
    return Object.assign({}, state, {
      skuCountList: action.payload.skuCountList
    });
  } else if (action.type === ACTION_CONSTANTS.SCAN_FIXTURE) {
    if (action.payload.fixtureId === null) {
      localStorage.removeItem(FIXTURE_ID);
    } else {
      localStorage.setItem(FIXTURE_ID, action.payload.fixtureId);
    }
    return Object.assign({}, state, {
      fixtureId: action.payload.fixtureId
    });
  }
  return state;
}
export default rootReducer;
