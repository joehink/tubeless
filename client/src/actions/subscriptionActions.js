import axios from "axios";
import {
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILURE
} from "./types";

export const fetchSubscriptions = accessToken => async dispatch => {
  try {
    // Make a request to the YouTube API for the user's subscriptions
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/subscriptions",
      {
        params: {
          access_token: accessToken,
          part: "snippet",
          mine: true,
          maxResults: 50
        }
      }
    );

    // if user has subscriptions
    if (res.data.items.length > 0) {
      // dispatch action that returns subscriptions
      dispatch({ type: FETCH_SUBSCRIPTIONS_SUCCESS, payload: res.data.items });
    } else {
      dispatch({ type: FETCH_SUBSCRIPTIONS_SUCCESS, payload: false });
    }



  } catch(error) {
    // something went wrong with the request
    console.error(error);
    dispatch({ type: FETCH_SUBSCRIPTIONS_FAILURE })
  }
}
