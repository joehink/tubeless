import {
  FETCHING_CHANNEL_VIDEOS,
  FETCH_CHANNEL_VIDEOS_SUCCESS,
  FETCH_CHANNEL_VIDEOS_FAILURE,
  FETCHING_CHANNEL,
  FETCH_CHANNEL_SUCCESS,
  FETCH_CHANNEL_FAILURE,
  CLEAR_CHANNEL
} from "../actions/types";

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
      return {
        ...state,
        video: {
          ...state.video,
          loading: true
        }
      };
    case FETCHING_CHANNEL:
      return {
        ...state,
        loading: true
      }
    case FETCH_CHANNEL_VIDEOS_SUCCESS:
      return {
        ...state,
        video: {
          loading: false,
          results: [...state.video.results, ...action.payload.results],
          pageToken: action.payload.pageToken
        }
      };
    case FETCH_CHANNEL_SUCCESS:
      return {
        ...state,
        title: action.payload.title,
        thumbnail: action.payload.thumbnail,
        loading: false
      }
    case FETCH_CHANNEL_VIDEOS_FAILURE:
      return {
        ...state,
        video: {
          ...state.video,
          loading: false
        }
      };
    case FETCH_CHANNEL_FAILURE:
      return {
        ...state,
        loading: false
      }
    case CLEAR_CHANNEL:
      return INITIAL_STATE;
    default:
      return state;
  }
}
