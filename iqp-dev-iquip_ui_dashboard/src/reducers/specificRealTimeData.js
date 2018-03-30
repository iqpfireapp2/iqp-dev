/**
 * Created by Nitin Gupta.
 */
import {SPECIFIC_REAL_TIME_DATA_ONCE_FETCHED} from '../actions/actions';

export default function specificRealTimeData (state = {}, action = {}) {
  switch(action.type) {
    case SPECIFIC_REAL_TIME_DATA_ONCE_FETCHED:
      return action.specificRealTimeData;
    default: return state;
  }
}