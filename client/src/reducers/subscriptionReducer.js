import {
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILURE,
  ADD_TEMP_SUBSCRIPTION,
  TEMP_REMOVE_SUBSCRIPTION,
  START_SUB_ACTION,
  ADD_SUBSCRIPTION_SUCCESS,
  ADD_SUBSCRIPTION_FAILURE,
  REMOVE_SUBSCRIPTION_SUCCESS,
  REMOVE_SUBSCRIPTION_FAILURE
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
    case START_SUB_ACTION:
      return {
        ...state,
        subOrUnsub: true
      }
    case ADD_TEMP_SUBSCRIPTION:
      // Add simple channel object to subscriptions list
      return {
          ...state,
          list: [action.payload, ...state.list]
      }
    case TEMP_REMOVE_SUBSCRIPTION:
      // filter out channel user is unsubscribing from
      return {
        ...state,
        list: state.list.filter(sub => sub.snippet.resourceId.channelId !== action.payload)
      }
    case ADD_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subOrUnsub: false,
      }
    case ADD_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        subOrUnsub: false,
        list: state.list.filter(sub => sub.snippet.resourceId.channelId !== action.payload)
      }
    case REMOVE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subOrUnsub: false
      }
    case REMOVE_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        subOrUnsub: false,
        list: [action.payload, ...state.list]
      }
    default:
      return state;
  }
}
