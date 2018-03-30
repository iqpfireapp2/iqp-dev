 import {SET_MACHINES} from '../actions/actions';

export default function machines (state = [], action = {}) {
  switch(action.type) {
    case SET_MACHINES:
      return action.machines;
      
    default: return state;
  }


}
