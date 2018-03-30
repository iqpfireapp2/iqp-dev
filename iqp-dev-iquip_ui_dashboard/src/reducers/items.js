 import {ADD_ITEM, SET_ITEMS, ITEM_DELETED } from '../actions/actions';

export default function items (state = [], action = {}) {
  switch(action.type) {
    case ADD_ITEM:
      return [
        ...state,
        action.item
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

   case ITEM_DELETED:
   return state.filter(item => item._id !== action.itemId);
   

  case SET_ITEMS:
      return action.items;
    default: return state;
  }


}
