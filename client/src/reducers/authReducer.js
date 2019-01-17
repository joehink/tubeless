import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
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
    default:
      return state;
  }
}
