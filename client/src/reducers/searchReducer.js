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
  video: {
    loading: true,
    results: [],
    pageToken: ''
  },
  channel: {
    loading: true,
    results: [],
    pageToken: ''
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCHING_FOR_VIDEOS:
      // video search just started
      return {
        ...state,
        video: {
          ...state.video,
          loading: true
        }
      };
    case SEARCHING_FOR_CHANNELS:
      // channel search just started
      return {
        ...state,
        channel: {
          ...state.channel,
          loading: true
        }
      };
    case FETCH_VIDEO_SEARCH_SUCCESS:
      // video search request returned results
      return {
        ...state,
        video: {
          loading: false,
          results: [...state.video.results, ...action.payload.results],
          pageToken: action.payload.pageToken
        }
      };
    case FETCH_CHANNEL_SEARCH_SUCCESS:
      // channel search request returned results
      return {
        ...state,
        channel: {
          loading: false,
          results: [...state.channel.results, ...action.payload.results],
          pageToken: action.payload.pageToken
        }
      };
    case FETCH_VIDEO_SEARCH_FAILURE:
      // Something went wrong with request
      return {
        ...state,
        video: {
          ...state.video,
          loading: false
        }
      };
    case FETCH_CHANNEL_SEARCH_FAILURE:
      // Something went wrong with request
      return {
        ...state,
        channel: {
          ...state.channel,
          loading: false
        }
      };
    case CLEAR_SEARCH_RESULTS:
      // return search state to the INITIAL_STATE
      return INITIAL_STATE;
    default:
      return state;
  }
}
