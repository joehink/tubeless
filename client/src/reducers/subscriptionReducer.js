import {
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILURE
} from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_SUBSCRIPTIONS_SUCCESS:
      // request for subscriptions was successful
      return action.payload;
    case FETCH_SUBSCRIPTIONS_FAILURE:
      // something went wrong with the request
      return false;
    default:
      return state;
  }
}
