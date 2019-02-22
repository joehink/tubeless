import axios from "axios";
import {
  FETCH_VIDEO_SUCCESS,
  FETCH_VIDEO_FAILURE,
  RESET_VIDEO,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from "./types";

export const fetchVideo = (accessToken, videoId) => async dispatch => {
  dispatch({ type: RESET_VIDEO });

  try {
    const videoRes = await axios('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        access_token: accessToken,
        part: "snippet,statistics",
        id: videoId
      }
    })

    const videoObj = videoRes.data.items[0];
    const channelId = videoObj.snippet.channelId;

    const channelRes = await axios('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        access_token: accessToken,
        part: "snippet",
        id: channelId
      }
    })

    const channelObj = channelRes.data.items[0];

    videoObj.snippet.channelThumbnail = channelObj.snippet.thumbnails.default.url

    dispatch({ type: FETCH_VIDEO_SUCCESS, payload: videoObj })

  } catch (error) {
    console.error(error);
    try {
      if (error.response.status === 401) {
        const user = await axios.get("/api/refresh_token");
        dispatch({ type: FETCH_USER_SUCCESS, payload: user.data });
        window.location.reload();
      } else {
        dispatch({ type: FETCH_VIDEO_FAILURE });
      }
    } catch(err) {
      console.error(err);
      dispatch({ type: FETCH_VIDEO_FAILURE });
      dispatch({ type: FETCH_USER_FAILURE });
    }
  }
}
