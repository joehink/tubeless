import {
  FETCH_VIDEO_SEARCH_SUCCESS,
  FETCH_VIDEO_SEARCH_FAILURE,
  FETCH_CHANNEL_SEARCH_SUCCESS,
  FETCH_CHANNEL_SEARCH_FAILURE
} from "../actions/types";

const INITIAL_STATE = {
  video: {
    results: null,
    pageToken: ''
  },
  channel: {
    results: null,
    pageToken: ''
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_VIDEO_SEARCH_SUCCESS:
      return {
        ...state,
        video: {
          results: action.payload.results,
          pageToken: action.payload.pageToken
        }
      };
    case FETCH_VIDEO_SEARCH_FAILURE:
      return {
        ...state,
        video: {
          results: false,
          pageToken: ''
        }
      }
    default:
      return state;
  }
}
