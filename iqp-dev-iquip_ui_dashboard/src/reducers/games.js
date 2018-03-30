 import { SET_GAMES, ADD_GAME, GAME_FETCHED, GAME_UPDATED, GAME_DELETED } from '../actions/actions';

export default function games(state = [], action = {}) {
  
  switch(action.type) {
    case ADD_GAME:
      return [
        ...state,
        action.game
      ];

  //  case 'games.modalDeleteShow':
  // new_state = JSON .parse(JSON.stringify(state));
  // new_state.modal = new_state.modal ? new_state.modal : {};
  // new_state.modal.list_delete = {
  //   show: true,
  //   id: action.id,
  //   title: action.title
  // }
  // return new_state;


   case GAME_DELETED:
   return state.filter(item => item._id !== action.gameId);
   
    case GAME_UPDATED:
    return state.map(item => {
      if (item._id === action.game._id) return action.game;
   return item;
     });

    case GAME_FETCHED:
      const index = state.findIndex(item => item._id === action.game._id);
      if (index > -1) {
        return state.map(item => {
          if (item._id === action.game._id) return action.game;
          return item;
        });
      } else {
        return [
          ...state,
          action.game
        ];
      }

    case SET_GAMES:
      return action.games;
    default: return state;
  }


}
