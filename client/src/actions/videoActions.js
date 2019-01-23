import axios from "axios";
import {
  FETCH_VIDEO_SUCCESS,
  FETCH_VIDEO_FAILURE,
  RESET_VIDEO
} from "./types";

export const fetchVideo = (accessToken, videoId) => async dispatch => {
  dispatch({ type: RESET_VIDEO });

  const res = await axios('https://www.googleapis.com/youtube/v3/videos', {
    params: {
      access_token: accessToken,
      part: "snippet,statistics",
      id: videoId
    }
  })

  console.log(res);
}
