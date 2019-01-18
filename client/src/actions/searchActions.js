import axios from "axios";
import {
  SEARCHING_FOR_VIDEOS,
  FETCH_VIDEO_SEARCH_SUCCESS,
  FETCH_VIDEO_SEARCH_FAILURE,
  SEARCHING_FOR_CHANNELS,
  FETCH_CHANNEL_SEARCH_SUCCESS,
  FETCH_CHANNEL_SEARCH_FAILURE,
  CLEAR_SEARCH_RESULTS
} from "./types";

export const searchVideos = (accessToken, searchTerm, pageToken = '') => async dispatch => {
  try {
    dispatch({ type: SEARCHING_FOR_VIDEOS });

    const searchRes = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        access_token: accessToken,
        part: "snippet",
        type: "video",
        maxResults: 25,
        q: searchTerm,
        pageToken: pageToken
      }
    })

    dispatch({ type: FETCH_VIDEO_SEARCH_SUCCESS, payload: searchRes.data.items })
  } catch(error) {
    console.error(error);
    dispatch({ type: FETCH_VIDEO_SEARCH_FAILURE })
  }
};

export const searchChannels = () => async dispatch => {
  try {

  } catch(error) {

  }
};

export const clearSearchResults = () => {
  return { type: CLEAR_SEARCH_RESULTS };
};
