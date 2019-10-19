import * as ACTION_CONSTANTS from './Constants';

export function scanCsku(payload) {
    return { type: ACTION_CONSTANTS.ADD_SKU, payload };
}

export function scanFixture(payload) {
    return { type: ACTION_CONSTANTS.SCAN_FIXTURE, payload };
}