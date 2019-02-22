import axios from "axios";
import {
  FETCHING_SUBSCRIPTIONS,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILURE,
  ADD_TEMP_SUBSCRIPTION,
  TEMP_REMOVE_SUBSCRIPTION,
  START_SUB_ACTION,
  ADD_SUBSCRIPTION_SUCCESS,
  ADD_SUBSCRIPTION_FAILURE,
  REMOVE_SUBSCRIPTION_SUCCESS,
  REMOVE_SUBSCRIPTION_FAILURE,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from "./types";

export const fetchSubscriptions = accessToken => async dispatch => {
  try {
    dispatch({ type: FETCHING_SUBSCRIPTIONS })
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

    // dispatch action that returns subscriptions
    dispatch({ type: FETCH_SUBSCRIPTIONS_SUCCESS, payload: res.data.items });

  } catch(error) {
    // something went wrong with the request
    console.error(error);
    try {
      const user = await axios.get("/api/refresh_token");
      dispatch({ type: FETCH_USER_SUCCESS, payload: user.data });
      window.location.reload();
    } catch(err) {
      console.error(err);
      dispatch({ type: FETCH_SUBSCRIPTIONS_FAILURE });
      dispatch({ type: FETCH_USER_FAILURE });
    }
  }
}

export const subscribeToChannel = (channelId, title, thumbnail, accessToken) => async dispatch => {
  try {
    // Add subscription request is about to begin
    dispatch({ type: START_SUB_ACTION });
    // dispatch a simplified channel object into subscriptions list so there
    // won't be a delay when button switches from subscribe to unsubscribe
    dispatch({
      type: ADD_TEMP_SUBSCRIPTION,
      payload: {
        snippet: {
          resourceId: {
            channelId: channelId
          },
          thumbnails: {
            default: {
              url: thumbnail
            }
          },
          title: title
        }
      }
    })

    // Send request to add channel to user's subscriptions
    await axios({
      method: 'POST',
      url: 'https://www.googleapis.com/youtube/v3/subscriptions',
      data: {
        snippet: {
          resourceId: {
            kind: 'youtube#channel',
            channelId: channelId
          }
        }
      },
      params: {
        part: 'snippet',
        access_token: accessToken
      }
    });

    // Subscription was successfully added
    dispatch({ type: ADD_SUBSCRIPTION_SUCCESS });
  } catch (err) {
    // Something went wrong with request
    console.error(err);
    // Remove temporary subscription that was added
    dispatch({ type: ADD_SUBSCRIPTION_FAILURE, payload: channelId });
  }
}

export const unsubscribeFromChannel = (channelId, title, thumbnail, accessToken) => async dispatch => {
  try {
    // Remove subscription request is about to begin
    dispatch({ type: START_SUB_ACTION });
    // dispatch action to remove channel from subscriptions list so there
    // won't be a delay when button switches from subscribe to unsubscribe
    dispatch({ type: TEMP_REMOVE_SUBSCRIPTION, payload: channelId });

    // Make request to get subscription object from channelId
    const subRes = await axios({
      method: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/subscriptions',
      params: {
        part: 'snippet,contentDetails',
        forChannelId: channelId,
        mine: true,
        access_token: accessToken
      }
    });

    // save subscription object
    const channelToUnsubscribeFrom = subRes.data.items[0]

    // Make request to delete channel from user's subscriptions
    await axios({
      method: 'DELETE',
      url: 'https://www.googleapis.com/youtube/v3/subscriptions',
      params: {
        id: channelToUnsubscribeFrom.id,
        access_token: accessToken
      }
    })
    // Subscription was successfully removed
    dispatch({ type: REMOVE_SUBSCRIPTION_SUCCESS });
  } catch (err) {
    // Something went wrong with request
    console.error(err);
    // add removed subscription back in
    dispatch({
      type: REMOVE_SUBSCRIPTION_FAILURE,
      payload: {
        snippet: {
          resourceId: {
            channelId: channelId
          },
          thumbnails: {
            default: {
              url: thumbnail
            }
          },
          title: title
        }
      }
    })
  }
}
