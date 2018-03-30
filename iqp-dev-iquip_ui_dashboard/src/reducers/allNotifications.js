/**
 * Created by Nitin Gupta.
 */
import {ALL_NOTIFICATIONS_FETCHED} from '../actions/actions';

export default function allNotifications (state = [], action = {}) {
    switch(action.type) {
        case ALL_NOTIFICATIONS_FETCHED:
            return action.allNotifications;
        default: return state;
    }
}