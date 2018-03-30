/**
 * Created by Nitin Gupta.
 */
import {REAL_TIME_SENSOR_DATA} from '../actions/actions';

export default function realTimeSensorData (state = {}, action = {}) {
    switch(action.type) {
        case REAL_TIME_SENSOR_DATA:
            return action.realTimeSensorData;
        default: return state;
    }
}