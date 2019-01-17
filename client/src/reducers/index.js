import { combineReducers } from "redux";
import authReducer from "./authReducer";
import subscriptionReducer from "./subscriptionReducer.js";
import searchReducer from "./searchReducer.js";

export default combineReducers({
  auth: authReducer,
  subscriptions: subscriptionReducer,
  search: searchReducer
})
