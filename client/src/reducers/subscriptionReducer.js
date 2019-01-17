import {
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILURE
} from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_SUBSCRIPTIONS_SUCCESS:
      return action.payload;
    case FETCH_SUBSCRIPTIONS_FAILURE:
      return false;
    default:
      return state;
  }
}
