import {
  FETCH_VIDEO_SUCCESS,
  FETCH_VIDEO_FAILURE,
  RESET_VIDEO
} from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case RESET_VIDEO:
      return null;
    case FETCH_VIDEO_SUCCESS:
      return action.payload;
    case FETCH_VIDEO_FAILURE:
      return false;
    default:
      return state;
  }
}
