import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      // Return user data
      return action.payload || false;
    case FETCH_USER_FAILURE:
      // Return boolean false
      return false;
    default:
      return state;
  }
}
