import axios from "axios";
import {
  FETCHING_CHANNEL_VIDEOS,
  FETCH_CHANNEL_VIDEOS_SUCCESS,
  FETCH_CHANNEL_VIDEOS_FAILURE,
  FETCHING_CHANNEL,
  FETCH_CHANNEL_SUCCESS,
  FETCH_CHANNEL_FAILURE,
  CLEAR_CHANNEL,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from "../actions/types";

export const fetchChannel = (accessToken, channelId) => {
  return async dispatch => {
    try {
      // request for channel is about to begin
      dispatch({ type: FETCHING_CHANNEL });

      // request channel data
      const res = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          access_token: accessToken,
          part: "snippet",
          id: channelId
        }
      });

      // Destructure snippet from res
      const { snippet } = res.data.items[0];

      // request returned channel data
      // dispatch action with thumbnail and title
      dispatch({
        type: FETCH_CHANNEL_SUCCESS,
        payload: {
          id: res.data.items[0].id,
          thumbnail: snippet.thumbnails.default.url,
          title: snippet.title
        }
      });

    } catch (error) {
      console.error(error);
      dispatch({ type: FETCH_CHANNEL_FAILURE });
      // Something went wrong with the request
    }
  }
}

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
          maxResults: 48,
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
          part: "snippet,statistics,contentDetails",
          id: videoIds.toString()
        }
      })

      // video res returns array of videos
      dispatch({
        type: FETCH_CHANNEL_VIDEOS_SUCCESS,
        payload: {
          results: videoRes.data.items,
          pageToken: nextPageToken
        }
      })

    } catch (error) {
      console.error(error);
      // something went wrong with the request
      try {
        if (error.response.status === 401) {
          const user = await axios.get("/api/refresh_token");
          dispatch({ type: FETCH_USER_SUCCESS, payload: user.data });
          window.location.reload();
        } else {
          dispatch({ type: FETCH_CHANNEL_VIDEOS_FAILURE });
        }
      } catch(err) {
        console.error(err);
        dispatch({ type: FETCH_USER_FAILURE });
        dispatch({ type: FETCH_CHANNEL_VIDEOS_FAILURE });
      }
    }
  }
}

export const clearChannel = () => {
  // reset channel state to default
  return { type: CLEAR_CHANNEL };
};
