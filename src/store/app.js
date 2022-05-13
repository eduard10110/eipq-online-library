import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import appReducer from "./reducers/app";
import userInfoReducer from "./reducers/userInfo";

const reducers = combineReducers({
  app: appReducer,
  userInfo: userInfoReducer,
});
const middleware = composeWithDevTools();
const store = createStore(reducers, middleware);

export default store;
