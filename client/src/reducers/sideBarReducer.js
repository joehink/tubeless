import { TOGGLE_SIDE_BAR, CLOSE_SIDE_BAR } from "../actions/types";

export default function(state = true, action) {
    switch(action.type) {
        case TOGGLE_SIDE_BAR:
            return !state;
        case CLOSE_SIDE_BAR:
            return false;
        default:
            return state;
    }
}
