import {
  SEARCHING_FOR_VIDEOS,
  FETCH_VIDEO_SEARCH_SUCCESS,
  FETCH_VIDEO_SEARCH_FAILURE,
  SEARCHING_FOR_CHANNELS,
  FETCH_CHANNEL_SEARCH_SUCCESS,
  FETCH_CHANNEL_SEARCH_FAILURE,
  CLEAR_SEARCH_RESULTS
} from "../actions/types";

const INITIAL_STATE = {
    loading: true,
    results: [],
    pageToken: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCHING_FOR_VIDEOS:
      return {
        ...state,
        loading: true
      };
    case FETCH_VIDEO_SEARCH_SUCCESS:
      return {
        loading: false,
        results: [...state.results, ...action.payload]
      };
    case FETCH_VIDEO_SEARCH_FAILURE:
      return {
        ...state,
        loading: false
      };
    case CLEAR_SEARCH_RESULTS:
      return INITIAL_STATE;
    default:
      return state;
  }
}
