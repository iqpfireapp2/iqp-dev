 import { ADD_MACHINEMAINTINFO, SET_MACHINEMAINTINFO, MACHINEMAINT_UPDATED, MACHINEMAINTINFO_FETCHED } from '../actions/actions';

export default function machinemaintinfos(state = [], action = {}) {
  
  switch(action.type) {
    
    case ADD_MACHINEMAINTINFO:
      return [
        ...state,
        action.machinemaintinfo
      ];

  case SET_MACHINEMAINTINFO:
      return action.machinemaintinfos;


   case MACHINEMAINT_UPDATED:
    return state.map(item => {
      if (item._id === action.machinemaintinfo._id) return action.machinemaintinfo;
   return item;
     });

case MACHINEMAINTINFO_FETCHED:
      const index = state.findIndex(item => item._id === action.machinemaintinfo._id);
      if (index > -1) {
        return state.map(item => {
          if (item._id === action.machinemaintinfo._id) return action.machinemaintinfo;
          return item;
        });
      } else {
        return [
          ...state,
          action.machinemaintinfo
        ];
      }

    default: return state;
    }

}

