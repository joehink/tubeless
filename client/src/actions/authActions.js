import axios from "axios";
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCHING_SUBSCRIPTIONS,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILURE
} from "./types";

export const fetchUser = () => async dispatch => {
  try {
    // Request current logged in user
    const res = await axios.get("/api/current_user");
    // dispatch action with response data
    dispatch({ type: FETCH_USER_SUCCESS, payload: res.data })
  } catch(error) {
    // something went wrong with the request
    console.error(error);
    dispatch({ type: FETCH_USER_FAILURE })
  }
}

export const fetchSubscriptions = accessToken => async dispatch => {
  try {
    // Begin request for subscriptions
    dispatch({ type: FETCHING_SUBSCRIPTIONS });

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

    console.log(res);
    dispatch({ type: FETCH_SUBSCRIPTIONS_SUCCESS, payload: res.data });

  } catch(error) {
    // something went wrong with the request
    console.error(error);
    dispatch({ type: FETCH_SUBSCRIPTIONS_FAILURE })
  }
}
