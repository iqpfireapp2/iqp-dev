 import { ADD_MACHINEGENINFO, SET_MACHINEGENINFO,  MACHINEGEN_UPDATED, MACHINEGENINFO_FETCHED } from '../actions/actions';

export default function geninfos(state = [], action = {}) {
  
  switch(action.type) {

    case ADD_MACHINEGENINFO:
      return [
        ...state,
        action.machinegeninfo
      ];



case SET_MACHINEGENINFO:
      return action.geninfos;

   case MACHINEGEN_UPDATED:
    return state.map(item => {
      if (item._id === action.machinegeninfo._id) return action.machinegeninfo;
   return item;
     });

case MACHINEGENINFO_FETCHED:
      const index = state.findIndex(item => item._id === action.machinegeninfo._id);
      if (index > -1) {
        return state.map(item => {
          if (item._id === action.machinegeninfo._id) return action.machinegeninfo;
          return item;
        });
      } else {
        return [
          ...state,
          action.machinegeninfo
        ];
      }


    default: return state;
  }


}

