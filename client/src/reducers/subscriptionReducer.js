import {
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILURE,
  ADD_TEMP_SUBSCRIPTION,
  REMOVE_SUBSCRIPTION
} from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_SUBSCRIPTIONS_SUCCESS:
      // request for subscriptions was successful
      return action.payload;
    case FETCH_SUBSCRIPTIONS_FAILURE:
      // something went wrong with the request
      return false;
    case ADD_TEMP_SUBSCRIPTION:
      // Add simple channel object to subscriptions list
      return [action.payload, ...state];
    case REMOVE_SUBSCRIPTION:
      // filter out channel user is unsubscribing from
      return state.filter(sub => sub.snippet.resourceId.channelId !== action.payload );
    default:
      return state;
  }
}
