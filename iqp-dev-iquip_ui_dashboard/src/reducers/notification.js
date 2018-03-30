/**
 * Created by Nitin Gupta.
 */
import {NOTIFICATION_FETCHED} from '../actions/actions';

export default function notification (state = {}, action = {}) {
    switch(action.type) {
        case NOTIFICATION_FETCHED:
            return action.notification;
        default: return state;
    }
}