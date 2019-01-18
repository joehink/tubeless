import axios from "axios";
import {
  FETCH_VIDEO_SEARCH_SUCCESS,
  FETCH_VIDEO_SEARCH_FAILURE,
  FETCH_CHANNEL_SEARCH_SUCCESS,
  FETCH_CHANNEL_SEARCH_FAILURE
} from "./types";

export const searchVideos = (accessToken, searchTerm, pageToken = '') => async dispatch => {
  try {
    /*=====================================================================
    Make search request for 25 videos
    if pageToken is blank (it will be on first request for new searchTerm)
    API will still return first page of results
    pageToken will be given value after first request
    and subsequent requests will return next page of results
    =====================================================================*/
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
    // const videoIds = searchRes.data.items.map(video => {
    //   return video.id.videoId;
    // }).toString();


    /*=========================================================
    search request does not return number of views per video
    so another request must be made for each video
    provide array of IDs to return all videos from search in one request
    ===================================================================*/
    // const videoRes = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
    //   params: {
    //     accessToken: accessToken,
    //     part: "snippet,statistics",
    //     id: videoIds
    //   }
    // })


    dispatch({
      type: FETCH_VIDEO_SEARCH_SUCCESS,
      payload: {
        results: searchRes.data.items,
        pageToken: searchRes.pageToken
      }
    })
  } catch(error) {
    console.error(error);
    dispatch({ type: FETCH_VIDEO_SEARCH_FAILURE })
  }
}

export const searchChannels = () => async dispatch => {
  try {

  } catch(error) {

  }
}
