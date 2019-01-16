import axios from "axios";
import { FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "./types";

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER_SUCCESS, payload: res.data })
  } catch(error) {
    console.error(error);
    dispatch({ type: FETCH_USER_FAILURE })
  }
}
