import axios from "axios";
import {
  FETCH_VIDEO_SUCCESS,
  FETCH_VIDEO_FAILURE,
  RESET_VIDEO,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from "./types";

export const fetchVideo = (accessToken, videoId) => async dispatch => {
  try {
    // clear existing video info from redux state
    dispatch({ type: RESET_VIDEO });
    // make request to get video info from youtube data api
    const videoRes = await axios('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        access_token: accessToken,
        part: "snippet,statistics",
        id: videoId
      }
    })

    // save video data object to variable
    const videoObj = videoRes.data.items[0];
    // save channel id to variable
    const channelId = videoObj.snippet.channelId;

    // make request to get channel thumbnail image
    const channelRes = await axios('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        access_token: accessToken,
        part: "snippet",
        id: channelId
      }
    })

    // save channel data to vriable
    const channelObj = channelRes.data.items[0];

    // save channel thumbnail image to videoObj
    videoObj.snippet.channelThumbnail = channelObj.snippet.thumbnails.default.url

    // dispatch action to save video data to redux state
    dispatch({ type: FETCH_VIDEO_SUCCESS, payload: videoObj })

  } catch (error) {
    console.error(error);
    // something went wrong with the request
    try {
      // if error status code is 401
      if (error.response.status === 401) {
        // make request to refresh access token
        // fetch returns logged in user with new access token
        const user = await axios.get("/api/refresh_token");
        // save new user object to redux state
        dispatch({ type: FETCH_USER_SUCCESS, payload: user.data });
        // refresh the page
        window.location.reload();
      } else {
        // error code was not 401
        dispatch({ type: FETCH_VIDEO_FAILURE });
      }
    } catch(err) {
      // something went wrong with refresh token request
      console.error(err);
      dispatch({ type: FETCH_USER_FAILURE });
      dispatch({ type: FETCH_VIDEO_FAILURE });
    }
  }
}
