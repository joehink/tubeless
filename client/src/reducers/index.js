import { combineReducers } from "redux";
import authReducer from "./authReducer";
import subscriptionReducer from "./subscriptionReducer";
import searchReducer from "./searchReducer";
import channelReducer from "./channelReducer";
import videoReducer from "./videoReducer";
import sideBarReducer from "./sideBarReducer";

export default combineReducers({
  auth: authReducer,
  subscriptions: subscriptionReducer,
  search: searchReducer,
  channel: channelReducer,
  video: videoReducer,
  sidebar: sideBarReducer
})
