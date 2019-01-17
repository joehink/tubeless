import axios from "axios";
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
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
