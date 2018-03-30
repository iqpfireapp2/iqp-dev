/**
 * Created by Nitin Gupta.
 */
import {REAL_TIME_DATA_ONCE_FETCHED} from '../actions/actions';

export default function realTimeDataOnce (state = {}, action = {}) {
    switch(action.type) {
        case REAL_TIME_DATA_ONCE_FETCHED:
            return action.realTimeDataOnce;
        default: return state;
    }
}