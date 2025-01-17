import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { rootReducer } from "./reducers/index";

const middleWare = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleWare);

export default store;
