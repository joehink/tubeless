import axios from "axios";
import {
  FETCH_VIDEO_SUCCESS,
  FETCH_VIDEO_FAILURE,
  RESET_VIDEO
} from "./types";

export const fetchVideo = (accessToken, videoId) => async dispatch => {
  dispatch({ type: RESET_VIDEO });

  try {
    const res = await axios('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        access_token: accessToken,
        part: "snippet,statistics",
        id: videoId
      }
    })

    dispatch({ type: FETCH_VIDEO_SUCCESS, payload: res.data.items[0] })

  } catch (err) {
    console.error(err);
    dispatch({ type: FETCH_VIDEO_FAILURE })
  }
}
