import { combineReducers } from "redux";
import authReducer from "./authReducer";
import subscriptionReducer from "./subscriptionReducer.js"

export default combineReducers({
  auth: authReducer,
  subscriptions: subscriptionReducer
})
