import { createStore } from "redux";
import rootReducer from "./Reducer.js";

const store = createStore(rootReducer);

export default store;