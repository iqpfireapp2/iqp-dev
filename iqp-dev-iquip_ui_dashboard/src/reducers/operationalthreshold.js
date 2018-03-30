 import { ADD_MACHINEOPERATIONALTHRE} from '../actions/actions';

export default function machineoperthrelds(state = [], action = {}) {
  
  switch(action.type) {
    case ADD_MACHINEOPERATIONALTHRE:
      return [
        ...state,
        action.machineoperthreld
      ];


    default: return state;
  }


}

