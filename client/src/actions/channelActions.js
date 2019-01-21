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
          order: "date",
          channelId,
          pageToken
        }
      });

      // create array of IDs of videos from search request
      const videoIds = searchRes.data.items.map(video => {
        return video.id.videoId;
      })

      // save token for next page of search results
      const nextPageToken = searchRes.data.nextPageToken;

      /*=====================================================
      search request does not return number of views per video
      so another request must be made for each video
      provide array of IDs to return all videos from search in one request
      ===================================================================*/
      const videoRes = await axios('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          access_token: accessToken,
          part: "snippet,statistics",
          id: videoIds.toString()
        }
      })

      dispatch({
        type: FETCH_CHANNEL_VIDEOS_SUCCESS,
        payload: {
          results: videoRes.data.items,
          pageToken: nextPageToken
        }
      })

    } catch (error) {
      console.error(error);
      dispatch({ type: FETCH_CHANNEL_VIDEOS_FAILURE });
    }
  }
}
