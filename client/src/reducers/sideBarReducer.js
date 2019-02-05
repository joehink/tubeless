import { TOGGLE_SIDE_BAR } from "../actions/types";

export default function(state = true, action) {
    switch(action.type) {
        case TOGGLE_SIDE_BAR:
            return !state;
        default:
            return state;
    }
}
