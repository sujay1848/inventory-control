import * as ACTION_CONSTANTS from "./Constants";

export function scanSkus(payload) {
  return { type: ACTION_CONSTANTS.ADD_SKUS, payload };
}

export function setFixture(payload) {
  return { type: ACTION_CONSTANTS.SCAN_FIXTURE, payload };
}
