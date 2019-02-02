import {
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILURE,
  ADD_TEMP_SUBSCRIPTION,
  REMOVE_SUBSCRIPTION
} from "../actions/types";

const INITIAL_STATE = {
  subOrUnsub: false,
  list: [],
  loading: false,
  pageToken: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SUBSCRIPTIONS_SUCCESS:
      // request for subscriptions was successful
      return {
        loading: false,
        list: [...state.list, ...action.payload]
      }
    case FETCH_SUBSCRIPTIONS_FAILURE:
      // something went wrong with the request
      return {
        ...state,
        loading: false
      };
    case ADD_TEMP_SUBSCRIPTION:
      // Add simple channel object to subscriptions list
      return {
          ...state,
          list: [action.payload, ...state.list]
      }
    case REMOVE_SUBSCRIPTION:
      // filter out channel user is unsubscribing from
      return {
        ...state,
        list: state.list.filter(sub => sub.snippet.resourceId.channelId !== action.payload)
      }
    default:
      return state;
  }
}
