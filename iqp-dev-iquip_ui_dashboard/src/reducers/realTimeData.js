/**
 * Created by Nitin Gupta.
 */
import {REAL_TIME_DATA_FETCHED} from '../actions/actions';

export default function realTimeData (state = {}, action = {}) {
    switch(action.type) {
        case REAL_TIME_DATA_FETCHED:
            return action.realTimeData;
        default: return state;
    }
}