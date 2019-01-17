import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCHING_SUBSCRIPTIONS,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILURE
} from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      // If logged in, return user data
      // Otherwise return false
      return action.payload || false;
    case FETCH_USER_FAILURE:
      // Something went wrong with request
      // Return boolean false
      return false;
    case FETCHING_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: null
      };
    case FETCH_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptions: action.payload
      };
    case FETCH_SUBSCRIPTIONS_FAILURE:
      return {
        ...state,
        subscriptions: false
      };
    default:
      return state;
  }
}
