import axios from "axios";
import {
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILURE,
  ADD_TEMP_SUBSCRIPTION,
  REMOVE_SUBSCRIPTION
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

    console.log(res.data.items);

    // dispatch action that returns subscriptions
    dispatch({ type: FETCH_SUBSCRIPTIONS_SUCCESS, payload: res.data.items });


  } catch(error) {
    // something went wrong with the request
    console.error(error);
    dispatch({ type: FETCH_SUBSCRIPTIONS_FAILURE })
  }
}

export const subscribeToChannel = (channelId, title, thumbnail, accessToken) => async dispatch => {
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
  const subscriptionRes = await axios({
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
}

export const unsubscribeFromChannel = (channelId, accessToken) => async dispatch => {
  // dispatch action to remove channel from subscriptions list so there
  // won't be a delay when button switches from subscribe to unsubscribe
  dispatch({ type: REMOVE_SUBSCRIPTION, payload: channelId });

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
  const unsubRes = await axios({
    method: 'DELETE',
    url: 'https://www.googleapis.com/youtube/v3/subscriptions',
    params: {
      id: channelToUnsubscribeFrom.id,
      access_token: accessToken
    }
  })
}
