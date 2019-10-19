import * as ACTION_CONSTANTS from './Constants'

const initialState = {
    fixtureId: null, startTime: null, skuList: []
};
function rootReducer(state = initialState, action) {
    if (action.type === ACTION_CONSTANTS.ADD_SKU) {
        return Object.assign({}, state, {
            skuList: state.skuList.concat(action.payload).skuId
          });
    } else if (action.type === ACTION_CONSTANTS.SCAN_FIXTURE) {
        return Object.assign({}, state, {
            fixtureId: action.payload.fixtureId
          });
    }
    return state;
};
export default rootReducer;



