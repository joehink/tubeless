import {
  FETCH_VIDEO_SEARCH_SUCCESS,
  FETCH_VIDEO_SEARCH_FAILURE,
  FETCH_CHANNEL_SEARCH_SUCCESS,
  FETCH_CHANNEL_SEARCH_FAILURE
} from "../actions/types";

const INITIAL_STATE = {
    loading: false,
    results: null,
    pageToken: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_VIDEO_SEARCH_SUCCESS:
      return;
    case FETCH_VIDEO_SEARCH_FAILURE:
      return;
    default:
      return state;
  }
}
