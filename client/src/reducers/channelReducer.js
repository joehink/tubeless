import {
  FETCHING_CHANNEL_VIDEOS,
  FETCH_CHANNEL_VIDEOS_SUCCESS,
  FETCH_CHANNEL_VIDEOS_FAILURE,
  FETCHING_CHANNEL,
  FETCH_CHANNEL_SUCCESS,
  FETCH_CHANNEL_FAILURE,
  CLEAR_CHANNEL
} from "../actions/types";

// Define initial state for channel
const INITIAL_STATE = {
  title: '',
  thumbnail: '',
  loading: true,
  video: {
    loading: true,
    results: [],
    pageToken: ''
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_CHANNEL_VIDEOS:
      // Fetch for channels videos is about to start
      return {
        ...state,
        video: {
          ...state.video,
          loading: true
        }
      };
    case FETCHING_CHANNEL:
      // Fetch for channel data is about to start
      return {
        ...state,
        loading: true
      }
    case FETCH_CHANNEL_VIDEOS_SUCCESS:
      // Fetch for channel videos returned an array
      return {
        ...state,
        video: {
          loading: false,
          results: [...state.video.results, ...action.payload.results],
          pageToken: action.payload.pageToken
        }
      };
    case FETCH_CHANNEL_SUCCESS:
      // Fetch for channel info returned data
      return {
        ...state,
        title: action.payload.title,
        thumbnail: action.payload.thumbnail,
        loading: false
      }
    case FETCH_CHANNEL_VIDEOS_FAILURE:
      // Something went wrong with the request
      return {
        ...state,
        video: {
          ...state.video,
          loading: false
        }
      };
    case FETCH_CHANNEL_FAILURE:
      // Something went wrong with the request
      return {
        ...state,
        loading: false
      }
    case CLEAR_CHANNEL:
      // Reset channel to INITIAL_STATE
      return INITIAL_STATE;
    default:
      return state;
  }
}
