import axios from "axios";
import {
  FETCHING_CHANNEL_VIDEOS,
  FETCH_CHANNEL_VIDEOS_SUCCESS,
  FETCH_CHANNEL_VIDEOS_FAILURE
} from "../actions/types";

export const fetchChannelVideos = (accessToken, channelId, pageToken = '') => {
  return async dispatch => {
    try {
      // search request for channel videos is about to begin
      dispatch({ type: FETCHING_CHANNEL_VIDEOS });

      /*===================================================
      Make search request for 25 videos
      if pageToken is blank (it will be on first request for new searchTerm)
      API will still return first page of results
      pageToken will be given value after first request
      and subsequent requests will return next page of results
      ===================================================*/
      const searchRes = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          access_token: accessToken,
          part: "snippet",
          type: "video",
          maxResults: 25,
          channelId,
          pageToken
        }
      });

      console.log(searchRes);
    } catch (error) {
      console.error(error);
      dispatch({ type: FETCH_CHANNEL_VIDEOS_FAILURE });
    }
  }
}
