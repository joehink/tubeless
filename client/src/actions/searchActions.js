import axios from "axios";
import {
  SEARCHING_FOR_VIDEOS,
  FETCH_VIDEO_SEARCH_SUCCESS,
  FETCH_VIDEO_SEARCH_FAILURE,
  SEARCHING_FOR_CHANNELS,
  FETCH_CHANNEL_SEARCH_SUCCESS,
  FETCH_CHANNEL_SEARCH_FAILURE,
  CLEAR_SEARCH_RESULTS,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from "./types";

export const searchVideos = (accessToken, searchTerm, pageToken = '') => {
  return async dispatch => {
    try {
      // search request is about to begin
      dispatch({ type: SEARCHING_FOR_VIDEOS });

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
          q: searchTerm,
          pageToken: pageToken
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

      // video request returned array of videos
      dispatch({ type: FETCH_VIDEO_SEARCH_SUCCESS, payload: { results: videoRes.data.items, pageToken: nextPageToken}})

    } catch(error) {
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
          dispatch({ type: FETCH_VIDEO_SEARCH_FAILURE });
        }
      } catch(err) {
        // something went wrong with refresh token request
        console.error(err);
        dispatch({ type: FETCH_USER_FAILURE });
        dispatch({ type: FETCH_VIDEO_SEARCH_FAILURE });
      }
    }
  };
}



export const searchChannels = (accessToken, searchTerm, pageToken = '') => async dispatch => {
  try {
    // search request is about to begin
    dispatch({ type: SEARCHING_FOR_CHANNELS });

    const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        access_token: accessToken,
        part: "snippet",
        type: "channel",
        maxResults: 25,
        q: searchTerm,
        pageToken: pageToken
      }
    });

    // save token for next page of search results
    const nextPageToken = res.data.nextPageToken;

    // search request returned array of channels
    dispatch({ type: FETCH_CHANNEL_SEARCH_SUCCESS, payload: { results: res.data.items, pageToken: nextPageToken}})
  } catch(error) {
    console.error(error);
    // something went wrong with request
    dispatch({ type: FETCH_CHANNEL_SEARCH_FAILURE })
  }
};

export const clearSearchResults = () => {
  return { type: CLEAR_SEARCH_RESULTS };
};
